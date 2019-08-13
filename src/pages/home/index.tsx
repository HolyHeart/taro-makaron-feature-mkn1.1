import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Button, ScrollView, Text } from '@tarojs/components'
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
import { core, base, home } from '@/services/service'
import Session from '@/services/session'
import bg from '@/assets/images/BG@2x.png'
import by from '@/assets/images/by@3x.png'
import pic_loading_big from '@/assets/images/0@2x.png'
import pic_feedback from '@/assets/images/feedback.png'
import pic_loading_1 from '@/assets/images/1@2x.png'
import pic_loading_2 from '@/assets/images/2@2x.png'
import pic_loading_3 from '@/assets/images/3@2x.png'
import pic_loading_4 from '@/assets/images/4@2x.png'
import pic_loading_5 from '@/assets/images/5@2x.png'
import pic_loading_6 from '@/assets/images/6@2x.png'
import homepage_logo from '@/assets/images/logo@2x.png'
import icon_collect from '@/assets/images/icon_collect@2x.png'
import icon_close from '@/assets/images/icon_nofollow_close@2x.png'
import tooltip_pic from '@/assets/images/tips_collect@2x.png'
import './index.less'
import ResultModal from '@/components/ResultModal';

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
  getSystemInfo: (data: object) => void
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
  getSystemInfo(data) {
    dispatch(getSystemInfo(data))
  }
}))
class Home extends Component {
  config: Config = {
    navigationBarTitleText: '懒人抠图',
    disableScroll: false,

  }

  state = {
    categoryList: default_column,
    defaultThemeData: {},
    isScrollToTop: true,
    totalScenes: [],
    categories: [],

    // 🔥🔥🔥 following states are added by Shichao 🔥🔥🔥
    screenHeight: 0,
    screenWidth: 0,
    titleHeight: 0,
    tooltipHeight: 0
  }

  app = Taro.getApp()


  componentWillMount() {
    const { getSystemInfo } = this.props
    const systemInfo = Taro.getSystemInfoSync()
    if (/iphone x/i.test(systemInfo.model)) {
      // iPhone XS Max China-exclusive<iPhone11,6>
      // 'iPhone X'
      systemInfo.isIphoneX = true
    } else {
      systemInfo.isIphoneX = false
    }
    getSystemInfo(systemInfo)



    console.log('🔥初始化高度🔥', '屏幕高度：', systemInfo.screenHeight, '屏幕宽度：', systemInfo.screenWidth, '系统参数：', systemInfo)
    this.setState({
      screenHeight: systemInfo.screenHeight,
      screenWidth: systemInfo.screenWidth,
      tooltipHeight: systemInfo.screenWidth / 750 * 92,
    })
  }
  componentDidMount() {
    this._initPage()

    this.setState({
      titleHeight: globalData.totalTopHeight
    })
  }
  componentWillReceiveProps(nextProps) {
    // console.log(this.props, nextProps)
  }
  componentWillUnmount() { }
  componentDidShow() {
    const data = Taro.getStorageSync('firstView')
    // TODO 如果没有授权，取得授权
    if (data == 'no') {
      // TODO 此段代码暂时无用
      Taro.getSetting({
        success(res) {
          if (!res.authSetting['scope.userInfo']) {
            console.log(res)
          }
        }
      })
    }
  }
  componentDidHide() { }
  onPageScroll(e) {
    if (e.scrollTop > 0) {
      // 滚动操作
      this.setState({
        isScrollToTop: false
      })
    } else {
      // 滚到顶部
      this.setState({
        isScrollToTop: true
      })
    }
    // Do something when page scroll
  }
  onShareAppMessage() {
    this.app.aldstat.sendEvent('首页分享', '首页分享')
    const { defaultThemeData = {} } = this.state
    const shareContent = defaultThemeData.shareContent || '懒人抠图'
    const urls = (defaultThemeData.url || '').split(';').filter(v => v !== '')
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
    await this.getCateGoryAndScenes()
    // if (globalData.columnList && globalData.columnList.length === 0) {
    //   const columnData = await core.column()
    //   globalData.columnList = (columnData.result && columnData.result.result) || []
    // }
    // this.setState({
    //   categoryList: globalData.columnList
    // }, () => {
    //   this.getDefaultTheme()
    // })
  }

