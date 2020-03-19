
import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Form, Button, Image, Video } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import originalImageIcon from '@/assets/images/originalImage@2x.png'
import Title from '@/components/Title'
import CustomIcon from '@/components/Icon'
import RecommendList from '@/components/RecommendList'
import AuthModal from '@/components/AuthModal'
import BackApp from '@/components/BackApp'
import { appConfig } from '@/services/config'
import Session from '@/services/session'
import service from '@/services/service'
import globalData from '@/services/global_data'
import tool from '@/utils/tool'
import work from '@/utils/work'
import './index.less'

import ShareDialog from '@/components/ShareDialog'
import like from '@/assets/images/like@3x.png'
import wx from '@/assets/images/wxicon@3x.png'
import pyq from '@/assets/images/pyq@3x.png'
import userImage from '@/assets/images/logo@2x.png'
import bgImage from '@/assets/images/random-bg.png'

// const demo = 'https://static01.versa-ai.com/upload/201bae375f8b/18e62d91-fc04-46c6-8f21-7224b53eb4b7.mp4'
type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Share {
  props: IProps;
}

@connect(({ }) => ({
}), (dispatch) => ({
}))
class Share extends Component {
  config: Config = {
    navigationBarTitleText: '懒人抠图'
  }

  state = {
    isFromApp: false,
    shareSourceType: 'image', // 'video' 'image'
    shareSource: '',
    originalCompleteImageUrl: '',
    videoPoster: '',
    width: 690,
    height: 920,
    recommendList: [],
    themeId: '',
    sceneId: '',
    themeData: {},
    sceneType: 0,
    isshow:false,
    confirmText:'好的，收下了',
  }

  app = Taro.getApp()

  componentWillMount() {
    // 兼容跳转使用
    // console.log('index page willMount', this.$router.params)
    // let {from = 'app', remoteURL = ''} = this.$router.params
    // const data = {
    //   from,
    //   remoteURL
    // }
    // const path = tool.formatQueryUrl('/pages/share/index', data)
    // Taro.redirectTo({url: path})
  }

  componentDidMount() {
    this._initPage()
    // Taro.showToast({
    //   title:this.$router.params.originalCompleteImageUrl
    // })
  }
  componentWillReceiveProps(nextProps) {
    // console.log(this.props, nextProps)
  }
  componentWillUnmount() { }
  componentDidShow() { }
  componentDidHide() { }
  onShareAppMessage(res) {
    const themeData = globalData.themeData || { generalShowUrl: '', shareContent: '' }
    const shareContent = themeData.shareContent || ''
    const url = themeData.generalShowUrl
    return {
      title: shareContent,
      path: '/pages/home/index',
      imageUrl: `${url}?x-oss-process=image/resize,m_pad,h_420,w_525`,
      success: () => {
        console.log('分享成功')
      },
    }
  }

  _initPage = async () => {
    await Session.set()
    this.processLoadData()
    // 提前获取主题信息
    this.getThemeData((themeData = {}) => {
      this.setState({
        themeData,
        sceneType: themeData.sceneType
      })
    })
    this.getRecommendList()
  }

  processLoadData = () => {
    console.log('share page index', this.$router.params) // 输出 { id: 2, type: 'test' }
    let isFromApp, shareSourceType = 'image', videoPoster = '', shareVideoInfo = { width: 690, height: 920, }
    let { shareSource, themeId, sceneId, from, remoteURL = '', width = 690, height = 920, originalCompleteImageUrl } = this.$router.params
    if (from === 'app') {
      isFromApp = true
      if (remoteURL.indexOf('versa-ai.com') > -1) {
        shareSource = remoteURL
      } else {
        shareSource = appConfig.imageHost + remoteURL
      }
    } else {
      isFromApp = false
      if (shareSource) {
        shareSource = decodeURIComponent(shareSource)
      }
    }
    shareSourceType = tool.calcSourceType(shareSource)
    if (shareSourceType === 'video') {
      videoPoster = `${shareSource}?x-oss-process=video/snapshot,t_0,f_png,w_0,h_0,m_fast`
      debugger
      shareVideoInfo = tool.calcVideoSize(690, 920, width, height)
    }
    if (!themeId) {
      themeId = appConfig.themeId
    }
    globalData.themeId = themeId
    globalData.sceneId = sceneId
    this.setState({
      isFromApp,
      shareSourceType,
      shareSource,
      videoPoster,
      width: shareVideoInfo.width,
      height: shareVideoInfo.height,
      themeId,
      sceneId,
      originalCompleteImageUrl: decodeURIComponent(originalCompleteImageUrl)
    })
  }

