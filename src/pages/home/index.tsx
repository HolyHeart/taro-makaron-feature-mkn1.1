import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { getSystemInfo } from '@/model/actions/global'
import bg from '@/assets/images/bg.png'
import Title from '@/components/Title'
import CustomIcon from '@/components/Icon'
import CategoryItem from '@/components/CategoryItem'
import AuthModal from '@/components/AuthModal'
import globalData from '@/services/global_data'
import { core } from '@/services/service'
import Session from '@/services/session'
import mock_data from './mock.json'
import './index.less'


// console.log('mock_data', mock_data)
type PageStateProps = {
  counter: {
    num: number
  },
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

@connect(({ counter, global }) => ({
  counter,
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
    showAuth: false
  }

  componentWillMount () {
    const {getSystemInfo} = this.props
    const systemInfo = Taro.getSystemInfoSync()
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

  _initPage = async () => {
    await Session.set()
    if (globalData.columnList && globalData.columnList.length === 0) {
      const columnData = await core.column()
      globalData.columnList = (columnData.result && columnData.result.result) || []
      console.log('columnData', columnData, globalData)
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
    this.showActionSheet((path)=>{
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
    })
  }

  showActionSheet = async (callback) => {
    const _this = this
    Taro.showActionSheet({
      itemList: [
        '拍摄人像照',
        '从相册选择带有人像的照片',
      ],
      success: function ({tapIndex}) {
        if (tapIndex === 0) {
          Taro.authorize({
            scope: "scope.camera",
          }).then(res => {
            // console.log('res', res)
            Taro.chooseImage({
              count: 1,
              sourceType: ['camera'],
              sizeType: ['compressed '],
            }).then(({tempFilePaths: [path]}) => {
              typeof callback === 'function' && callback(path)
            })
          }, err => {
            console.log('authorize err', err)
            Taro.getSetting().then(authSetting => {
              if (authSetting['scope.camera']) {
              } else {
                Taro.showModal({
                  title: '拍摄图片需要授权',
                  content: '拍摄图片需要授权\n可以授权吗？',
                  confirmText: "允许",
                  cancelText: "拒绝",                      
                }).then(res => {     
                  if (res.confirm) {
                    _this.showAuthModal(true)
                  }
                })
              }                
            })
          })
        } else if (tapIndex === 1) { 
          Taro.chooseImage({
            count: 1,
            sourceType: ['album'],
          }).then(({tempFilePaths: [path]}) => {
            typeof callback === 'function' && callback(path)
          })
        }		
      }
    }).catch(err => console.log(err))
  }

  showAuthModal = (flag = false) => {
    this.setState({
      showAuth: flag
    })
  }

  closeAuthModal = () => {
    this.setState({
      showAuth: false
    })
  }

  render () {
    const { global } = this.props
    const { categoryList, showAuth } = this.state
    return (
      <View className='page-home'>
        <Title 
          top={global.system.statusBarHeight + 10}
          renderLeft={
            <CustomIcon type="menu" theme="light"/>
          }
        >马卡龙玩图</Title>
        <View className="main">
          <View className="main-bg">
            <image src={bg} mode="widthFix" style="width:100%;height:100%"/>
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
        {showAuth && <AuthModal onClick={this.closeAuthModal}/>}
      </View>
    )
  }
}

export default Home as ComponentClass<PageOwnProps, PageState>