  getCateGoryAndScenes = async () => {
    try {
      const res = await await home.getCateGoryAndScenes()
      const categories = res.result && res.result.result.map((item) => {
        return item.categoryName
      })
      this.setState({
        totalScenes: res.result && res.result.result,
        categories: categories
      })
    } catch (error) {
      console.log(error)
    }
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

  getCategotyList(data: Array<any>) {
    const list = []
    data.forEach(item => {
      (item.themeList || []).forEach(theme => {
        list.push(theme)
      })
    })
    return list
  }

  handleChooseTheme = async (item: object) => {
    // console.log('handleChooseTheme', item)
    globalData.themeId = item.themeId
    globalData.sceneType = item.sceneType
    console.log(globalData)
    // console.log(item.styleInfoList)
    globalData.themeData = null
    if (globalData.themeId) {
      const res = await core.theme(globalData.themeId)
      globalData.themeData = res.result && res.result.result
    }
    // 埋码
    this.app.aldstat.sendEvent('选择主题', { '主题名': item.themeName, '主题Id': item.themeId })
    if (item.sceneType === 5) {
      Taro.navigateTo({ url: `/pages/browser/index?themeId=${globalData.themeId}` })
    }
  }

  handleGetUserInfo = (data) => {
    // console.log('handleGetUserInfo', data)
    const { detail: { userInfo } } = data
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
    const { detail: { formId } } = e
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

  todo = () => {
    const { sceneType } = globalData
    if (sceneType === 5) {
      Taro.navigateTo({ url: `/pages/browser/index?themeId=${globalData.themeId}` })
    } else {
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
            Taro.navigateTo({ url: '/pages/filter/index' })
          } else if (sceneType === 2) {
            Taro.navigateTo({ url: '/pages/dynamic/index' })
          } else if (sceneType === 3) {
            Taro.navigateTo({ url: '/pages/segment/index' })
          } else if (sceneType === 4) {
            Taro.navigateTo({ url: '/pages/crop/index' })
          } else {
            Taro.navigateTo({ url: '/pages/editor/index' })
          }
        }
      })
    }
  }



  // 🔥🔥🔥 following functions are added by Shichao 🔥🔥🔥
  closeTooltip = () => {
    console.log('关闭收藏提示')
    this.setState({
      tooltipHeight: 0,
    })
  }
  goScene = (scene,type) => {
    if(type==='challange'){
      Taro.navigateTo({ url: `/pages/psChallenge/index?imageId=${scene.imageId}&activityId=${scene.activityId}` })
    }else{
      // sceneType
      globalData.sceneConfig = scene
      if (scene.sceneType === 1) {
        Taro.navigateTo({ url: '/pages/filter/index' })
      } else if (scene.sceneType === 2) {
        Taro.navigateTo({ url: '/pages/dynamic/index' })
      } else if (scene.sceneType === 3) {
        Taro.navigateTo({ url: '/pages/segment/index' })
      } else if (scene.sceneType === 4) {
        Taro.navigateTo({ url: '/pages/crop/index' })
      } else {
        Taro.navigateTo({ url: '/pages/editor/index' })
      }
    }
  }
  render() {
    const { categoryList } = this.state
    const { global = {} } = this.props
    const isIphoneX = global.system && global.system.isIphoneX
    return (
      <View className='page-home'>
        <Title
          isScrollToTop={this.state.isScrollToTop}
          renderLeft={
            <View style="position: relative">
              <CustomIcon type="menu" theme="dark" onClick={this.handleShowTooltip} />
              <Tooltip>
                <View className='tooltip-item'>
                  <Image className='tooltip-icon' src={pic_feedback} mode="aspectFill" />
                  <Button className='tooltip-button' openType="feedback" onClick={this.handleFeedback}>使用反馈</Button>
                </View>
              </Tooltip>
            </View>
          }
        >懒人抠图</Title>

        <View className='title-filler' style={{ height: this.state.titleHeight + 'px' }}></View>


        <View className='tooltip' style={{ height: this.state.tooltipHeight + 'px' }}>

          {this.state.tooltipHeight === 0 ?
            <View></View>
            : <Image src={tooltip_pic} style='width: 100%;' mode='widthFix' onClick={this.closeTooltip}></Image>}

        </View>






        <ScrollView className='nav-bar' scrollY style={{ height: this.state.screenHeight - this.state.titleHeight - this.state.tooltipHeight + 'px' }}>
          <View className='nav-filler'></View>
          {this.state.categories.map((item) => {
            return <View className='nav-label'><Text className='nav-label-text'>{item}</Text></View>
          })}
          <View className='nav-filler'></View>
        </ScrollView>





        <ScrollView className='items-window' scrollY style={{ height: this.state.screenHeight - this.state.titleHeight - this.state.tooltipHeight + 'px' }}>
          <View className='window-divider'><Text className='window-divider-text'>- </Text><Image className='window-divider-icon' src={homepage_logo} /><Text className='window-divider-text'> 马卡龙玩图倾力出品 -</Text></View>
          {
            this.state.totalScenes.map((item, index) => {
              return (
                <View>
                  {index !== 0 ? <View className='window-divider'><Text className='window-divider-text'>- {item.categoryName} -</Text></View> : ''}
                  <View className='window-container'>
                    {
                      // item.showStyle === 0 ?
                      item.originalImageList ? item.originalImageList.map((scene) => {
                        return item.showStyle === 0 ? <View className='item-block' onClick={() => this.goScene(scene,'challange')}><View className='item' hoverClass="item-hover">
                          <Image src={scene.originalImageUrl} mode="aspectFill" style="width:100%;height:100%" /></View></View> :
                          <View className='item-block-single'><View className='item-single' onClick={() => this.goScene(scene,'challange')} hoverClass="item-single-hover">
                            <Image src={scene.originalImageUrl} mode="aspectFill" style="width:100%;height:100%" /></View></View>
                      }) :item.sceneInfoList && item.sceneInfoList.map((scene) => {
                        return item.showStyle === 0 ? <View className='item-block' onClick={() => this.goScene(scene,'editor')}><View className='item' hoverClass="item-hover">
                          <Image src={scene.thumbnailUrl && scene.thumbnailUrl} mode="aspectFill" style="width:100%;height:100%" /></View></View> :
                          <View className='item-block-single'><View className='item-single' onClick={() => this.goScene(scene,'editor')} hoverClass="item-single-hover">
                            <Image src={scene.thumbnailUrl && scene.thumbnailUrl} mode="aspectFill" style="width:100%;height:100%" /></View></View>
                      })
                    }
                  </View>
                </View>
              )
            })
          }
          <View className='window-divider'><Text className='window-divider-text'>- 到底了哦 -</Text></View>
        </ScrollView>
        {/* <View className="main">
          <View className="main-bg">
            <Image src={bg} mode="widthFix" style="width:100%;height:100%" />
          </View>
          <View className={`main-container ${isIphoneX ? 'iphoneX' : ''}`} onClick={this.handleClickMain}>
            {
              categoryList.map(column => {
                return (
                  <View className='category-wrap' key={column.columnId}>
                    {
                      (column.themeList).map(item => {
                        return <CategoryItem
                          sceneType={item.sceneType }
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
            <View className="bottomInfo" style='margin-top:50rpx;font-size:10px'>
              - 到底了哦 -
            </View>
            <View className="bottomInfo" style='margin-top:30rpx;'>
              <Image src={by} mode="widthFix" style="width:266rpx" />
            </View>
          </View>
        </View> */}




        <AuthModal />
        <Guide />
      </View>
    )
  }
}

export default Home as ComponentClass<PageOwnProps, PageState>