  getRecommendList = async () => {
    const recommendData = await service.core.recommend()
    // console.log('recommendData', recommendData.result.result)
    this.setState({
      recommendList: (recommendData.result && recommendData.result.result) || []
    })
  }

  getThemeData = async (callback?: (data?) => void) => {
    if (!globalData.themeId) {
      return
    }
    const themeId = globalData.themeId || ''
    const themeData = await service.core.theme(themeId)
    globalData.themeData = themeData.result.result
    typeof callback === 'function' && callback(themeData.result.result)
  }

  pageToHome = () => {
    this.app.aldstat.sendEvent('分享页返回主页按钮', '分享页返回主页按钮')
    Taro.redirectTo({
      url: '/pages/home/index'
    })
  }

  handleGetUserInfo = (e) => {
    // console.log('handleGetUserInfo', e)
    const { detail: { userInfo } } = e
    if (userInfo) {
      const { themeData = {}, sceneId } = globalData
      globalData.userInfo = userInfo
      service.base.loginAuth(e.detail)
      console.log(themeData)
      Taro.navigateTo({ url: `/pages/home/index` })
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
        if (index === 0) {
          this.app.aldstat.sendEvent('分享页上传人像选择拍摄照片', '选择拍摄')
        } else if (index === 1) {
          this.app.aldstat.sendEvent('分享页上传人像选择相册照片', '选择相册')
        }
      },
      onSuccess: (path) => {
        this.app.aldstat.sendEvent('分享页上传人像成功', '上传成功')
        globalData.choosedImage = path
        const { themeData = {}, sceneId } = globalData
        let url = ''
        if (themeData.sceneType === 1) {
          url = '/pages/filter/index'
        } else if (themeData.sceneType === 2) {
          url = '/pages/dynamic/index'
        } else if (themeData.sceneType === 3) {
          url = '/pages/segment/index'
        } else if (themeData.sceneType === 4) {
          url = '/pages/crop/index'
        } else {
          url = '/pages/editor/index'
        }
        // } else {
        //   url = '/pages/editor/index'
        // }
        if (sceneId) {
          url = url + '?sceneId=' + sceneId
        }
        console.log(url)
        Taro.navigateTo({url})
      }
    })
  }
  handleRecommendClick = (data) => {
    if (!data.themeId) {
      return
    }
    globalData.themeData = null
    globalData.themeId = data.themeId
    globalData.sceneId = ''
    this.getThemeData()
    this.app.aldstat.sendEvent('选择推荐主题', { '主题名': data.themeName, '主题Id': data.themeId })
  }
  handleFormSubmit = (e) => {
    const { detail: { formId } } = e
    formId && service.core.reportFormId(formId)
  }
  swapImag = () => {
    if (this.state.originalCompleteImageUrl && this.state.originalCompleteImageUrl.length > 0) {
      let tmpURL = this.state.originalCompleteImageUrl;
      let swapUrl = this.state.shareSource;
      this.setState({
        originalCompleteImageUrl: swapUrl,
        shareSource: tmpURL
      })
    }
  }
  handleMainButton = () => {

    this.app.aldstat.sendEvent('分享页主按钮', '分享页主按钮')
  }
  handleOpenApp = () => {
    this.app.aldstat.sendEvent('分享页打开app', '打开app')
  }
  getUserInfo (e) {
    console.log('e',e)
    Taro.getSetting({
      success (res) {
        if (res.authSetting['scope.userInfo']) {
          console.log('已授权',res)
          Taro.getUserInfo({
            success(res) {
              console.log('获取用户信息',res)
            },
            fail(res) {
              console.log('获取用户信息失败',res)
            }
          })
        } else {
          Taro.authorize ({
            scope: 'scope.userInfo'
          })
        }
      }
    })
  }
  shareHandle = () => {
    this.setState({
      isshow: true
    })
  }
  handelSave = () => {
    this.setState({
      isshow: false
    })
  }

  render() {
    const { isFromApp, shareSourceType, shareSource, videoPoster, width, height, recommendList, originalCompleteImageUrl } = this.state
    return (
      <View className='page-share'>
        <Title
          leftStyleObj={{ left: Taro.pxTransform(12) }}
          renderLeft={
            <CustomIcon type="home" theme="dark" onClick={this.pageToHome} />
          }
          color='#333'
        >懒人抠图</Title>
        <View className='main-section'>
          {console.log('state',this.state)}
          {shareSourceType === 'image' &&
            <View>
              {themeData.sceneType === 3 && <View class="share-bg"></View>}
              <View className="showImage">
                <Image src={shareSource} style='width: 100%; height: 100%' mode='aspectFit' />
                <Image src={originalCompleteImageUrl} style='width: 100%; height: 100%' mode='aspectFit'/>
              </View>
              {/* <View className="showImage">
                <View className="showImage blur"></View>
                <Image src={bgImage} className="bgImage" mode="aspectFill"/>
              </View> */}
            </View>
          }
          {shareSourceType === 'video' &&
            <View className='video-wrap'>
              <Video
                className="video"
                style={{ width: Taro.pxTransform(width), height: Taro.pxTransform(height - 2) }}
                loop
                autoplay
                src={shareSource}
                poster={videoPoster}
                objectFit='cover'
                controls
              ></Video>
            </View>
          }
          <View className="userMessage">
            <Image className="user" src={userImage} />
            <View className='userName'>Yannie_琳</View>
            <Button openType="getUserInfo" onGetUserInfo={this.getUserInfo} className="likeAuth like">
              <Image src={like}  className="like" />
            </Button>
            <View style="" className="linkeNum">9</View>
            <Button openType="share" className="share wx">
              <Image src={wx} className="wx"/>
            </Button>
            {/* <Image src={wx} className="wx"/> */}
            <Image src={pyq} onClick={this.shareHandle} className="pyq"/>
            {/* <Image src={pyq} onClick={this.handleOpenResult} className="pyq"/> */}
          </View>
          {
            this.state.isshow === true ? <ShareDialog
            confirmText={this.state.confirmText}
            content={shareSource}
            renderButton ={
              <View className="wx-dialog-footer">
                <Button className="wx-dialog-btn" onClick={this.handelSave}  style="flex:1" >
                    {this.state.confirmText}
                </Button>
                
              </View>
            }
            />
            : ''
          }
        </View>
        <View className='sub-section'>
          {
            this.state.sceneType == 5 ? <View className='originalWrap'>
              <View className='ImageWrap'>
                <Image src={originalImageIcon} className='originalIcon' >
                </Image>
                <Image className='originalImage' src={originalCompleteImageUrl} mode='aspectFit' onClick={this.swapImag} />
              </View>
              <Button
                className="custom-button pink " hoverClass="btn-hover" style='flex:1'
                openType="getUserInfo"
                onGetUserInfo={this.handleGetUserInfo}
                onClick={this.handleMainButton}
                formType='submit'>我也要玩</Button>
            </View> : <Form onSubmit={this.handleFormSubmit} reportSubmit>
                {isFromApp ?
                  <Button
                    className="custom-button pink"
                    hoverClass="btnhover"
                    onClick={this.pageToHome}
                  >我也要玩</Button> :
                  <Button
                    className="custom-button pink"
                    hoverClass="btnhover"
                    openType="getUserInfo"
                    onGetUserInfo={this.handleGetUserInfo}
                    onClick={this.handleMainButton}
                    formType='submit'>我也要玩</Button>
                }
              </Form>
          }
          <View className='recommend-wrap'>
            <View className='recommend-title'>热门作品</View>
            <RecommendList
              list={recommendList}
              onGetUserInfo={this.handleGetUserInfo}
              onFormSubmit={this.handleFormSubmit}
              onClick={this.handleRecommendClick}
            />
          </View>
          <View className='recommend-wrap'>
            <View className='recommend-title'>更多好玩</View>
            <RecommendList
              list={recommendList}
              onGetUserInfo={this.handleGetUserInfo}
              onFormSubmit={this.handleFormSubmit}
              onClick={this.handleRecommendClick}
            />
          </View>
        </View>
        {isFromApp && <BackApp onClick={this.handleOpenApp} />}
        <AuthModal />
      </View>
    )
  }
}

export default Share as ComponentClass<PageOwnProps, PageState>
