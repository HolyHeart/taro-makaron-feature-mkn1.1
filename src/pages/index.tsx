
import { ComponentClass } from 'react'
import Taro, { Component, Config, base64ToArrayBuffer } from '@tarojs/taro'
import { View, Form, Button, Image, Video, Canvas,ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import originalImageIcon from '@/assets/images/originalImage@2x.png'
import Title from '@/components/Title'
import CustomIcon from '@/components/Icon'
import RecommendList from '@/components/RecommendList'
// import MorePlayList from '@/components/MorePlayList'
import AuthModal from '@/components/AuthModal'
import BackApp from '@/components/BackApp'
import { appConfig } from '@/services/config'
import Session from '@/services/session'
import service from '@/services/service'
import globalData from '@/services/global_data'
import tool from '@/utils/tool'
import work from '@/utils/work'
import './index.less'
import { getSystemInfo } from '@/model/actions/global'

// import ShareDialog from '@/components/ShareDialog'
import like from '@/assets/images/like@3x.png'
import isliked from '@/assets/images/liked@3x.png'
import wx from '@/assets/images/wxicon@3x.png'
import pyq from '@/assets/images/pyq@3x.png'
import titleImage from '@/assets/images/maka.png'
import soul from '@/assets/images/soul.jpg'
import newYear from '@/assets/images/newYear.jpg'
import qlPro from '@/assets/images/qlpro.jpg'
import makaron from '@/assets/images/MAKARON@2x.png'
// import session from 'dist/services/session'

// const demo = 'https://static01.versa-ai.com/upload/201bae375f8b/18e62d91-fc04-46c6-8f21-7224b53eb4b7.mp4'
type PageStateProps = {
  global: {
    system: object
  }
}

// type PageDispatchProps = {}
type PageDispatchProps = {
  getSystemInfo: (data: object) => void
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Share {
  props: IProps;
}

// @connect(({ }) => ({
// }), (dispatch) => ({
// }))
connect(({ global }) => ({
  global
}), (dispatch) => ({
  getSystemInfo(data) {
    dispatch(getSystemInfo(data))
  }
}))

class Share extends Component {
  config: Config = {
    navigationBarTitleText: '懒人抠图'
  }
  userInfo:{}
  state = {
    titleHeight: 0,
    isFromApp: false,
    isGoAPP: false,
    isUserInfo: false,
    isXcx: false,
    isPlay: true,
    isWorksId: false,
    shareSourceType: 'image', // 'video' 'image'
    shareSource: '',
    originalCompleteImageUrl: '',
    videoPoster: '',
    // width: 690,
    // height: 920,
    recommendList: [],
    themeId: '',
    sceneId: '',
    themeData: {},
    sceneType: 0,
    isshow: false,
    confirmText: '好的，收下了',
    saveTitlePic: '图片已保存到手机相册',
    saveTitleVideo: '视频海报已经保存到手机相册',
    savePoint: false,
    type: 'image',
    frame: {
      width: 278,
      height: 429,
      left: 0,
      top: 0,
    } ,
    dialogFooter:{
      width:258,
      height:74,
    },
    canvas: {
      id: 'shareCanvas',
      ratio: 3
    },
    checkoutImage: '长按识别二维码查看',
    checkoutVideo: '长按识别二维码播放视频',
    logoName: 'Makaron',
    liked: 0,
    likeNumber: 0,
    user: {
      userImage: '',
      userName: '',
      // likeNumber: 0,
      uid: '',
      worksId:'',
      // liked: 0,
      templateCode: '',
      shareSource:'',
      shareSourceWidth:0,
      shareSourceHeight:0,
      firstFrame:'',
      userToken: '',
      sessionId: '',
      deviceId:'',
      worksType: 'pic',
      caluWidth: 100,
      caluHeight: 100
    },
    bgImageWidth: 335,
    bgImageHeight: 235,
    dialogImageWidth: 258,
    dialogImageHeight: 345,
    showDialogWidth: 258,
    showDialogHeight: 345,
    userXcx: {
    //   userImage: '',
    //   userName: '',
    //   likeNumber: 0,
    //   uid: '',
    //   worksId: '',
    //   liked: 0
    },
    result: {
      show: false,
      shareImage: {
        remoteUrl: '',
        localUrl: '',
      },
    },
    morePlayList: [{
      themeId: 'wxe1faaac6a4477320',
      recommendShowUrl:'https://static01.versa-ai.com/upload/f8b8cb0ff2e8/f0348bbf-6667-46d4-96eb-f34869a43867.png',
      sort:1
    },
    {
      themeId:'wx37543a814ef773a5',
      recommendShowUrl:'https://static01.versa-ai.com/upload/028e459b3c1a/1a48a5c5-b26a-49d1-bbf3-c597888c0f5a.png',
      sort:2
    },{
      themeId:'wx21630a5d4651096a',
      recommendShowUrl:'https://static01.versa-ai.com/upload/028e459b3c1a/1a48a5c5-b26a-49d1-bbf3-c597888c0f5a.png',
      sort:3
    }],
    qrCode:'',
    hotMarginTop: 0,
  }

  app = Taro.getApp()

  isSaving = false // 是否正在保存

  saveNumber = {
    number: 0,
    date: 0,
  }

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
    const systemInfo = Taro.getSystemInfoSync()
    if (systemInfo.screenHeight > 568) {
      this.setState({
        hotMarginTop: 50
      })
    }
    // console.log('system',systemInfo)
    if (/iphone x/i.test(systemInfo.model)) {
      systemInfo.isIphoneX = true
    } else {
      systemInfo.isIphoneX = false 
    }
    if (/iphone s plus/i.test(systemInfo.model)) {
      this.setState({
        hotMarginTop: 0,
        titleHeight: 0
      })    
    }
    let totalTopHeight = 0
    if (systemInfo.model.indexOf('iPhone X') !== -1) {
      totalTopHeight = 40
    } else if (systemInfo.model.indexOf('iPhone') !== -1) {
      totalTopHeight = 0
    }
    this.setState({
      titleHeight: totalTopHeight
    })
  }
  

  componentDidMount() {
    this._initPage()
    // Taro.showToast({
    //   title:this.$router.params.originalCompleteImageUrl
    // })
  }
  

  singleWorkList = async () => {
    const singleWorkData = await service.share.singleWorkList(this.state.user.worksId)
    const deleteLike = Taro.getStorageSync('deleteLike')
    if (singleWorkData.status === 'success') {
      const data = singleWorkData.result.result
      if ((data.renderPictureInfo.url || data.renderPictureInfo.firstFrame).indexOf('https') === -1) {
        var imageUrl = (data.renderPictureInfo.url || data.renderPictureInfo.firstFrame).replace(/^http/,'https')
        if(data.renderPictureInfo.firstFrame) {
          var imageFirstUrl = (data.renderPictureInfo.firstFrame).replace(/^http/,'https')
        }
        // console.log('url',imageUrl)
      } else {
        var imageUrl = data.renderPictureInfo.url || data.renderPictureInfo.firstFrame
        if(data.renderPictureInfo.firstFrame) {
          var imageFirstUrl = (data.renderPictureInfo.firstFrame)
        }
      }
      if (typeof(data.author.avatar)!== 'undefined' && (data.author.avatar).indexOf('https') === -1 ) {
        var userImage = (data.author.avatar).replace(/^http/,'https')
        // console.log('url',imageUrl)
      } else {
        var userImage = data.author.avatar 
      }
      this.userInfo = Taro.getStorageSync('userInfo')
      let liked
      if( typeof(this.$router.params.isLiked) === 'undefined') {
         liked = data.liked
      } else {
         liked = parseInt(this.$router.params.isLiked)
      }
      const shareSourceWidth = data.renderPictureInfo.imageWidth
      const shareSourceHeight = data.renderPictureInfo.imageHeight
      const caluWidth = shareSourceWidth * this.state.bgImageHeight / shareSourceHeight
      const caluHeight = shareSourceHeight * this.state.bgImageWidth / shareSourceWidth
      this.setState({
        user: {
          userImage: userImage,
          userName: data.author.nickname,
          uid: data.uid,
          worksId: data.worksId,
          shareSource : imageUrl || imageFirstUrl,
          shareSourceWidth:shareSourceWidth,
          shareSourceHeight:shareSourceHeight,
          firstFrame: imageFirstUrl,
          templateCode: data.schema,
          sessionId: deleteLike.sessionId,
          worksType: data.worksType,
          deviceId: deleteLike.deviceId,
          caluWidth: caluWidth,
          caluHeight: caluHeight
        },
        liked: liked,
        likeNumber: data.likedAmount
      }, () => {
        this.onLoad()
        this.getRect()
      })
    }
    this.getRecommendList()
  }

  getRect = () => {
    Taro.createSelectorQuery().select('#positionImage').boundingClientRect(
      (rect)=>{
        const width = rect.width 
        const height = rect.height
        this.setState({
         bgImageWidth: width,
         bgImageHeight: height
        }) 
      }).exec()
  }

  componentWillReceiveProps(nextProps) {
    // console.log(this.props, nextProps)
  }
  componentWillUnmount() { }
  componentDidShow() { }
  componentDidHide() { }
  onShareAppMessage(res) {
    const shareContent = '给你推荐一个好作品'
    let url = ''
    if(this.state.user.worksType === 'pic') {
      url = `${this.state.user.shareSource}?x-oss-process=image/resize,m_pad,h_420,w_525` 
    } else if (this.state.user.worksType === 'video') {
      url = `${this.state.user.firstFrame}?x-oss-process=image/resize,m_pad,h_420,w_525` 
      console.log('url',url)
    } else {
      url = `${this.state.user.shareSource}?x-oss-process=image/resize,m_pad,h_420,w_525` 
    }
    // const url = `${this.state.user.shareSource}?x-oss-process=image/resize,m_pad,h_420,w_525` 
    const { userInfo = {} } = globalData
    const title = `@${userInfo.nickName}：${shareContent}`
    const path = `pages/index?worksId=${this.state.user.worksId}&from=app&isGoAPP=${!this.state.isGoAPP}&isPlay=${this.state.isPlay}&isLiked=${this.state.liked}`
    // Taro.navigateTo({ url: `/pages/index?worksId=${this.state.user.worksId}&from=app&isGoAPP=${!this.state.isGoAPP}&isPlay=${this.state.isPlay}&isLiked=${this.state.liked}` })
    return {
      title: title,
      path: path ,
      imageUrl: url ,
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
  }

  processLoadData = () => {
    console.log('share page index', this.$router.params) // 输出 { id: 2, type: 'test' }
    let isFromApp,shareSourceType = 'image', videoPoster = '', shareVideoInfo = { width: 690, height: 920, }
    let { shareSource, themeId, sceneId, from, remoteURL = '', width = 690, height = 920, originalCompleteImageUrl, workID} = this.$router.params
    if (from === 'app') {
      isFromApp = true
      this.setState({
        isWorksId: false
      })
      this.state.isUserInfo = true
      if (remoteURL.indexOf('versa-ai.com') > -1) {
        shareSource = remoteURL
        if(typeof(workID) === 'undefined') {
          this.setState({
            isWorksId: true
          },()=>{ this.getRecommendList() })
        }
      } else {
        shareSource = appConfig.imageHost + remoteURL
      }
      if(typeof(this.$router.params.isGoAPP) === 'undefined') {
        const isGoAPP = !this.state.isGoAPP
        this.setState({
          isGoAPP: isGoAPP
        })
      } else {
        const isGoAPP = /ture/i.test(this.$router.params.isGoAPP)
        this.setState({
          isGoAPP: isGoAPP
        })
      }
      if(typeof(this.$router.params.isPlay) === 'undefined') {
        const isPlay = this.state.isPlay
        this.setState({
          isPlay: isPlay
        })
      } else {
        const isPlay = /true/i.test(this.$router.params.isPlay)
        this.setState({
          isPlay: isPlay
        })
      }
      this.setState({
        user: {
          worksId: workID || this.$router.params.worksId
        }
      }, () => { 
        if(this.state.user.worksId) {
          this.singleWorkList()
        } 
      })
    } else {
      if(this.state.user.worksId !== 'undefined') {
        this.setState({
          user: {
            worksId: this.$router.params.worksId,
            shareSource: shareSource
          },
          isXcx: true
        }, () => { this.getRecommendList() })
      } else {
        this.setState({
          shareSource: shareSource
        })
      }
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
    // console.log(123,globalData)
    this.setState({
      isFromApp,
      shareSourceType,
      shareSource,
      videoPoster,
      width: shareVideoInfo.width,
      height: shareVideoInfo.height,
      themeId,
      sceneId,
      originalCompleteImageUrl: decodeURIComponent(originalCompleteImageUrl),
    })
  }

  getRecommendList = async () => {
    if (this.state.user.templateCode) {
      // console.log(333333)
      const hotData = await service.share.getHotList(this.state.user.templateCode)
      // console.log('hotData', hotData)
      this.setState({
        recommendList: (hotData.result && hotData.result.result) || []
      })
    } else {
      const size = 6
      const recommendData = await service.share.getrecommendList(size)
      this.setState({
        recommendList: (recommendData.result && recommendData.result.result) || []
      })
    }
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
      Taro.navigateTo({ url: `/pages/home/index` })
    } else {
      Taro.showToast({
        title: '请授权',
        icon: 'success',
        duration: 2000
      })
    }
  }

  handleRecommendClick =  (data) => {
    const deleteLike1 = Taro.getStorageSync('deleteLike')
    this.setState({
      isFromApp: false,
      isGoAPP:false,
      isUserInfo: true,
      isXcx: false,
      isPlay: false,
      user: {
        userImage: data.author.avatar,
        userName: data.author.nickname,
        likeNumber: data.likedAmount,
        uid: data.uid,
        worksId: data.worksId,
        liked: data.liked,
        shareSource : data.renderPictureInfo.url || data.renderPictureInfo.firstFrame,
        shareSourceWidth:data.renderPictureInfo.imageWidth,
        shareSourceHeight:data.renderPictureInfo.imageHeight,
        firstFrame: data.renderPictureInfo.firstFrame,
        templateCode: data.schema,
        sessionId: deleteLike1,
        worksType: data.worksType
      },
      shareSource : data.renderPictureInfo.url || data.renderPictureInfo.firstFrame,
      userXcx: {
        userImage: data.author.avatar,
        userName: data.author.nickname,
        likeNumber: data.likedAmount,
        uid: data.uid,
        worksId: data.worksId,
        liked: data.liked
      }
    }, () => {this.singleWorkList()})
  }

  onLoad = async() => {
    const page = 'pages/index'
    const width = 100
    const worksId = this.state.user.worksId
    const sessionId = this.state.user.sessionId
    const deviceId = this.state.user.deviceId
    // console.log(999,this.state.user)
    const qrcode = await service.share.getQrCode(page, width, worksId, sessionId, deviceId)
    const scene = decodeURIComponent(qrcode)
    this.setState({
      qrCode: scene
    })
    
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
  getUserInfo = async (e) =>{
    const { detail: { userInfo } } = e
    if (userInfo) {
      const { themeData = {}, sceneId } = globalData
      globalData.userInfo = userInfo
      const result = await service.base.loginAuth(e.detail)
      
      // console.log(result)
      this.userInfo = result.result.result
      // console.log('this',this.userInfo)
      Taro.setStorage({
        key: "userInfo",
        data: this.userInfo
      })
      if(result.status === 'success') {
        if (this.state.liked === 0) {
          this.setState({
            liked: 1
          },()=>{
            this.addLike(this.userInfo) 
          })
        } else {
          this.setState({
            liked: 0
          },()=>{
            this.deleteLike(this.userInfo) 
          })
        }
      }
    } else {
      Taro.showToast({
        title: '请授权',
        icon: 'success',
        duration: 2000
      })
    }

  }

  getDialogRect = () => {
    Taro.createSelectorQuery().select('#dialogPosition').boundingClientRect(
      (rect)=>{
        const width = rect.width 
        const height = rect.height
        this.setState({
         dialogImageWidth: width,
         dialogImageHeight: height
        },()=>{
          const showDialogHeight = this.state.user.shareSourceHeight * this.state.dialogImageWidth /this.state.user.shareSourceWidth
          const showDialogWidth = this.state.user.shareSourceWidth * this.state.dialogImageHeight /this.state.user.shareSourceHeight
          this.setState({
            showDialogHeight: showDialogHeight,
            showDialogWidth:showDialogWidth
          },()=>{
            this.handelConfirm()
          })
        }) 
      }).exec()
  }
  getDialogContentRect = () => {
    Taro.createSelectorQuery().select('#dialogSize').boundingClientRect(
      (rect)=>{
        // console.log('dialogrect',rect)
        const width = rect.width 
        const height = rect.height
        this.setState({
         frame:{
           width: width,
           height: height
         }
        },()=> {
          this.getDialogRect()
        }) 
      }).exec()
  }

  getDialogFooterRect = () => {
    Taro.createSelectorQuery().select('#dialogFooterSize').boundingClientRect(
      (rect)=>{
        // console.log('dialogFooterrect',rect)
        const width = rect.width 
        const height = rect.height
        this.setState({
         dialogFooter:{
           width: width,
           height: height
         }
        }) 
      }).exec()
  }

  shareHandle =  () => {
    this.setState({
      isshow: true
    },()=>{ 
      // this.handelConfirm()
      this.getDialogContentRect()
      this.getDialogFooterRect()
    })
  }
  handelSave = () => {
    this.setState({
      isshow: false,
      savePoint: false
    })
  }

  downloadRemoteImage = async (remoteUrl = '') => {
    let localImagePath = ''
    try {
      const result = await service.base.downloadFile(remoteUrl)
      // console.log('result',result)
      localImagePath = (result.tempFilePath)
    } catch (err) {
      // console.log('下载图片失败', err)
    }
    return localImagePath
  }

  createCanvas = async () => {
    return new Promise(async (resolve, reject) => {
      const { canvas } = this.state
      const context = Taro.createCanvasContext(canvas.id, this)
      await this.canvasDrawRecommend(context)
      //绘制图片
      context.draw()
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
    const { frame, canvas, user, dialogFooter, showDialogHeight, showDialogWidth, bgImageHeight, bgImageWidth, dialogImageWidth, dialogImageHeight} = this.state
    const postfix = '?x-oss-process=image/resize,h_748,w_560'
    const { ratio = 3 } = canvas
    let localBgImagePath = ''
    try {
      if(user.worksType === 'pic') {
        const bgUrl = (user.shareSource + postfix)
        localBgImagePath = await this.downloadRemoteImage(bgUrl)
      } else if(user.worksType === 'video') {
        const bgUrl = (user.firstFrame + postfix)
        localBgImagePath = await this.downloadRemoteImage(bgUrl)
        //作品类型为video时其第一帧为背景图
        // const codeLeft = (frame.width  - dialogImageWidth ) * ratio / 2
        // const codeTop = codeLeft
        // const codeWidth = dialogImageWidth * ratio   
        // const codeHeight = dialogImageHeight * ratio
        // const result = localBgImagePath
        // context.drawImage(result, codeLeft, codeTop, codeWidth, codeHeight)
      }

      if((user.shareSourceHeight / user.shareSourceWidth) < (dialogImageHeight/dialogImageWidth)) {
        const codeLeft = (frame.width  - dialogImageWidth ) * ratio / 2
        const codeTop = (frame.height  - showDialogHeight  - dialogFooter.height) * ratio / 2
        const codeWidth = dialogImageWidth * ratio   
        const codeHeight = showDialogHeight * ratio
        context.drawImage(localBgImagePath, codeLeft, codeTop, codeWidth, codeHeight)
      } else {
        const codeLeft = (frame.width  - showDialogWidth ) * ratio / 2
        const codeTop = (frame.height  - dialogImageHeight  - dialogFooter.height) * ratio 
        const codeWidth = showDialogWidth * ratio   
        const codeHeight = dialogImageHeight * ratio
        context.drawImage(localBgImagePath, codeLeft, codeTop, codeWidth, codeHeight)
      }
    } catch (err) {
      console.log('下载背景图片失败', err)
      return
    }
    //  防止锯齿，绘的图片是所需图片的3倍 
    // 绘制元素
    // await this.canvasDrawElement(context, ratio)
    await this.canvasDrawLogo(context, ratio)
  }

  // 绘制二维码和logo
  canvasDrawLogo = async (context, ratio) => {
    const { frame, user ,qrCode, dialogFooter, dialogImageWidth, dialogImageHeight} = this.state
    const postfix = '?x-oss-process=image/resize,h_748,w_560'
    const codeWidth = 42 * ratio
    const codeHeight = 43 * ratio
    const codeLeft = frame.width * ratio - (frame.width  - dialogImageWidth ) * ratio / 2 - codeWidth
    const codeTop = dialogImageHeight * ratio + (frame.width  - dialogImageWidth ) * ratio / 2 + 20
    context.save()
    let localBgImagePath = await this.downloadRemoteImage(qrCode)
    context.drawImage(localBgImagePath, codeLeft, codeTop, codeWidth, codeHeight)
    context.restore()
    context.stroke()

    const codeLogoWidth = 40 * ratio
    const codeLogoHeight = 7 * ratio
    const codeLogoLeft = frame.width * ratio - (frame.width  - dialogImageWidth ) * ratio / 2 - 42 * ratio + 5
    const codeLogoTop = dialogImageHeight * ratio + (frame.width  - dialogImageWidth ) * ratio / 2 + 40 + 42 * ratio
    context.save()
    context.drawImage(makaron, codeLogoLeft, codeLogoTop,codeLogoWidth, codeLogoHeight)
    context.restore()
    context.stroke()

    const logoWidth = 38 * ratio
    const logoHeight = 38 * ratio
    const logoLeft = (frame.width  - dialogImageWidth ) * ratio / 2 
    const logoTop = logoLeft  + dialogImageHeight * ratio + (dialogFooter.height * ratio - logoHeight)  / 2
    context.save()
    context.arc(logoWidth / 2 + logoLeft, logoHeight / 2 + logoTop, logoWidth / 2, 0, Math.PI * 2, false)
    context.clip()
    context.setStrokeStyle(context, 'rgba(0, 0, 0, 0)')
    context.stroke()
    if(user.userImage){     
      let localUserImagePath = ''
      try {
        const userUrl = (user.userImage + postfix)
        localUserImagePath = await this.downloadRemoteImage(userUrl)
        context.drawImage(localUserImagePath, logoLeft, logoTop, logoWidth, logoHeight)
      }catch (err) {
        console.log('下载背景图片失败', err)
        return
      }
      // context.drawImage(user.userImage, logoLeft, logoTop, logoWidth, logoHeight)
    } else {
      context.drawImage(titleImage, logoLeft, logoTop, logoWidth, logoHeight)
    }
    context.restore()

    context.font = "40px 'PingFangSC-Medium'";
    context.fillStyle = "#333333";
    // 设置水平对齐方式
    // context.textAlign = "center";
    // 设置垂直对齐方式
    // context.textBaseline = "middle";
    // 绘制文字（参数：要写的字，x坐标，y坐标）
    if(this.state.user.userName && this.state.user.userName.length > 6) {
      const wordsLeft = (frame.width  - dialogImageWidth ) * ratio + logoWidth
      const userName ='@' + (this.state.user.userName).substr(0,4) + '...的作品'
      context.fillText(userName, wordsLeft, logoTop + 40)
      this.canvasDrawText(context, ratio)
    } else {
      const wordsLeft = 2 * logoLeft + logoWidth
      if (typeof(this.state.user.userName) === 'undefined') {
        var userName = '@' + '的作品'
      } else {
        var userName ='@' + this.state.user.userName + '的作品'
      }
      context.fillText(userName, wordsLeft, logoTop + 40)
      this.canvasDrawText(context, ratio)
    }
  }
  canvasDrawText = (context, ratio) => {
    const { frame, dialogImageWidth, dialogFooter, dialogImageHeight,} = this.state
    context.font = "30px 'PingFangSC-Medium'"
    context.fillStyle = "#999999"
    if(this.state.user.worksType === 'pic') {
      const wordsLeft = (frame.width  - dialogImageWidth ) * ratio + 38 * ratio
      const wordsTop = (frame.width  - dialogImageWidth ) * ratio / 2   + dialogImageHeight * ratio + (dialogFooter.height * ratio - 38 * ratio)  / 2  + 100
      context.fillText(this.state.checkoutImage, wordsLeft,wordsTop )
    } else {
      const wordsLeft = (frame.width  - dialogImageWidth ) * ratio + 38 * ratio
      const wordsTop = (frame.width  - dialogImageWidth ) * ratio / 2   + dialogImageHeight * ratio + (dialogFooter.height * ratio - 38 * ratio)  / 2  + 100
      context.fillText(this.state.checkoutVideo, wordsLeft, wordsTop)
    }
    // context.draw()
  }

  setResultModalStatus = (flag = false) => {
    const { result } = this.state
    result.show = flag
    this.setState({
      result: {
        ...result
      }
    })
  }

  handelConfirm = async () => {
    if (this.isSaving) {
      return
    }
    // this.app.aldstat.sendEvent('保存图片或视频', { '场景名': this.state.currentScene.sceneName, '场景Id': this.state.currentScene.sceneId })
    Taro.showLoading({
      title: '照片生成中...',
      mask: true,
    })
    const mySaveNumber = {
      number: Taro.getStorageSync('saveNumber').number + 1,
      date: Taro.getStorageSync('saveNumber').date
    }
    Taro.setStorageSync('saveNumber',mySaveNumber)
    this.isSaving = true
    const canvasImageUrl = await this.createCanvas()
    console.log('canvas',canvasImageUrl)
    Taro.hideLoading()
    this.isSaving = false
    this.setState({
      result: {
        shareImage: {
          localUrl: canvasImageUrl,
          remoteUrl: '',
        },
        show: true
      }
    }, async () => {
      const { url } = await service.base.upload(canvasImageUrl)
      this.setState({
        result: {
          show: this.state.result.show,
          shareImage: {
            localUrl: canvasImageUrl,
            remoteUrl: url,
          }
        }
      })
    })
    // if (this.state.user.worksType === 'pic') {
      // 保存图片到相册
      work.saveSourceToPhotosAlbum({
        location: 'local',
        sourceUrl: canvasImageUrl,
        sourceType: 'image',
        onSuccess: () => {
          Taro.showToast({
            title: '保存成功!',
            icon: 'success',
            duration: 2000
          })
          this.setState({
            savePoint: true
          })
        },
        onAuthFail: () => {
          console.log(33333)
          Taro.authModal({
            open: true
          })
          this.setResultModalStatus(false)
        },
        onFail: () => {
          console.log(22222)
          Taro.showToast({
            title: '保存失败!',
            icon: 'success',
            duration: 2000
          })
        }
      })
    // } 
    // else {
    //   work.saveSourceToPhotosAlbum({
    //     location: 'local',
    //     sourceUrl: canvasImageUrl,
    //     sourceType: 'video',
    //     onSuccess: () => {
    //       Taro.hideLoading()           
    //       Taro.showToast({
    //         title: '保存成功!',
    //         icon: 'success',
    //         duration: 2000
    //       })
    //       this.setState({
    //         savePoint: true
    //       })
    //     },
    //     onAuthFail: () => {
    //       Taro.authModal({
    //         open: true
    //       })
    //       this.setResultModalStatus(false)
    //     },
    //     onFail: () => {
    //       Taro.hideLoading()
    //       Taro.showToast({
    //         title: '保存失败!',
    //         icon: 'success',
    //         duration: 2000
    //       })
    //     }
    //   })
    // }
  }

  handlePlayClick = (data) => {
    console.log('data',data)
    if (!data.themeId) {
      console.log('why')
      return
    }
    Taro.navigateToMiniProgram({
      appId: data.themeId,
      success(res) {
        // 打开成功
      },
      fail(res) {
        console.log('打开失败')
      }
    })
  }

  addLike = async (data) => {
    try {
      const addLiked = await service.share.addLikeWork(this.state.user.worksId,data.uid,data.userToken)
        if (addLiked.status === 'success') {
          const likedNumber = this.state.likeNumber + 1
          this.setState({
            likeNumber: likedNumber
          })
        }
    } catch (error) {
      console.log(222, error)
    }
  }

  deleteLike = async (data) => {
    try {
      const cancelLiked = await service.share.deleteLike(this.state.user.worksId,data.uid,data.userToken,this.state.user.sessionId)
      if (cancelLiked.status === 'success') {
        const likeNum = this.state.likeNumber - 1
        this.setState({
          likeNumber: likeNum
        })
      }
    } catch (error) {
      console.log(222, error)
    }
  }

  handleContact (e) {
    console.log(e.detail)
  }


  render() {
    const { isFromApp, isGoAPP, isUserInfo, isXcx, isPlay, isWorksId,bgImageHeight, bgImageWidth,dialogImageHeight,showDialogWidth,dialogImageWidth,showDialogHeight, shareSourceType, shareSource, videoPoster, width, height, recommendList, originalCompleteImageUrl, confirmText, isshow, savePoint, 
      saveTitlePic, saveTitleVideo, type, checkoutImage, checkoutVideo, morePlayList, user, userXcx, qrCode, frame, canvas, hotMarginTop} = this.state
    return (
      <View className='page-share'>
        <Title
          leftStyleObj={{ left: Taro.pxTransform(12) }}
          renderLeft={
            <CustomIcon type="home" theme="dark" onClick={this.pageToHome} />
          }
          color='#333'
        >懒人抠图</Title>
        {/* {isFromApp ?  */}
        <View className='main-section' style={{marginTop:(this.state.titleHeight + hotMarginTop/2) + 'rpx' }}>
        {/* {console.log(11,user.worksId)} */}
        {shareSourceType === 'image' && isFromApp && shareSource !== '' && isWorksId &&
          <View>
            {themeData.sceneType === 3 && <View class="share-bg"></View>}
            <View className="showImage">
              <View className="blur" style={{backgroundImage: `url(${shareSource})`}}></View>
              <Image src={shareSource} mode="aspectFill"  className="bgImageVertical" />
            </View>
          </View>
        }
        {shareSourceType === 'video' && isFromApp && shareSource !== '' && isWorksId &&
          <View className='showImage'>
             <Video
              className="bgImageVertical"
              loop
              autoplay
              src={user.shareSource}
              poster={videoPoster}
              objectFit='cover'
              controls
              >
              </Video>
          </View>
        }
        { isXcx && shareSourceType === 'image' &&
          <View>
            {themeData.sceneType === 3 && <View class="share-bg"></View>}
            <View className="showImage">
               <View className="showImage blur" style={{backgroundImage: `url(${user.shareSource})`}}></View>
                <Image src={user.shareSource} mode="aspectFill"  className="bgImage" />
            </View>
          </View>
        }
        {isXcx && shareSourceType === 'video' &&
          <View className='video-wrap showImage'>
             <Video
              className="video bgImage"
              // style={{ width: Taro.pxTransform(width), height: Taro.pxTransform(height - 2) }}
              loop
              autoplay
              src={user.shareSource}
              poster={videoPoster}
              objectFit='cover'
              controls
              >
              </Video>
          </View>
        }
        {
          (user.shareSourceHeight / user.shareSourceWidth) >= ((bgImageHeight/bgImageWidth)) && user.worksType === 'pic' &&  
          <View className="showImage" id="positionImage"> 
            <View className="blur" style={{backgroundImage: `url(${user.shareSource})`}}></View>
            <Image src={user.shareSource}   className="bgImageVertical" 
            style={{width:`${user.caluWidth}px` }}/> 
           </View>
        }                                                                                                                                                                                                                                       
        {
          (user.shareSourceHeight / user.shareSourceWidth) < (bgImageHeight/bgImageWidth) && user.worksType === 'pic' &&  
            <View className="showImage" id="positionImage"> 
              <View className="blur" style={{backgroundImage: `url(${user.shareSource})`}}></View>
              <Image src={user.shareSource}   className="bgImageHorizontal"
              style={{height:`${user.caluHeight}px` }}
              />  
            </View>
        }
        { (user.shareSourceHeight / user.shareSourceWidth) >= ((bgImageHeight/bgImageWidth)) && user.worksType === 'video' &&
            <View className="showImage" id="positionImage">
              <View className="blur" style={{backgroundImage: `url(${user.shareSource})`}}></View>
              <Video
                className="video bgImageVertical"
                // style={{ width: Taro.pxTransform(width), height: Taro.pxTransform(height - 2) }}
                style={{width:`${user.caluWidth}px` }}
                loop
                autoplay
                src={user.shareSource}
                poster={videoPoster}
                objectFit='cover'
                controls
              ></Video>
            </View>
        }
        { (user.shareSourceHeight / user.shareSourceWidth) < (bgImageHeight/bgImageWidth) && user.worksType === 'video' &&
        <View className="showImage" id="positionImage">
          <View className="blur" style={{backgroundImage: `url(${user.shareSource})`}}></View>
          <Video
            className="video bgImageHorizontal"
            style={{height:`${user.caluHeight}px` }}
            loop
            autoplay
            src={user.shareSource}
            poster={videoPoster}
            objectFit='cover'
            controls
          ></Video>
        </View>
          }
          <View className="userMessage">
            {
              (isUserInfo && user.userImage) ||  isXcx  || isWorksId ? <Image className="user" src={user.userImage} /> : <Image className="user" src={titleImage} /> 
            }
            <View className='userName'>{user.userName}</View>
            { isUserInfo &&
              <Button openType="getUserInfo" onGetUserInfo={this.getUserInfo}  className="likeAuth like">
                { this.state.liked === 0 && <Image src={like}  className="like" />}
                { this.state.liked === 1 && <Image src={isliked}  className="like" />}
              </Button>               
            }
            { isUserInfo && <View style="" className="likeNum">{this.state.likeNumber}</View>}
            { isUserInfo  && !isWorksId &&
              <Button openType="share" className="share wx">
                <Image src={wx} className="wx"/>
              </Button>
            }
            { isUserInfo && !isWorksId && <Image src={pyq} onClick={this.shareHandle} className="pyq"/>}
          </View>
          {
            isshow === true ? 
            <View className="wx_dialog_container">           
              <View className="wx-mask"></View>
              <View className="wx-dialog">
                {savePoint === true && user.worksType === 'pic' ? <View className="wx-dialog-save">{saveTitlePic}</View> : <View className="wx-dialog-save"></View>}
                {savePoint === true && user.worksType === 'video'? <View className="wx-dialog-save">{saveTitleVideo}</View> : <View className="wx-dialog-save"></View>}
                <View className="wx-dialog-content" id="dialogSize">
                    <View className="bgUrl" id="dialogPosition">
                    {
                      user.worksType === 'pic' && (user.shareSourceHeight / user.shareSourceWidth) < ((dialogImageHeight/dialogImageWidth)) &&
                      // <View className="bgUrl">
                        // <View className="blur" style={{backgroundImage: `url(${user.shareSource})`}}></View>
                        <Image src={user.shareSource} className="bgUrlSizeHorizontal" 
                          // mode="aspectFill"  
                          style={{height:`${showDialogHeight}px` }}/> 
                      // </View>
                    }
                    {
                      user.worksType === 'pic' && (user.shareSourceHeight / user.shareSourceWidth) >= ((dialogImageHeight/dialogImageWidth)) &&
                      // <View className="bgUrl">
                      // <View className="blur" style={{backgroundImage: `url(${user.shareSource})`}}></View>
                      <Image src={user.shareSource} className="bgUrlSizeVertical" 
                      // mode="aspectFill"  
                      style={{width:`${showDialogWidth}px` }}/> 
                       // </View>
                    }
                    {
                      user.worksType === 'video' && (user.shareSourceHeight / user.shareSourceWidth) < ((dialogImageHeight/dialogImageWidth)) &&
                      <View className="bgUrl">
                        <View className="blur" style={{backgroundImage: `url(${user.shareSource})`}}></View>
                        <Video
                          className="bgUrlSizeHorizontal"
                          style={{height:`${showDialogHeight}px` }}
                          loop
                          autoplay
                          src={user.shareSource}
                          poster={videoPoster}
                          objectFit='cover'
                          controls>
                        </Video>
                      </View>
                    }
                    {
                      user.worksType === 'video' && (user.shareSourceHeight / user.shareSourceWidth) >= ((dialogImageHeight/dialogImageWidth)) &&
                      <View className="bgUrl">
                        <View className="blur" style={{backgroundImage: `url(${user.shareSource})`}}></View>
                        <Video
                          className="bgUrlSizeHorizontal"
                          style={{width:`${showDialogWidth}px` }}
                          loop
                          autoplay
                          src={user.shareSource}
                          poster={videoPoster}
                          objectFit='cover'
                          controls>
                        </Video>
                    </View>
                    }
                    </View>
                    <View className="userInfo" id="dialogFooterSize">
                      {/* <Image className="userimage" src={user.userImage} /> */}
                      {
                        user.userImage && <Image className="userimage" src={user.userImage} />
                      }
                      {
                        !user.userImage && <Image className="userimage" src={titleImage} />
                      }
                      <View className="username">
                        <View className="userwork"><View className="name">@{user.userName}</View>的作品</View>
                        {
                          user.worksType === 'pic' ? <View className="seetwo">{checkoutImage}</View> : <View className="seetwo">{checkoutVideo}</View>
                        }
                      </View>
                      <View className="two">
                        <Image className="twoCode" src={qrCode} />
                        <Image className="logo" src={makaron} />
                      </View>
                    </View>
                  <AuthModal />
                </View>
                <View className="wx-dialog-footer">
                  <Button className="wx-dialog-btn" onClick={this.handelSave}  style="flex:1" >
                      {confirmText}
                  </Button>
                </View>
              </View>
            </View>
            : ''
          }
          <View className="canvas-wrap">
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
                {isFromApp && isPlay?
                  <Button
                    open-type="contact"
                    className="custom-button pink"
                    hoverClass="btnhover"
                    onClick={this.handleContact}
                  >制作同款作品</Button> :
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
          <View className='recommend-wrap' style={{ marginTop: hotMarginTop/2 + 'rpx'}}>
            <View className='recommend-title'>热门作品</View>
            <RecommendList
              list={recommendList}
              onClick={this.handleRecommendClick}
            />
          </View>
          <View className='recommend-wrap'>
            <View className='recommend-title'>更多好玩</View>
            <View className="recommend" >
              <ScrollView className="scroll" scrollX>
                { 
                  morePlayList.map((item) => {
                    return <View className="recommend-item" onClick={this.handlePlayClick.bind(this,item)} >
                    {
                      item.sort === 1 &&  
                      <Button className="recommend-button" hoverClass="btn-hover"formType='submit'>
                        <Image className='recommend-image' src={qlPro} style='width: 100%; height: 100%' mode='scaleToFill'/>   
                      </Button>
                    }
                    {
                      item.sort === 2 &&  
                      <Button className="recommend-button" hoverClass="btn-hover"formType='submit'>
                        <Image className='recommend-image' src={newYear} style='width: 100%; height: 100%' mode='scaleToFill'/>   
                      </Button>
                    }
                    {
                      item.sort === 3 &&  
                      <Button className="recommend-button" hoverClass="btn-hover"formType='submit'>
                        <Image className='recommend-image' src={soul} style='width: 100%; height: 100%' mode='scaleToFill'/>   
                      </Button>
                    }
                  </View> 
                  })
                }
              </ScrollView>
            </View>
          </View>
        </View>
        {isGoAPP && isFromApp && <BackApp onClick={this.handleOpenApp} styleObj={{marginTop:(this.state.titleHeight + hotMarginTop/2) + 'rpx'} }/>}
        <AuthModal />
      </View>
    )
  }
}

export default Share as ComponentClass<PageOwnProps, PageState>

