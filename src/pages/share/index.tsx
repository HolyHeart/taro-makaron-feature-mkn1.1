
import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Form, Button, Image, Video ,ScrollView, Canvas} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import originalImageIcon from '@/assets/images/originalImage@2x.png'
import Title from '@/components/Title'
import CustomIcon from '@/components/Icon'
import RecommendList from '@/components/RecommendList'
import AuthModal from '@/components/AuthModal'
import BackApp from '@/components/BackApp'
import ShareDialog from '@/components/ShareDialog'
import { appConfig } from '@/services/config'
import Session from '@/services/session'
import service from '@/services/service'
import globalData from '@/services/global_data'
import tool from '@/utils/tool'
import work from '@/utils/work'
import './index.less'

import like from '@/assets/images/like@3x.png'
import wx from '@/assets/images/wxicon@3x.png'
import pyq from '@/assets/images/pyq@3x.png'
import userImage from '@/assets/images/logo@2x.png'
import bgImage from '@/assets/images/random-bg.png'

import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui"


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
    isshow: false,
    confirmText:'好的，收下了',
    canvas: {
      id: 'shareCanvas',
      ratio: 3
    },
    currentScene: {
      type: 'recommend', // 'custom' 'recommend'
    },
    frame: {
      width: 0,
      height: 0,
      left: 0,
      top: 0,
    },
    customBg: {
      localUrl: '',
      remoteUrl: '',
      originWidth: 0,
      originHeight: 0,
      autoScale: 1,
      autoWidth: 0,
      autoHeight: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      rotate: 0,
    },
    bg:"https://static01.versa-ai.com/upload/61f6cb952e69/1055d4d8-2826-4855-a952-b6461c86d379.png"
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
    console.log('share page', this.$router.params) // 输出 { id: 2, type: 'test' }
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

  createCanvas = async () => {
    return new Promise(async (resolve, reject) => {
      const { currentScene, canvas } = this.state
      const context = Taro.createCanvasContext(canvas.id, this)
      if (currentScene.type === 'custom') {
        await this.canvasDrawCustom(context)
      } else if (currentScene.type === 'recommend') {
        await this.canvasDrawRecommend(context)
      }
      //绘制图片
      context.draw()
      //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
      setTimeout(function () {
        Taro.canvasToTempFilePath({
          canvasId: canvas.id,
          fileType: 'jpg',
          // 解决vivo手机模糊bug，强制图片质量为原图
          quality: 1,
          success: function (res) {
            let tempFilePath = res.tempFilePath
            resolve(tempFilePath)
          },
          fail: function (res) {
            reject(res)
          },
          complete: function () {
          }
        });
      }, 400)
    })
  }
  canvasDrawRecommend = async (context) => {
    const { currentScene, frame, canvas } = this.state
    const postfix = '?x-oss-process=image/resize,h_748,w_560'
    const { ratio = 3 } = canvas
    const sceneInfo = work.getSceneInfoById(currentScene.sceneId, this.themeData.sceneList, 'sceneId')
    let sceneConfig = {}
    try {
      sceneConfig = tool.JSON_parse(sceneInfo.sceneConfig)
    } catch (err) {
      console.log('canvasDrawRecommend 解析sceneConfig JSON字符串失败', err)
    }
    // 下载远程背景图片
    let localBgImagePath = ''
    try {
      const bgUrl = currentScene.bgUrl + postfix
      localBgImagePath = await this.downloadRemoteImage(bgUrl)
    } catch (err) {
      console.log('下载背景图片失败', err)
      return
    }
    //防止锯齿，绘的图片是所需图片的3倍
    context.drawImage(localBgImagePath, 0, 0, frame.width * ratio, frame.height * ratio)
    // 绘制元素
    await this.canvasDrawElement(context, ratio)
    // 绘制二维码
    if (sceneConfig.watermark) {
      this.canvasDrawLogo(context, ratio)
    }
  }
  canvasDrawCustom = async (context) => {
    const { customBg, canvas } = this.state
    const { ratio = 3 } = canvas
    // 自定义背景为本地图片，不需要下载
    const localBgImagePath = customBg.localUrl
    //防止锯齿，绘的图片是所需图片的3倍
    context.drawImage(localBgImagePath, customBg.x * ratio, customBg.y * ratio, customBg.width * ratio, customBg.height * ratio)
    // 绘制元素
    await this.canvasDrawElement(context, ratio)
    // 绘制二维码
    this.canvasDrawLogo(context, ratio)
  }
  // 绘制贴纸，文字，覆盖层所有元素
  canvasDrawElement = async (context, ratio) => {
    const { currentScene, foreground, frame, canvas, coverList = [] } = this.state
    // 收集所有元素进行排序
    let elements: Array<any> = []
    const element_foreground = {
      type: 'foreground',
      id: foreground.id,
      zIndex: foreground.zIndex,
      remoteUrl: foreground.remoteUrl,
      width: foreground.width * ratio,
      height: foreground.height * ratio,
      x: foreground.x * ratio,
      y: foreground.y * ratio,
      rotate: foreground.rotate,
    }
    // 收集人物
    elements.push(element_foreground)
    // 收集贴纸
    coverList.filter(v => !v.deleted).forEach(v => {
      const element_cover = {
        type: 'cover',
        zIndex: v.zIndex,
        id: v.id,
        remoteUrl: v.remoteUrl,
        width: v.width * ratio,
        height: v.height * ratio,
        x: v.x * ratio,
        y: v.y * ratio,
        rotate: v.rotate,
      }
      elements.push(element_cover)
    })
    // 对元素进行排序
    elements.sort((a, b) => {
      return a.zIndex - b.zIndex
    })
    // 下载成本地图片并绘制
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i]
      try {
        const localImagePath = await this.downloadRemoteImage(element.remoteUrl)
        element.localUrl = localImagePath
        drawElement(element)
      } catch (err) {
        console.log('下载贴纸图片失败', err)
        continue
      }
    }
    // console.log('elements', elements)
    function drawElement({ localUrl, width, height, x, y, rotate }) {
      context.save()
      context.translate(x + 0.5 * width, y + 0.5 * height)
      context.rotate(rotate * Math.PI / 180)
      context.drawImage(localUrl, -0.5 * width, -0.5 * height, width, height)
      context.restore()
      context.stroke()
    }
  }
  // 绘制二维码和logo
  canvasDrawLogo = (context, ratio) => {
    const { frame } = this.state
    // const localCodeImagePath = '../../assets/images/code.png'
    const codeWidth = 67.5 * 1.5
    const codeHeight = 67.5 * 1.5
    const codeLeft = frame.width * ratio - codeWidth - 15
    const codeTop = frame.height * ratio - codeHeight - 15
    context.save()
    context.drawImage(image_code, codeLeft, codeTop, codeWidth, codeHeight)
    context.restore()
    context.stroke()
    // const localLogoImagePath = '../../assets/images/versa.png'
    const logoWidth = 197 * 1.5
    const logoHeight = 20 * 1.5
    const logoLeft = frame.width * ratio * 0.5 - logoWidth * 0.5
    const logoTop = frame.height * ratio - logoHeight - 8
    context.save()
    context.drawImage(image_versa, logoLeft, logoTop, logoWidth, logoHeight)
    context.restore()
    context.stroke()
  }

  downloadRemoteImage = async (remoteUrl = '') => {
    // 判断是否在缓存里
    const cacheKey = `${remoteUrl}_localPath`
    const cache_source = this.cache['source']

    let localImagePath = ''
    if (cache_source.get(cacheKey)) {
      // console.log('get-cache', cacheKey, cache_source.get(cacheKey))
      return cache_source.get(cacheKey)
    } else {
      try {
        const result = await service.base.downloadFile(remoteUrl)
        localImagePath = result.tempFilePath
        console.log('url',localImagePath)
      } catch (err) {
        console.log('下载图片失败', err)
      }
    }
    return this.cache['source'].set(cacheKey, localImagePath)
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
          {/* {shareSourceType === 'image' &&
            <View className='pic-wrap'>
              {themeData.sceneType === 3 && <View class="share-bg"></View>}
              <View class="share-img">
                <Image src={shareSource} style='width: 100%; height: 100%' mode='aspectFit' /> */}
                {/* <Image src={originalCompleteImageUrl} style='width: 100%; height: 100%' mode='aspectFit'/>
              </View>
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
          } */}
          <Image src={bgImage} className="bgImage"/>
          {/* <View className="bgImage" style="background:url('{this.bg}')"></View> */}
          <View className="userMessage">
            <Image className="user" src={userImage} />
            <View className='userName'>Yannie_琳</View>
            <Image src={like}  className="like"/>
            <View style="" className="linkeNum">9</View>
            <Image src={wx} className="wx"/>
            <Image src={pyq} onClick={this.shareHandle} className="pyq"/>
          </View>
          {
            this.state.isshow === true ? <ShareDialog
            confirmText={this.state.confirmText}
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
          <View class="canvas-wrap">
            <Canvas
              disable-scroll={true}
              style={`width: ${frame.width * canvas.ratio}px; height: ${frame.height * canvas.ratio}px;`}
              canvasId={canvas.id} />
          </View>
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
