import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { getSystemInfo } from '@/model/actions/global'
import work from '@/utils/work'
import Title from '@/components/Title'
import CustomIcon from '@/components/Icon'
import CategoryItem from '@/components/CategoryItem'
import AuthModal from '@/components/AuthModal'
import globalData from '@/services/global_data'
import { core } from '@/services/service'
import Session from '@/services/session'
import bg from '@/assets/images/bg.png'
import './index.less'

type PageStateProps = {
  global: {
    system: object
  }
}

type PageDispatchProps = {
  getSystemInfo: (data:object) => void
}

type PageOwnProps = {}

type PageState = {
  categoryList: Array<object>
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Home {
  props: IProps;
}

@connect(({ global }) => ({
  global
}), (dispatch) => ({
  getSystemInfo (data) {
    dispatch(getSystemInfo(data))
  }
}))
class Home extends Component {
  config: Config = {
    navigationBarTitleText: '马卡龙玩图'
  }

  state = {
    categoryList: [],
  }

  componentWillMount () {
    // const {getSystemInfo} = this.props
    // const systemInfo = Taro.getSystemInfoSync()
    // getSystemInfo(systemInfo)
  }
  componentDidMount () {
    this._initPage()
  }
  componentWillReceiveProps (nextProps) {
    // console.log(this.props, nextProps)  
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  onShareAppMessage (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '马卡龙玩图',
      path: '/pages/home/index'
    }
  }

  _initPage = async () => {
    await Session.set()
    if (globalData.columnList && globalData.columnList.length === 0) {
      const columnData = await core.column()
      globalData.columnList = (columnData.result && columnData.result.result) || []
    }
    this.setState({
      categoryList: globalData.columnList
    })
  }

  getCategotyList (data: Array<any>) {
    const list = []
    data.forEach(item => {
      (item.themeList || [] ).forEach(theme => {
        list.push(theme)
      })
    })
    return list
  }

  handleChooseTheme = async (item: object) => {
    console.log('handleChooseTheme', item)  
    globalData.themeId = item.themeId   
    globalData.sceneType = item.sceneType
    globalData.themeData = null    
    if (globalData.themeId) {
      const res = await core.theme(globalData.themeId)
      globalData.themeData = res.result && res.result.result 
    }
  }

  handleGetUserInfo = (data) => {
    // console.log('handleGetUserInfo', data)
    const {detail: {userInfo}} = data   
    if (userInfo) {
      globalData.userInfo = userInfo
      this.todo()
    } else {
      Taro.showToast({
        title: '请授权',
        icon: 'success',
        duration: 2000
      })
    }
  }

  todo = () => {
    work.chooseImage({
      onTap: (index) => {
        console.log('tap index', index)
      },
      onSuccess: (path) => {
        console.log('choosedImage', path, globalData)    
        globalData.choosedImage = path
        const { sceneType } = globalData
        if (sceneType === 1) {
          Taro.redirectTo({url: '/pages/filter/index'}) 
        } else if (sceneType === 2) {
          Taro.redirectTo({url: '/pages/dynamic/index'}) 
        } else if (sceneType === 3) {
          Taro.redirectTo({url: '/pages/segment/index'}) 
        } else {
          Taro.redirectTo({url: '/pages/editor/index'}) 
        }        
      }
    })
  }

  render () {
    const { categoryList } = this.state
    return (
      <View className='page-home'>
        <Title
          renderLeft={
            <CustomIcon type="menu" theme="light"/>
          }
        >马卡龙玩图</Title>
        <View className="main">
          <View className="main-bg">
            <Image src={bg} mode="widthFix" style="width:100%;height:100%"/>
          </View>
          <View className="main-container">
            {
              categoryList.map(column => {
                return (
                  <View className='category-wrap' key={column.columnId}>
                    {
                      (column.themeList || []).map(item => {
                        return <CategoryItem 
                          column={column.columnNum}
                          onGetUserInfo={this.handleGetUserInfo}
                          key={item.themeId} 
                          url={item.generalShowUrl || ''}
                          onClick={this.handleChooseTheme.bind(this, item)}
                        />
                      })
                    }
                  </View>
                )
              })
            }            
          </View>
        </View> 
        <AuthModal />
      </View>
    )
  }
}

export default Home as ComponentClass<PageOwnProps, PageState>
