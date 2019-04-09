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
import pic_loading from '@/assets/images/pic_loading.png'
import pic_loading_big from '@/assets/images/pic_loading_big.png'
import './index.less'
const default_column = [      
  {
    columnId: "189063862158151681", 
    columanName: "栏目1", 
    columnNum: 1,
    themeList: [
      {
        generalShowUrl: pic_loading_big
      }
    ]
  },
  {
    columnId: "189063862158151680", 
    columanName: "栏目2", 
    columnNum: 2,
    themeList: [
      {
        generalShowUrl: pic_loading
      },
      {
        generalShowUrl: pic_loading
      },
      {
        generalShowUrl: pic_loading
      },
      {
        generalShowUrl: pic_loading
      }
    ]
  }      
]
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
  categoryList: Array<object>,
  defaultThemeData: object,
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
    navigationBarTitleText: '马卡龙玩图',
    disableScroll: false
  }

  state = {
    categoryList: default_column,
    defaultThemeData: {}
  }

  componentWillMount () {
    const {getSystemInfo} = this.props
    const systemInfo = Taro.getSystemInfoSync()    
    if (/iphone x/i.test(systemInfo.model)) {
      // iPhone XS Max China-exclusive<iPhone11,6>
      // 'iPhone X' 
      systemInfo.isIphoneX = true
    } else {
      systemInfo.isIphoneX = false
    }
    console.log('systemInfo', systemInfo)
    getSystemInfo(systemInfo)
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
  onShareAppMessage () {   
    const {defaultThemeData = {}} = this.state
    // this.$wxapp.aldstat.sendEvent('首页分享', '首页分享')
    const shareContent = defaultThemeData.shareContent || '马卡龙玩图'
    const urls = (defaultThemeData.url||'').split(';').filter(v => v !== '')
    const path = '/pages/home/index'
    if (urls.length > 0) {
       return {
        title: shareContent,
        path: path,
        imageUrl: urls[0] + '?x-oss-process=image/resize,m_fill,h_420,w_525',
      }
    }
    return {
      title: shareContent,
      path: path
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
    },() => {
      this.getDefaultTheme()
    })
  }

  getDefaultTheme = async () => {
    const defaultTheme = globalData.columnList[0] && globalData.columnList[0].themeList[0] 
    if (defaultTheme) {
      const res = await await core.theme(defaultTheme.themeId)
      this.setState({
        defaultThemeData: res.result && res.result.result 
      })
    }   
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
    const {global = {}} = this.props
    const isIphoneX = global.system && global.system.isIphoneX
    return (
      <View className='page-home'>
        <Title
          renderLeft={
            <CustomIcon type="menu" theme="light"/>
          }
        >马卡龙玩图</Title>
        <View className="main">
          <View className="main-bg">
            {isIphoneX && <View style="width: 100%; height:100rpx; background:rgb(100,180,255)"></View>}
            <Image src={bg} mode="widthFix" style="width:100%;height:100%"/>
          </View>
          <View className={`main-container ${isIphoneX ? 'iphoneX' : ''}`}>
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
