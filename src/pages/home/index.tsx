import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { getSystemInfo } from '@/model/actions/global'
import work from '@/utils/work'
import Title from '@/components/Title'
import Tooltip from '@/components/Tooltip'
import CustomIcon from '@/components/Icon'
import CategoryItem from '@/components/CategoryItem'
import AuthModal from '@/components/AuthModal'
import Guide from "@/components/Guide";
import globalData from '@/services/global_data'
import { core, base } from '@/services/service'
import Session from '@/services/session'
import bg from '@/assets/images/BG@2x.png'
import by from '@/assets/images/by@3x.png'
import toApp from '@/assets/images/app@2x.png'
// import pic_loading from '@/assets/images/pic_loading.png'
import pic_loading_big from '@/assets/images/0@2x.png'
import pic_feedback from '@/assets/images/feedback.png'

import pic_loading_1 from '@/assets/images/1@2x.png'
import pic_loading_2 from '@/assets/images/2@2x.png'
import pic_loading_3 from '@/assets/images/3@2x.png'
import pic_loading_4 from '@/assets/images/4@2x.png'
import pic_loading_5 from '@/assets/images/5@2x.png'
import pic_loading_6 from '@/assets/images/6@2x.png'
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
        generalShowUrl: pic_loading_1
      },
      {
        generalShowUrl: pic_loading_2
      },
      {
        generalShowUrl: pic_loading_3
      },
      {
        generalShowUrl: pic_loading_4
      },
      {
        generalShowUrl: pic_loading_5
      },
      {
        generalShowUrl: pic_loading_6
      },
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
    disableScroll: false,

  }

  state = {
    categoryList: default_column,
    defaultThemeData: {},
    isScrollToTop:true
  }

  app = Taro.getApp()

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
  onPageScroll(e) {
    if(e.scrollTop>0){
      // 滚动操作
      this.setState({
        isScrollToTop:false
      })
    }else{
      // 滚到顶部
      this.setState({
        isScrollToTop:true
      })
    }
    // Do something when page scroll
  }
  onShareAppMessage () {
    this.app.aldstat.sendEvent('首页分享', '首页分享')
    const {defaultThemeData = {}} = this.state
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
    // console.log('handleChooseTheme', item)
    globalData.themeId = item.themeId
    globalData.sceneType = item.sceneType
    globalData.themeData = null
    if (globalData.themeId) {
      const res = await core.theme(globalData.themeId)
      globalData.themeData = res.result && res.result.result
    }
    // 埋码
    this.app.aldstat.sendEvent('选择主题', {'主题名': item.themeName, '主题Id': item.themeId})
  }

  handleGetUserInfo = (data) => {
    // console.log('handleGetUserInfo', data)
    const {detail: {userInfo}} = data
    if (userInfo) {
      base.loginAuth(data.detail)
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

  handleFormSubmit = (e) => {
    const {detail: {formId}} = e
    if (formId) {
      core.reportFormId(formId)
    }
  }

  handleFeedback = () => {
    this.app.aldstat.sendEvent('首页菜单', '使用反馈')
  }

  handleShowTooltip = () => {
    Taro.tooltip({
      open: !Taro.getTooltipStatus()
    })
  }

  handleClickMain = () => {
    Taro.tooltip({
      open: false
    })
  }

  // added by Shichao.Ma
  turnToStyle = () => {
    console.log('hohoho!')
    Taro.navigateTo({url: '/pages/style/index'})
  }

  todo = () => {
    work.chooseImage({
      onTap: (index) => {
        // console.log('tap index', index)
        if (index === 0) {
          this.app.aldstat.sendEvent('首页上传人像选择拍摄照片', '选择拍摄')
        } else if (index === 1) {
          this.app.aldstat.sendEvent('首页上传人像选择相册照片', '选择相册')
        }
      },
      onSuccess: (path) => {
        console.log('choosedImage', path, globalData)
        this.app.aldstat.sendEvent('首页上传人像成功', '上传成功')
        globalData.choosedImage = path
        const { sceneType } = globalData
        if (sceneType === 1) {
          Taro.navigateTo({url: '/pages/filter/index'})
        } else if (sceneType === 2) {
          Taro.navigateTo({url: '/pages/dynamic/index'})
        } else if (sceneType === 3) {
          Taro.navigateTo({url: '/pages/segment/index'})
        } else if (sceneType === 4){
          Taro.navigateTo({url: '/pages/crop/index'})
        } else {
          Taro.navigateTo({url: '/pages/editor/index'})
        }
      }
    })
  }

  goToCrop () {
    Taro.navigateTo({url: '/pages/crop/index'})
  }

  goToWaiting () {
    Taro.navigateTo({url: '/pages/waiting/index'})
  }

  render () {
    const { categoryList } = this.state
    const {global = {}} = this.props
    const isIphoneX = global.system && global.system.isIphoneX
    return (
      <View className='page-home'>
        <Title
          isScrollToTop ={this.state.isScrollToTop}
          renderLeft={
            <View style="position: relative">
              <CustomIcon type="menu" theme="dark" onClick={this.handleShowTooltip}/>
              <Tooltip>
                <View className='tooltip-item'>
                  <Image className='tooltip-icon' src={pic_feedback} mode="aspectFill" />
                  <Button className='tooltip-button' openType="feedback" onClick={this.handleFeedback}>使用反馈</Button>
                </View>
              </Tooltip>
            </View>
          }
        >马卡龙玩图</Title>
        <View className="main">
          <View className="main-bg">
            {/* {isIphoneX && <View style="width: 100%; height:100rpx; background:rgb(100,180,255)"></View>} */}
            <Image src={bg} mode="widthFix" style="width:100%;height:100%"/>
          </View>
          <View className={`main-container ${isIphoneX ? 'iphoneX' : ''}`} onClick={this.handleClickMain}>
            {
              categoryList.map(column => {
                return (
                  <View className='category-wrap' key={column.columnId}>
                    {
                      (column.themeList).map(item => {
                        return <CategoryItem
                          column={column.columnNum}
                          onGetUserInfo={this.handleGetUserInfo}
                          key={item.themeId}
                          url={item.generalShowUrl || ''}
                          onClick={this.handleChooseTheme.bind(this, item)}
                          onFormSubmit={this.handleFormSubmit}
                        />
                      })
                    }
                  </View>
                )
              })
            }
            <View className="bottomInfo" style='margin-top:25px;font-size:10px'>
              - 到底了哦 -
            </View>
            <View className="bottomInfo">
               <Image src={by} mode="widthFix" style="width:266rpx;margin-top:15px"/>
              </View>
          </View>
        </View>
        <AuthModal />
        <Guide />
      </View>
    )
  }
}

export default Home as ComponentClass<PageOwnProps, PageState>
