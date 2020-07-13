import {ComponentClass} from 'react'
import Taro, {Component, Config} from '@tarojs/taro'
import {View, Button, Image, Canvas, ScrollView, CoverView} from '@tarojs/components'
import {connect} from '@tarojs/redux'

import {getSystemInfo,setSceneList} from '@/model/actions/global'
import tool from '@/utils/tool'
import work from '@/utils/work'
import Title from '@/components/Title'
import CustomIcon from '@/components/Icon'
import Sticker from '@/components/Sticker'
import Loading from '@/components/Loading'
import globalData from '@/services/global_data'
import Session from '@/services/session'
import service from '@/services/service'
import {appConfig} from '@/services/config'
import {createCache} from '@/services/cache'
import './index.less'
import image_code from '@/assets/images/code.png'
import image_versa from '@/assets/images/versa.png'
import addTips from "@/assets/images/tips_addpic@2x.png";
// import Dialog from '@/components/Dialog'

import BankCard from '@/components/BankCard'
import * as THREE from '../../utils/libs/three.weapp'
import { renderExample1 as renderExample, change } from '@/utils/example.js'

type PageStateProps = {
  global: {
    system: object
    sceneList: []
  }
}

type PageDispatchProps = {
  getSystemInfo: (data: object) => void
  setSceneList: (data: object) => void
}

type PageOwnProps = {}

type PageState = {
  foreground: {
    remoteUrl: string,
    zIndex: number,
    width: number,
    height: number,
    x: number,
    y: number,
    rotate: number,
    originWidth: number,
    originHeight: number,
    autoWidth: number,
    autoHeight: number,
    autoScale: number,
    fixed: boolean,
    visible: boolean,
    isMirror: boolean
  },
  coverList: Array<object>
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Bank {
  props: IProps;
}

@connect(({global}) => ({
  global
}), (dispatch) => ({
  getSystemInfo(data) {
    dispatch(getSystemInfo(data))
  },
  setSceneList(data) {
    dispatch(setSceneList(data))
  },
}))

class Bank extends Component {
  config: Config = {
    navigationBarTitleText: '懒人抠图',
    disableScroll: true,
    enablePullDownRefresh: false
  }
  bgImg3dUrl = 'https://static01.versa-ai.com/upload/506854e1f208/93ada06e-3c17-4d94-b390-0b58358c7a5e.png'
  previewBack = false
  state = {
    lockScene: false,
    show3d: true,
    load3d: false,
    gltfURL: 'https://static01.versa-ai.com/upload/e8eebc591fa1/0e044c3f-0aaa-40ce-95a3-41efa721ba35.gltf',
    imageURL: 'https://static01.versa-ai.com/upload/2c7d654de708/730a7f8a-4795-444c-baed-6857346a51ab.card_03',
    showBankLogo: true,
    showMyLogo: true,
    showType: 0, // 0 展示模式 1 修改模式 2 结束
    rawImage: {
      localUrl: '',
      remoteUrl: ''
    },
    content: '',
    isshow: false,
    cancelText: '取消',
    confirmText: '看广告',
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
    chooseText: '替换人像照片',
    foreground: {  //存储任务切图信息
      id: 'foreground',
      remoteUrl: '',
      zIndex: 2,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      rotate: 0,
      originWidth: 0, // 原始宽度
      originHeight: 0, // 原始高度
      autoWidth: 0, // 自适应后的宽度
      autoHeight: 0, // 自适应后的高度
      autoScale: 0, // 相对画框缩放比例
      fixed: false, // 是否固定
      isActive: true, // 是否激活
      loaded: false, // 是否加载完毕
      visible: true, // 是否显示
      isMirror: false
    },
    coverList: [],
    sceneList: [],
    guiderTop: '',
    hasGuide: false,
    currentScene: {
      type: '', // 'custom' 'recommend'
    },
    canvas: {
      id: 'shareCanvas',
      ratio: 3
    },
    loading: false,
    result: {
      show: false,
      remoteUrl: '',
      localUrl: '',
    },
    drawBoard: {
      width: '600rpx',
      height: '380rpx'
    },
    ableToShareToQZone: false,

    BottomPicture: [], //存储底部数据

    screenHeight: 0,//计算滚动用
    screenWidth: 0,
    titleHeight: 0,
    tooltipHeight: 0,
    staticBgUrl:'',

    logo:{
      myLogo:"https://static01.versa-ai.com/upload/ce29be05e80a/947c8a95-62b1-4eef-8db4-9b22d3561620.png",
      bankLogo:"https://static01.versa-ai.com/upload/4a72479c5a83/298bd350-21ff-4e39-9189-25967ad4cb94.png"
    },

    margin:0
  }


  tempForground

  app = Taro.getApp()

  // 全局主题数据
  themeData = {
    sceneList: [],
    rawCoverList: [], // 原始贴纸数据
  }

  cache = {
    foreground: createCache('foreground'),
    cover: createCache('cover'),
    source: createCache('source'),
  }

  isSaving = false // 是否正在保存
  saveNumber = {
    number: 0,
    date: 0,
  }

  componentWillMount() {//计算设备信息
    const { getSystemInfo } = this.props
    const systemInfo:any = Taro.getSystemInfoSync()
    if (/iphone x/i.test(systemInfo.model) || (/iphone/i.test(systemInfo.model) && /unknown/.test(systemInfo.model)) || /iphone\s11/i.test(systemInfo.model)) {
      // iPhone XS Max China-exclusive<iPhone11,6>
      // 'iPhone X'
      systemInfo.isIphoneX = true
    } else {
      systemInfo.isIphoneX = false
    }
    getSystemInfo(systemInfo)
    const setTop = Taro.getStorageSync('setTop')
    let tooltipHeight = 0
    if (!setTop) {
      tooltipHeight = systemInfo.screenWidth / 750 * 92
    }
    console.log('🔥初始化高度🔥', '屏幕高度：', systemInfo.screenHeight, '屏幕宽度：', systemInfo.screenWidth, '系统参数：', systemInfo)
    this.setState({
      screenHeight: systemInfo.screenHeight,
      screenWidth: systemInfo.screenWidth,
      tooltipHeight: tooltipHeight,
      picHeight: systemInfo.screenWidth * 0.8 * 0.94 * 0.5 * 0.9 + 1
    })
    let totalTopHeight = 72
    if (/iphone x/i.test(systemInfo.model) || (/iphone/i.test(systemInfo.model) && /unknown/.test(systemInfo.model)) || /iphone\s11/i.test(systemInfo.model)) {
      totalTopHeight = 85
    } else if (systemInfo.model.indexOf('iPhone') !== -1) {
      totalTopHeight = 62
    }
    console.log(totalTopHeight,'tttttttttttttttttttttt')
    this.setState({
      titleHeight: totalTopHeight
    })

    const { global } = this.props
    let { sceneList }:any = global
    const scene:any = sceneList[0]
    let staticUrl=scene.bgUrl;
    this.setState({
      sceneList,
      staticBgUrl:staticUrl,
      currentScene:scene
    })
    globalData.sceneConfig = sceneList[0];
    // console.log(sceneList,'sceneList')

  }

  componentDidMount() {
    wx.cloud.init()
    this._initPage()
    this.canIShareToQQZone()
    if (Taro.getStorageSync('saveNumber') === '' || Taro.getStorageSync('saveNumber').number === 0) {
      Taro.setStorageSync('saveNumber', this.saveNumber)
    }
    const date1 = new Date()

    if (date1.getTime() - Taro.getStorageSync('saveNumber').date > 86400000) {
      this.saveNumber = {
        number: 0,
        date: date1.getTime()
      }
      Taro.setStorageSync('saveNumber', this.saveNumber)
    }
  }

  componentWillReceiveProps(nextProps) {
    // // console.log(this.props, nextProps)
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  onShareAppMessage(res) {
    // if (res.from === 'button') {
    //   // console.log('页面按钮分享', res.target)
    // }
    this.app.aldstat.sendEvent('生成页分享', {
      '场景名': this.state.currentScene.sceneName,
      '场景Id': this.state.currentScene.sceneId
    })
    const {currentScene, result = {}} = this.state
    const {shareImage = {}} = result
    const shareContent = currentScene.shareContent || ''
    const shareImageUrl = `${shareImage.remoteUrl}?x-oss-process=image/resize,m_pad,h_420,w_525`
    const data = {
      shareSource: shareImage.remoteUrl,
      themeId: globalData.themeId || '',
      sceneId: currentScene.sceneId || '',
    }

    const {userInfo = {}} = globalData
    const path = `/pages/index?shareSource=${shareImageUrl}`
    // // console.log('url',path)
    // const title = `@${userInfo.nickName}：${shareContent}`
    if (!shareImage.remoteUrl) {
      // console.log('shareImage.remoteUrl', shareImage.remoteUrl)
      return {
        // title: title,
        path: '/pages/home/index',
        imageUrl: currentScene.thumbnailUrl,
      }
    }
    // // console.log('789',title, path, shareImageUrl)
    // Taro.navigateTo({ url: `/pages/index?shareSource=${shareImageUrl}` })
    return {
      // title: title,
      path: path,
      imageUrl: shareImageUrl,
      success: () => {
        // console.log('分享成功')
      },
    }
  }

  _initPage = async () => {
    // this.initRawImage()
    await Session.set()
    this.initSceneData(() => {
      const firstViewEditor = Taro.getStorageSync('firstViewEditor')
      if (!firstViewEditor) {
        const query = wx.createSelectorQuery()
        query.select('#addPhoto').boundingClientRect()
        query.selectViewport().scrollOffset()//获取滚动区域，
        query.exec((res) => {
          res[0] &&
          this.setState({
            guiderTop: res[0].top - 77 - 15
          })
        })
        Taro.setStorageSync('firstViewEditor', true)
      }
    })
  }


  // qq空间分享兼容性检测
  canIShareToQQZone = () => {
    if (wx.canIUse('openQzonePublish')) {
      // console.log('🔥🔥🔥可以分享到空间')
      this.setState({
        ableToShareToQZone: true
      })
    } else {
      // console.log('微信版本小程序不支持分享到QQ空间')
    }
  }


  // 公共方法
  showLoading = () => {
    this.setState({
      loading: true
    })
  }
  hideLoading = () => {
    this.setState({
      loading: false
    })
  }
  setStateTarget = (key, value = {}, callback?: () => void) => {
    const target = this.state[key]
    this.setState({
      [key]: {
        ...target,
        ...value
      }
    }, () => {
      typeof callback === 'function' && callback()
    })
  }

  calFrameRect = () => {
    work.getDomRect('crop', rect => {
      this.setState({
        frame: {
          width: rect.width,
          height: rect.height,
          left: rect.left,
          top: rect.top,
        }
      }, () => {
        this.initCoverData()
      })
    })
  }

  // 初始化场景信息
  initSceneData = async (callback) => {
    const currentScene = globalData.sceneConfig//来自于主页给每一项设置的，
    // console.log(currentScene, 'initiating the first scene&&adding')
    this.setState({
      currentScene: {
        ...this.state.currentScene,
        ...currentScene,
        type: 'recommend'
      }
    }, () => {
      typeof callback === 'function' && callback()
    })
  }
  // 初始化贴纸
  initCoverData = () => {
    const {currentScene} = this.state
    // const sceneInfo = work.getSceneInfoById(currentScene.sceneId, this.themeData.sceneList, 'sceneId')
    const sceneConfig = tool.JSON_parse(currentScene.sceneConfig)
    const {cover = {}} = sceneConfig
    // console.log(cover, 'covering this is cover ,this is 边框') //是边框的信息
    this.themeData.rawCoverList = cover.list || []
    const coverList = work.formatRawCoverList(this.themeData.rawCoverList)
    this.setState({
      coverList: coverList
    })
    // console.log('initCoverData cover', cover, coverList)
  }

  // 初始化分割
  initSegment = async () => {
    let separateRes
    try {
      // console.log('trying trying trying')
      separateRes = await service.core.separateLocalImg(globalData.choosedImage, {
        type: -1,
        loading: true,
        showLoading: () => {
          this.showLoading()
        },
        hideLoading: () => {
          if (this.state.foreground.loaded) {
            this.hideLoading()
          }
        }
      })// 得到已经分割好的图片

      // console.log(separateRes, 'this is first separateRes'); //部分url

      const {cateImageDict = {}} = separateRes.result || {}

      if (!cateImageDict['16'] && !cateImageDict['16-1']) {
        // console.log('技术犯规了')
        work.pageToError()
        return
      }
    } catch (err) {
      // console.log('catch', err)
      this.hideLoading()
      return {}
    }
    return (separateRes && separateRes.result) || {}
  }

  initSeparateData = async (separateResult) => {
    const {currentScene, foreground} = this.state
    this.changeSceneChooseSegment(currentScene, separateResult, (res = {}) => {
      Taro.setStorageSync('lastSeparateImage', res.separateUrl)
      this.setState({
        chooseText: '重新上传人像',
        foreground: {
          ...foreground,
          remoteUrl: res.separateUrl
        }
      })
    })

  }

  // 根据场景决定头像
  async changeSceneChooseSegment(currentScene, separateResult = {}, callback) {
    const {imageHost} = appConfig
    if (!separateResult.cateImageDict) {
      return
    }
    // 判断分离的是全身还是头像    //adding by YUjinZENG-explanation segmentType是导入数据的时候就定义好了的
    let separateUrl = ''
    let separateMaskUrl = ''
    // console.log(currentScene, 'currentScenceing---ing')
    if (currentScene.segmentType === 1) { //目前的数据都是0；所以下面的选项也不影响
      separateUrl = imageHost + separateResult.cateImageDict['16-1']//['16-1']没有这个key啊
      separateMaskUrl = imageHost + separateResult.maskImageDict['16-1']
    } else {
      separateUrl = imageHost + separateResult.cateImageDict['16']
      separateMaskUrl = imageHost + separateResult.maskImageDict['16']
    }
    typeof callback === 'function' && callback({
      separateUrl, //远程请求的链接
      separateMaskUrl
    })
  }

  // 背景
  handleBackgroundClick = () => {
    this.setForegroundActiveStatus(false)
    this.setCoverListActiveStatus({type: 'all'}, false)
  }
  // 自定义背景
  onCustomBgLoaded = (detail: object) => {
    const {width, height} = detail
    this.setStateTarget('customBg', {
      originWidth: width,
      originHeight: height
    }, () => {
      this.customBgAuto()
    })
  }
  handleBgLoaded = ({detail}) => {
      let k = detail.width / detail.height;
      this.setState({
        drawBoard: {
          width: `600rpx`,
          height: `${600 / k}rpx`//`${detail.height * 345 / detail.width * 2}rpx` //690 920
        }
      }, () => {
        setTimeout(() => {
          this.calFrameRect()
        }, 250);
      })
  }
  handleChangeCustomBgStyle = (data) => {
    // // console.log('handleChangeCustomBgStyle', data)
    const {frame} = this.state
    if (data.x > 0) {
      data.x = 0
    }
    if (data.y > 0) {
      data.y = 0
    }
    if (frame.width - data.width > data.x) {
      data.x = frame.width - data.width
    }
    if (frame.height - data.height > data.y) {
      data.y = frame.height - data.height
    }
    const {customBg} = this.state
    this.setState({
      customBg: {
        ...customBg,
        ...data
      }
    }, () => {
    })
  }
  handleCustomBgTouchstart = () => {
    // // console.log('handleCustomBgTouchstart')
    this.setForegroundActiveStatus(false)
    this.setCoverListActiveStatus({type: 'all'}, false)
  }
  handleCustomBgTouchend = () => {
    // // console.log('handleCustomBgTouchend')
  }
  // 人物
  onForegroundLoaded = (detail: object, item?: any) => {
    //// console.log('handleForegroundLoaded', detail, item) // item 就是foreground存的信息
    if(this.previewBack){
        this.previewBack = false;
        console.log('stop auto ')
        return false;
    }
    this.hideLoading()
    const {width, height} = detail
    this.setStateTarget('foreground', {
      originWidth: width,
      originHeight: height,
      loaded: true,
      isMirror: false
    }, () => {
        console.log('aaaaaa')
      this.foregroundAuto()
    })
  }
  handleChangeStyle = (data) => {
    const {foreground} = this.state
    // console.log(data, '====== this is to check data =====')
    this.setState({
      foreground: {
        ...foreground,
        ...data
      }
    }, () => {
    })
  }
  handleForegroundTouchstart = (sticker) => {
    // // console.log('handleForegroundTouchstart', sticker)
    this.setForegroundActiveStatus(true)
    this.setCoverListActiveStatus({type: 'all'}, false)
  }
  handleForegroundTouchend = () => {
    this.storeForegroundInfo()
  }
  // 贴纸
  onCoverLoaded = (detail: object, item?: any) => {
    const {width, height} = detail
    const originInfo = {
      originWidth: width,
      originHeight: height
    }
    this.coverAuto(originInfo, item,()=>{
        this.setState({
            lockScene: false
        })
    })
  }
  handleChangeCoverStyle = (data) => {
    // console.log(data, '---------this is to check data to check id -------')
    const {id} = data
    const {coverList} = this.state
    coverList.forEach((v, i) => {
      if (v.id === id) {
        coverList[i] = data
      }
    })
    this.setState({
      coverList: coverList
    })
  }
  handleCoverTouchstart = (sticker) => {
    // // console.log('handleCoverTouchstart', sticker)
    this.setCoverListActiveStatus({type: 'some', ids: [sticker.id]}, true)
    this.setForegroundActiveStatus(false)
  }
  handleCoverTouchend = (sticker) => {
    // // console.log('handleCoverTouchend', sticker)
    this.storeCoverInfo(sticker)
    this.app.aldstat.sendEvent('贴纸使用', {'贴纸Id': sticker.id})
  }

  pageToHome = () => {
    this.setState({
      showType: 0,
      show3d: true,
      coverList: []
    })
    //Taro.navigateBack({ delta: 1 })
  }

  backHandler(){
    if(this.state.showType === 1){
      this.pageToHome();
    }else{
      let temp = {...this.tempForground}
      temp.fixed = false;
      this.setState({
        showType: 1,
        foreground: temp
      })
    }
  }

  handleDeleteCover = (sticker) => {
    // // console.log('handleDeleteCover', sticker)
    const {id} = sticker
    const {coverList} = this.state
    coverList.forEach((v, i) => {
      if (v.id === id) {
        coverList[i] = {
          ...v,
          deleted: true,
          visible: false
        }
      }
    })
    this.setState({
      coverList: coverList
    })
    this.app.aldstat.sendEvent('贴纸删除', {'贴纸Id': sticker.id})
  }

  // 更换场景
  handleChooseScene = (scene) => {
    const {currentScene} = this.state
    if (currentScene.sceneId === scene.sceneId) {
      return
    }
    this.setState({
      currentScene: {
        ...currentScene,
        ...scene,
        type: 'recommend'
      }
    }, () => {
      // // console.log('handleChooseScene', this.state.currentScene)
      this.foregroundAuto()
      this.initCoverData()
      this.app.aldstat.sendEvent('选择场景', {
        '场景名': this.state.currentScene.sceneName,
        '场景Id': this.state.currentScene.sceneId
      })
    })
  }


  // 保存
  handleOpenResult = async () => {
    if (!this.state.foreground.remoteUrl) {
      return Taro.showToast({
        title: '图片中没有人物，请重新上传。',
        icon: 'none',
        duration: 2000
      })
    }
    if (!this.state.currentScene.bgUrl) {
      return
    }
    if (this.isSaving) {
      return
    }
    this.app.aldstat.sendEvent('保存图片或视频', {
      '场景名': this.state.currentScene.sceneName,
      '场景Id': this.state.currentScene.sceneId
    })
    Taro.showLoading({
      title: '照片生成中...',
      mask: true,
    })
    // const mySaveNumber = {
    //   number: Taro.getStorageSync('saveNumber').number + 1,
    //   date: Taro.getStorageSync('saveNumber').date
    // }
    // Taro.setStorageSync('saveNumber', mySaveNumber)
    this.isSaving = true
    const canvasImageUrl = await this.createCanvas()
    // console.log(canvasImageUrl, '这是canvasImageUrl')//图片的本地地址
    Taro.hideLoading()
    this.isSaving = false
    this.setState({
      result: {
        shareImage: {
          localUrl: canvasImageUrl,
          remoteUrl: '',
        },
        show: true
      },
      // staticBgUrl:canvasImageUrl,
      // foreground:{visible:true,fixed:true}
    }, async () => {
      const {url} = await service.base.upload(canvasImageUrl)
      this.setState({
        result: {
          show: this.state.result.show,
          shareImage: {
            localUrl: canvasImageUrl,
            remoteUrl: url, //获得远端的url
          }
        },

      })
    })


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
        this.tempForground=this.state.foreground;
        console.log(this.tempForground===this.state.foreground,'this is first to check tempForground')
        let temp={...this.tempForground}
        temp.fixed=true;
        temp.isActive=false;
        this.setState({
          showType: 2,
          foreground:{...temp}
        })
      },
      onAuthFail: () => {
        Taro.authModal({
          open: true
        })
        this.setResultModalStatus(false)
      },
      onFail: () => {
        Taro.showToast({
          title: '保存失败!',
          icon: 'success',
          duration: 2000
        })
      }
    })


    //console.log(this.state.foreground,'this is foreground when showtype is 2')
  }
  // 再玩一次
  handlePlayAgain = () => {
    this.app.aldstat.sendEvent('生成页再玩一次', '再玩一次')
    this.setState({
      result: {
        show: false,
        shareImage: {
          remoteUrl: '',
          localUrl: '',
        },
      }
    })
  }

  // 发布到QQ空间

  publishToQzone = () => {
    const {currentScene} = this.state
    const shareContent = currentScene.shareContent || (globalData.themeData && globalData.themeData.shareContent)
    qq.openQzonePublish({
      text: shareContent,
      media: [
        {
          type: 'photo',
          path: this.state.result.shareImage.localUrl
        }
      ]
    })
  }

  setResultModalStatus = (flag = false) => {
    const {result} = this.state
    result.show = flag
    this.setState({
      result: {
        ...result
      }
    })
  }

  createCanvas = async () => {
    return new Promise(async (resolve, reject) => {
      const {currentScene, canvas} = this.state
      const context = Taro.createCanvasContext(canvas.id, this) //组件绘图的上下文

      if (currentScene.type === 'custom') {
        await this.canvasDrawCustom(context)
      } else if (currentScene.type === 'recommend') {
        await this.canvasDrawRecommend(context) //【将背景图片&&边框，放到画布】
      }
      //绘制图片
      context.draw() //【有点像将之前的设置保存到context中】
      //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
      setTimeout( () => {
          // console.log(canvas.id,666666)
        Taro.canvasToTempFilePath({ //存储照片
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

  async preview(){
      this.showLoading();
      this.tempForground = this.state.foreground;
      let imageURL = await this.createCanvas3d();
      let show3d = !this.state.show3d
      this.previewBack = show3d ? false : true
      let coverList = show3d ? this.state.coverList : []
      let temp = {...this.tempForground}
      temp.fixed = this.state.showType === 1 ? false : true;
      this.setState({
        show3d,
        imageURL,
        coverList,
        foreground: temp
    });
    this.hideLoading();
  }

  createCanvas3d = async () => {
    const {canvas} = this.state
    const context = Taro.createCanvasContext(canvas.id, this) //组件绘图的上下文
    return new Promise(async (resolve,reject)=>{
        await this.canvasDrawRecommend(context,true) //【将背景图片&&边框，放到画布】
        setTimeout(() => {
            const cardImage = Taro.canvasToTempFilePath({
                canvasId:canvas.id,
                fileType: 'png',
                quality: 1,
                success: async res=> {
                    const context = Taro.createCanvasContext('canvas3d', this)
                    await this.canvasDraw3d(context,res.tempFilePath)
                    context.draw();
                    setTimeout( () => {
                        console.log(canvas.id,666666)
                    Taro.canvasToTempFilePath({ //存储照片
                        canvasId: 'canvas3d',
                        fileType: 'png',
                        destWidth: 1024,
                        destHeight: 1024,
                        // 解决vivo手机模糊bug，强制图片质量为原图
                        quality: 1,
                        success: function (res) {
                        let tempFilePath = res.tempFilePath
                        console.log(tempFilePath,'3d3d3d')
                        resolve(tempFilePath)
                        },
                        fail: function (res) {
                          reject(res)
                        },
                        complete: function () {
                        }
                    });
                    }, 400)
                }
            })
        }, 500);
        context.draw()
    })





    // return new Promise(async (resolve, reject) => {
    //   const {currentScene, canvas} = this.state
    //   const context = Taro.createCanvasContext('canvas3d', this) //组件绘图的上下文
    //   await this.canvasDraw3d(context)
    //   if (currentScene.type === 'custom') {
    //     await this.canvasDrawCustom(context)
    //   } else if (currentScene.type === 'recommend') {
    //     await this.canvasDrawRecommend(context) //【将背景图片&&边框，放到画布】
    //   }
    //   //绘制图片
    //   context.draw() //【有点像将之前的设置保存到context中】
    //   //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
    //   setTimeout( () => {
    //       // console.log(canvas.id,666666)
    //     Taro.canvasToTempFilePath({ //存储照片
    //       canvasId: canvas.id,
    //       fileType: 'jpg',
    //       // 解决vivo手机模糊bug，强制图片质量为原图
    //       quality: 1,
    //       success: function (res) {
    //         let tempFilePath = res.tempFilePath
    //         resolve(tempFilePath)
    //       },
    //       fail: function (res) {
    //         reject(res)
    //       },
    //       complete: function () {
    //       }
    //     });
    //   }, 400)
    // })
  }

  canvasDrawRecommend = async (context, hasLogo=false) => {
    const {currentScene, frame, canvas} = this.state

    // console.log(frame, 'frame ===width===height===frame')

    const postfix = '?x-oss-process=image/resize,w_748,h_560'
    const {ratio = 3} = canvas
    const sceneInfo = currentScene
    let sceneConfig = {}
    try {
      sceneConfig = tool.JSON_parse(sceneInfo.sceneConfig)
    } catch (err) {
      // console.log('canvasDrawRecommend 解析sceneConfig JSON字符串失败', err)
    }
    // 下载远程背景图片
    let localBgImagePath = ''
    try {
      const bgUrl = currentScene.bgUrl + postfix
      localBgImagePath = await this.downloadRemoteImage(bgUrl)
    } catch (err) {
      // console.log('下载背景图片失败', err)
      return
    }
    console.log(localBgImagePath,666666)
    //防止锯齿，绘的图片是所需图片的3倍
    // let dx= customBg.x * ratio;
    // let dy= customBg.y * ratio;
    // if(dx<20||dy<20){
    //   dx=20;
    //   dy=20
    // }
    //
    //??? canvas尺寸
    context.drawImage(localBgImagePath, this.state.margin*ratio, this.state.margin*ratio, (frame.width) * ratio, (frame.height) * ratio)
    // 绘制元素
    await this.canvasDrawElement(context, ratio, hasLogo)
    // 绘制二维码
    // if (sceneConfig.watermark) {
    //   this.canvasDrawLogo(context, ratio)
    // }
  }

  canvasDraw3d = async (context,imageUrl) => {
    const {currentScene, frame, canvas} = this.state

    // console.log(frame, 'frame ===width===height===frame')

    const postfix = '?x-oss-process=image/resize,w_1024,h_1024'
    const sceneInfo = currentScene
    let sceneConfig = {}
    try {
      sceneConfig = tool.JSON_parse(sceneInfo.sceneConfig)
    } catch (err) {
      // console.log('canvasDrawRecommend 解析sceneConfig JSON字符串失败', err)
    }
    // 下载远程背景图片
    let localBgImagePath = ''
    try {
      const bgUrl = this.bgImg3dUrl + postfix
      localBgImagePath = await this.downloadRemoteImage(bgUrl)
    } catch (err) {
      // console.log('下载背景图片失败', err)
      return
    }
    //防止锯齿，绘的图片是所需图片的3倍
    context.drawImage(localBgImagePath, 0, 0, 1024, 1024)
    // 绘制元素
    context.drawImage(imageUrl,8,48,733,475)
    // 绘制二维码
    // if (sceneConfig.watermark) {
    //   this.canvasDrawLogo(context, ratio)
    // }
  }

  canvasDrawCustom = async (context) => {
    const {customBg, canvas} = this.state
    const {ratio = 3} = canvas
    // 自定义背景为本地图片，不需要下载
    const localBgImagePath = customBg.localUrl
    //防止锯齿，绘的图片是所需图片的3倍

    context.drawImage(localBgImagePath,customBg.x * ratio, customBg.y * ratio, customBg.width * ratio, customBg.height * ratio) //customBg.x * ratio+, customBg.y * ratio+

    // 绘制元素
    await this.canvasDrawElement(context, ratio)
    // 绘制二维码
    this.canvasDrawLogo(context, ratio)
  }
  // 绘制贴纸，文字，覆盖层所有元素
  canvasDrawElement = async (context, ratio, hasLogo = false) => {
    const {currentScene, foreground, frame, canvas, coverList = []} = this.state
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
      isMirror: foreground.isMirror
    }
    // 收集人物
    elements.push(element_foreground)
    console.log(elements,'eeeeee')

    // 收集贴纸
    coverList.filter(v => (hasLogo ? true : !v.deleted)).forEach(v => {
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

    //添加白版背景
    // const whiteCover:{
    //   type: 'cover',
    //   zIndex: v.zIndex,
    //   id: 000000,
    //   remoteUrl: ,
    //   width:  * ratio,
    //   height:,
    //   x: v.x * ratio,
    //   y: v.y * ratio,
    //   rotate: v.rotate,
    // }
    // elements.push(whiteCover)


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
        // console.log('下载贴纸图片失败', err)
        continue
      }
    }

    // // console.log('elements', elements)
    function drawElement({localUrl, width, height, x, y, rotate,isMirror}) {
      context.save()
      context.translate(x + 0.5 * width, y + 0.5 * height)
      context.rotate(rotate * Math.PI / 180)
      isMirror && context.scale(-1,1);
      context.drawImage(localUrl, -0.5 * width, -0.5 * height, width, height)
      context.restore()
      context.stroke()
    }
  }
  // 绘制二维码和logo
  canvasDrawLogo = (context, ratio) => {
    const {frame} = this.state
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

  // 下载照片并存储到本地
  downloadRemoteImage = async (remoteUrl = '') => {
    // 判断是否在缓存里
    const cacheKey = `${remoteUrl}_localPath`
    const cache_source = this.cache['source']

    let localImagePath = ''
    if (cache_source.get(cacheKey)) {
      // // console.log('get-cache', cacheKey, cache_source.get(cacheKey))
      return cache_source.get(cacheKey)
    } else {
      try {
        const result = await service.base.downloadFile(remoteUrl)
        localImagePath = result.tempFilePath
      } catch (err) {
        // console.log('下载图片失败', err)
      }
    }
    return this.cache['source'].set(cacheKey, localImagePath)
  }

  // 设置人物状态
  setForegroundActiveStatus = (value = false) => {
    this.setStateTarget('foreground', {isActive: value})
  }
  // 设置贴纸状态
  setCoverListActiveStatus = (options = {}, value = false) => {
    const {type, ids = []} = options
    const {coverList} = this.state
    if (type === 'all') {
      coverList.forEach(v => {
        v['isActive'] = value
      })
    } else {
      coverList.forEach(v => {
        if (ids.indexOf(v.id) > -1) {
          v['isActive'] = value
        } else {
          v['isActive'] = !value
        }
      })
    }
    this.setState({
      coverList
    })
  }

  // 自定义背景自适应
  customBgAuto = (callback?: () => void) => {
    // 获取图片原始大小
    const {customBg, frame} = this.state
    const {originWidth = 0, originHeight = 0} = customBg || {}
    const imageRatio = originWidth / originHeight
    // 计算宽高比例
    const result = {
      autoScale: 1,
      autoWidth: 0,
      autoHeight: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
    }
    if ((originWidth / originHeight) > (frame.width / frame.height)) {
      // 图片宽高比大于框
      // 将图片高度放大为与框相同，宽度超出框
      result.autoScale = frame.width / originWidth
      result.autoHeight = frame.height
      result.autoWidth = result.autoHeight * imageRatio
    } else {
      result.autoScale = frame.height / originHeight
      result.autoWidth = frame.width
      result.autoHeight = result.autoWidth / imageRatio
    }
    // 位移使图片居中
    result.width = result.autoWidth
    result.height = result.autoHeight
    result.x -= (result.width - frame.width) * 0.5
    result.y -= (result.height - frame.height) * 0.5
    this.setState({
      customBg: {
        ...this.state.customBg,
        ...result
      }
    }, () => {
      typeof callback === 'function' && callback()
    })
  }
  // 人物自适应
  foregroundAuto = (callback?: () => void) => {
    // 先判断是否有缓存
    const {currentScene} = this.state
    // const sceneId = currentScene.sceneId || 'demo_scene'
    // const cache_foreground = this.cache['foreground']
    // const scene_foreground_params = cache_foreground.get(sceneId)

    // if ( scene_foreground_params ) {
    //   this.setStateTarget('foreground', {
    //     ...scene_foreground_params
    //   }, () => {
    //     typeof callback === 'function' && callback()
    //   })
    //   return
    // }


    const size = this.calcForegroundSize()
    const position = this.calcForegroundPosition(size)
    // console.log(position, '-------see this is position-----')
    this.setStateTarget('foreground', {
      ...size,
      ...position
    }, () => {
      typeof callback === 'function' && callback()
    })
  }

  // 计算人物尺寸   //映射到背景的尺寸【add by YuJIN Zeng
  calcForegroundSize = () => {
    const {currentScene, sceneList, foreground, frame} = this.state
    const {originWidth, originHeight} = foreground
    // const sceneInfo = work.getSceneInfoById(currentScene.sceneId, this.themeData.sceneList, 'sceneId')

    const imageRatio = originWidth / originHeight
    const params = tool.JSON_parse(currentScene.sceneConfig)
    const autoScale = parseFloat(params.size.default)

    const result = {
      autoScale,
      autoWidth: 0,
      autoHeight: 0,
      width: 0,
      height: 0
    }
    if (originWidth > originHeight) {
      // 以最短边计算
      result.autoWidth = frame.width * autoScale
      result.autoHeight = result.autoWidth / imageRatio
    } else {
      result.autoHeight = frame.height * autoScale
      result.autoWidth = result.autoHeight * imageRatio
    }
    result.width = result.autoWidth
    result.height = result.autoHeight

    return result
  }
  // 计算人物位置
  calcForegroundPosition = ({width, height} = {}) => {
    const {currentScene, sceneList, foreground, frame} = this.state
    const {originWidth, originHeight} = foreground
    width = width || foreground.width
    height = height || foreground.height
    // const sceneInfo = work.getSceneInfoById(currentScene.sceneId, this.themeData.sceneList, 'sceneId')

    const boxWidth = frame.width
    const boxHeight = frame.height
    const sceneConfig = tool.JSON_parse(currentScene.sceneConfig)
    const {position} = sceneConfig
    const type = position.place || '0'
    const result = {
      x: 0,
      y: 0,
      rotate: 0
    }
    switch (type) {
      case '0':
        result.x = (boxWidth - width) * 0.5
        result.y = (boxHeight - height) * 0.5
        break
      case '1':
        result.x = 0
        result.y = 0
        break
      case '2':
        result.x = (boxWidth - width) * 0.5
        result.y = 0
        break
      case '3':
        result.x = boxWidth - width
        result.y = 0
        break
      case '4':
        result.x = boxWidth - width
        result.y = (boxHeight - height) * 0.5
        break
      case '5':
        result.x = boxWidth - width
        result.y = boxHeight - height
        break
      case '6':
        result.x = (boxWidth - width) * 0.5
        result.y = boxHeight - height
        break
      case '7':
        result.x = 0
        result.y = boxHeight - height
        break
      case '8':
        result.x = 0
        result.y = (boxHeight - height) * 0.5
        break
      case '9':
        const result_location = location(position, boxWidth, boxHeight, width, height)
        result.x = result_location.x
        result.y = result_location.y
        break
      case '10':
        const result_center = centerLocation(position, boxWidth, boxHeight, width, height)
        result.x = result_center.x
        result.y = result_center.y
        break
      case '11':
        const result_faceCenter = faceCenterLocation(position, boxWidth, boxHeight, width, height)
        result.x = result_faceCenter.x
        result.y = result_faceCenter.y
        break
      default:
        result.x = (boxWidth - width) * 0.5
        result.y = (boxHeight - height) * 0.5
    }
    result.rotate = parseInt(sceneConfig.rotate)
    return result

    function location(position, boxWidth, boxHeight, width, height) {
      const result = {
        x: 0,
        y: 0
      }
      if (position.xAxis.derection === 'left') {
        result.x = position.xAxis.offset * boxWidth
      }
      if (position.xAxis.derection === 'right') {
        result.x = boxWidth * (1 - position.xAxis.offset) - width
      }
      if (position.yAxis.derection === 'top') {
        result.y = position.yAxis.offset * boxHeight
      }
      if (position.yAxis.derection === 'bottom') {
        result.y = boxHeight * (1 - position.yAxis.offset) - height
      }
      return result
    }

    // 中心点设置位置
    function centerLocation(position, boxWidth, boxHeight, width, height) {
      const result = {
        x: 0,
        y: 0
      }
      if (position.xAxis.derection === 'left') {
        result.x = position.xAxis.offset * boxWidth - width * 0.5
      }
      if (position.xAxis.derection === 'right') {
        result.x = boxWidth * (1 - position.xAxis.offset) - width * 0.5
      }
      if (position.yAxis.derection === 'top') {
        result.y = position.yAxis.offset * boxHeight - height * 0.5
      }
      if (position.yAxis.derection === 'bottom') {
        result.y = boxHeight * (1 - position.yAxis.offset) - height * 0.5
      }
      return result
    }

    // 脸部中心点设置位置
    function faceCenterLocation(position, boxWidth, boxHeight, width, height) {
      const result = {
        x: 0,
        y: 0
      }
      const faceCenterPosition = (globalData.separateResult &&
        globalData.separateResult.faceCenterDict && globalData.separateResult.faceCenterDict['16-1']) || [0, 0]
      const imageSize = (globalData.separateResult &&
        globalData.separateResult.imageSizeDict && globalData.separateResult.imageSizeDict['16-1']) || [1, 1]
      const faceLeft = (faceCenterPosition[0] / imageSize[0]) || 0.5 // 脸部中心点距离左边比例
      const faceTop = (faceCenterPosition[1] / imageSize[1]) || 0.5 // 脸部中心点距离顶边比例
      if (position.xAxis.derection === 'left') {
        result.x = position.xAxis.offset * boxWidth - width * faceLeft
      }
      if (position.xAxis.derection === 'right') {
        result.x = boxWidth * (1 - position.xAxis.offset) - width * faceLeft
      }
      if (position.yAxis.derection === 'top') {
        result.y = position.yAxis.offset * boxHeight - height * faceTop
      }
      if (position.yAxis.derection === 'bottom') {
        result.y = boxHeight * (1 - position.yAxis.offset) - height * faceTop
      }
      return result
    }
  }
  // 缓存人物尺寸位置
  storeForegroundInfo = () => {
    const {foreground, currentScene} = this.state
    const clone_foreground = tool.deepClone(foreground)
    clone_foreground.isActive = false
    const sceneId = currentScene.sceneId || 'demo_scene'
    this.cache['foreground'].set(sceneId, clone_foreground)
    // // console.log('this.cache.foreground', this.cache['foreground'].get(sceneId))
  }

  // 贴纸自适应
  coverAuto = (originInfo, cover, callback?: () => void) => {
    const size = this.calcCoverSize(originInfo, cover)
    const position = this.calcCoverPosition(size, cover)
    const {coverList = [], currentScene} = this.state
    coverList.forEach((v, i) => {
      if (v.id === cover.id) {
        // 判断是否有缓存
        const cacheKey = `${currentScene.sceneId}_${v.id}`
        const cacheRes = this.cache['cover'].get(cacheKey)
        if (cacheRes) {
          coverList[i] = cacheRes
        } else {
          coverList[i] = {...v, ...size, ...position}
        }
      }
    })

    this.setState({
      coverList: coverList
    }, () => {
      typeof callback === 'function' && callback()
    })
  }
  calcCoverSize = (originInfo, cover) => {
    const {originWidth, originHeight} = originInfo
    const {frame} = this.state
    const coverInfo = work.getCoverInfoById(cover.id, this.themeData.rawCoverList, 'id')
    const imageRatio = originWidth / originHeight
    let autoScale
    if (coverInfo && coverInfo.size) {
      autoScale = parseFloat(coverInfo.size.default || 0.5)
    } else {
      autoScale = 0.5
    }
    const result = {
      autoScale,
      autoWidth: 0,
      autoHeight: 0,
      width: 0,
      height: 0,
      type: coverInfo.type,
      visible: coverInfo.visible,
      show: coverInfo.show,
      deleted: coverInfo.deleted
    }
    if (originWidth > originHeight) {
      // 以最短边计算
      result.autoWidth = frame.width * autoScale
      result.autoHeight = result.autoWidth / imageRatio
    } else {
      result.autoHeight = frame.height * autoScale
      result.autoWidth = result.autoHeight * imageRatio
    }
    result.width = result.autoWidth
    result.height = result.autoHeight

    return result
  }

  //上传图片的操作
  todo = (data) => {
    // console.log(data, 'datadatadataOftodo')//授权获得用户信息
    const {detail: {userInfo}} = data
    if (userInfo) {
      service.base.loginAuth(data.detail)//【上传用户信息】
      globalData.userInfo = userInfo

      if(this.state.showType===2){
        // this.tempForground.fixed=false;
        this.setState({foreground:{...this.tempForground}, coverList:[]})
      }
      let newState = {
        showType: 1,
        show3d: false
      }
      if(this.state.show3d){
        newState.coverList = []
      }
    this.setState(newState, ()=>{
        work.chooseImageSimple({
            onSuccess: async (path) => {//获得加载图片的路径,这里的success就是用来把加载进来的图片进行处理
              // console.log('choosedImage', path, globalData)
              this.app.aldstat.sendEvent('编辑页面人像成功', '上传成功')
              globalData.choosedImage = path//存入图片，为之后的处理准备
              Taro.getFileSystemManager().readFile({
                filePath: path,
                success: async (data:any) => { //这的data是文件内容，所以这个函数的意义是啥？？？
                    const separateResult = globalData.separateResult = await this.initSegment()
                              await this.initSeparateData(separateResult)
                              
                    // Taro.cloud.callFunction(
                    //     {
                    //         name: 'checkImage',
                    //         data: {
                    //           contentType: 'image/png',
                    //           value: data.data
                    //         },
                    //         success: async (res:any) => {//res 为处理信息，跟图片无关；
                    //           // console.log('checkImage success：', res)
                    //           // const separateResult = globalData.separateResult = await this.initSegment()
                    //           // await this.initSeparateData(separateResult)
                    //           if (res.result !== null && res.result.errCode === 0) {
                    //             const separateResult = globalData.separateResult = await this.initSegment()//一个对象、得到分割结果，还不是图像，只是部分路径
                    //             // console.log(separateResult, 'separeteResulting~~~~~~~~~~~~~~~~')
                    //             await this.initSeparateData(separateResult)
                    //           } else {
                    //             work.pageToError()
                    //           }
                    //         },
                    //         fail: async (err) => {
                    //           // console.log('checkImage error', err)
                    //           const separateResult = globalData.separateResult = await this.initSegment()
                    //           await this.initSeparateData(separateResult)
                    //         }
                    //       }
                    // )
                },
                fail: () => {
                }
              })
            }
          })
    })


    } else {
      Taro.showToast({
        title: '请授权',
        icon: 'success',
        duration: 2000
      })
    }

  }

  calcCoverPosition = (size = {}, cover = {}) => {
    const {width = 0, height = 0} = size
    const {frame} = this.state
    const coverInfo = work.getCoverInfoById(cover.id, this.themeData.rawCoverList, 'id')
    const {position, rotate = 0} = coverInfo
    const boxWidth = frame.width
    const boxHeight = frame.height

    const type = position.place || '0'
    const result = {
      x: 0,
      y: 0,
      rotate: 0
    }
    switch (type) {
      case '0':
        result.x = (boxWidth - width) * 0.5
        result.y = (boxHeight - height) * 0.5
        break
      case '1':
        result.x = 0
        result.y = 0
        break
      case '2':
        result.x = (boxWidth - width) * 0.5
        result.y = 0
        break
      case '3':
        result.x = boxWidth - width
        result.y = 0
        break
      case '4':
        result.x = boxWidth - width
        result.y = (boxHeight - height) * 0.5
        break
      case '5':
        result.x = boxWidth - width
        result.y = boxHeight - height
        break
      case '6':
        result.x = (boxWidth - width) * 0.5
        result.y = boxHeight - height
        break
      case '7':
        result.x = 0
        result.y = boxHeight - height
        break
      case '8':
        result.x = 0
        result.y = (boxHeight - height) * 0.5
        break
      case '9':
        const result_location = location(position, boxWidth, boxHeight, width, height)
        result.x = result_location.x
        result.y = result_location.y
        break
      case '10':
        const result_center = centerLocation(position, boxWidth, boxHeight, width, height)
        result.x = result_center.x
        result.y = result_center.y
        break
      default:
        result.x = (boxWidth - width) * 0.5
        result.y = (boxHeight - height) * 0.5
    }
    result.rotate = parseInt(rotate)
    return result

    function location(position, boxWidth, boxHeight, width, height) {
      const result = {
        x: 0,
        y: 0
      }
      if (position.xAxis.derection === 'left') {
        result.x = position.xAxis.offset * boxWidth
      }
      if (position.xAxis.derection === 'right') {
        result.x = boxWidth * (1 - position.xAxis.offset) - width
      }
      if (position.yAxis.derection === 'top') {
        result.y = position.yAxis.offset * boxHeight
      }
      if (position.yAxis.derection === 'bottom') {
        result.y = boxHeight * (1 - position.yAxis.offset) - height
      }
      return result
    }

    // 中心点设置位置
    function centerLocation(position, boxWidth, boxHeight, width, height) {
      const result = {
        x: 0,
        y: 0
      }
      if (position.xAxis.derection === 'left') {
        result.x = position.xAxis.offset * boxWidth - width * 0.5
      }
      if (position.xAxis.derection === 'right') {
        result.x = boxWidth * (1 - position.xAxis.offset) - width * 0.5
      }
      if (position.yAxis.derection === 'top') {
        result.y = position.yAxis.offset * boxHeight - height * 0.5
      }
      if (position.yAxis.derection === 'bottom') {
        result.y = boxHeight * (1 - position.yAxis.offset) - height * 0.5
      }
      return result
    }
  }
  // 缓存贴纸信息
  storeCoverInfo = (sticker) => {
    const {currentScene} = this.state
    const clone_cover = tool.deepClone(sticker)
    // 贴纸存储不激活状态
    clone_cover.isActive = false
    const sceneId = currentScene.sceneId || 'demo_scene'
    const cacheKey = `${sceneId}_${sticker.id}`
    this.cache['cover'].set(cacheKey, clone_cover)
  }
  handleGetUserInfo = (data) => {
    // // console.log('handleGetUserInfo', data)
    const {detail: {userInfo}} = data
    if (userInfo) {
      service.base.loginAuth(data.detail)
      globalData.userInfo = userInfo
      // this.todo()
    } else {
      Taro.showToast({
        title: '请授权',
        icon: 'success',
        duration: 2000
      })
    }
  }

  handelVideoAd() {
    //.catch((err)=>{// console.log(err)})
    this.setState({
      isshow: false
    })
    this.videoAd = wx.createRewardedVideoAd({adUnitId: 'adunit-7815bc095ad4a222'})
    this.videoAd.onLoad(() => {
      // console.log('广告拉取成功')
    })
    this.videoAd.onError((err) => {
      // console.log(err)
    })
    this.videoAd.onClose((res) => {
      if (res.isEnded) {
        this.handleOpenResult()
      }
    })

    if (this.videoAd) {
      this.videoAd.load().then(() => {
        this.videoAd.show()
      })
    }
  }

  hideLogo(){
      this.setState({
          showBankLogo: !this.state.showBankLogo,
          showMyLogo: !this.state.showMyLogo
      })
  }

  saveImg() {
    this.setState({
      isshow: true,
      content: '观看完整的视频广告后，才可以保存这张图片哦~',
    })
  }

  handelCancel() {
    this.setState({
      isshow: false
    })

  }

  changeNav() {
    this.app.aldstat.sendEvent('保存后返回首页', '回到首页')
    Taro.navigateTo({url: '/pages/home/index'})
  }

  substituteBgUrl(item){
    if(item.sceneId === this.state.currentScene.sceneId || this.state.lockScene) return false;
    globalData.sceneConfig = item;
    let lockScene = this.state.show3d ? false : true;
    this.setState({
      currentScene: item,
      staticBgUrl:item.bgUrl,
      imageURL: item.card1,
      lockScene,
      coverList: []
    })
    this.initSceneData(()=>{
        if(this.state.show3d && this.state.showType === 1){
            this.previewBack = true
            this.showLoading();
            this.setState({
                show3d: false,
                load3d: true
            },()=>{
                this.showLoading();
                setTimeout(async () => {
                    this.showLoading();
                    this.tempForground = this.state.foreground;
                    let imageURL = await this.createCanvas3d();
                    let show3d = true
                    this.setState({
                        show3d,
                        imageURL,
                        load3d: false
                    });
                    this.hideLoading();
                    }, 2000);
                })
        }
    });

  }
  jumpToUndertake(){
      Taro.navigateTo({
          url: '/pages/undertakeBank/index'
      });
  }

  render() {
      // console.log(this.state.coverList,333333)
    const {loading, rawImage, frame, customBg, foreground, coverList, sceneList, currentScene, result, canvas, showType, screenWidth, showBankLogo, show3d, load3d} = this.state

    let cover = coverList.filter(item => {
        return item.type === 'normal'
    }).map(item => {
        if(item.show){
            return <Sticker
                key={item.id}
                url={item.remoteUrl}
                stylePrams={item}
                framePrams={frame}
                onChangeStyle={this.handleChangeCoverStyle}
                onImageLoaded={this.onCoverLoaded}
                onTouchstart={this.handleCoverTouchstart}
                onTouchend={this.handleCoverTouchend}
                onDeleteSticker={this.handleDeleteCover.bind(this, item)}
            />
        }
      })
    let bankLogo = coverList.filter(item => {
        return item.type === 'bankLogo' || item.type === 'myLogo'
    }).map(item => {
        if(this.state.showBankLogo){
            return <Sticker
                key={item.id}
                url={item.remoteUrl}
                stylePrams={item}
                framePrams={frame}
                onChangeStyle={this.handleChangeCoverStyle}
                onImageLoaded={this.onCoverLoaded}
                onTouchstart={this.handleCoverTouchstart}
                onTouchend={this.handleCoverTouchend}
                onDeleteSticker={this.handleDeleteCover.bind(this, item)}
            />
        }
      })
    return (
      <ScrollView scrollY className="scrollPage" style={{ height: this.state.screenHeight + 'px' }}>
        <View className='page-editor'>
            <Title
                color="#333"
                leftStyleObj={{left: Taro.pxTransform(8)}}
                showBack={showType !== 0 ? 1 : 0}
                backHandler={()=>this.backHandler()}
              >中行跨次元卡</Title>
          <View className="main">

            <View className="addTitle"></View>

            <View className="pic-section" style={{opacity: load3d ? 0 : 1}}>
                {!show3d &&
                  <Image className='card_shadow' src='https://static01.versa-ai.com/upload/abc2f38a4d4d/cab30fe0-349f-4498-95f8-f594f089e43c.png'/>
                }
              {!show3d &&
              <View style={{width: this.state.drawBoard.width, height: this.state.drawBoard.height}} className={`crop`}
                    id="crop">
                {currentScene.type === 'recommend' &&
                <View className="background-image">
                  <Image
                    src={this.state.staticBgUrl}
                    style="width:100%;height:100%"
                    mode="scaleToFill"
                    onLoad={this.handleBgLoaded}
                    onClick={this.handleBackgroundClick}
                  />
                </View>
                }
                <Sticker
                  ref="foreground"
                  url={foreground.remoteUrl}
                  stylePrams={foreground}
                  framePrams={frame}
                  onChangeStyle={this.handleChangeStyle}
                  onImageLoaded={this.onForegroundLoaded}
                  onTouchstart={this.handleForegroundTouchstart}
                  onTouchend={this.handleForegroundTouchend}
                />
                {cover}
                {bankLogo}

                <View className="logo">
                  <Image className="subLogo" src={this.state.logo.myLogo} />
                  {this.state.showBankLogo?
                    <View>
                      <Image className="subLogo" src={this.state.logo.bankLogo} />
                    </View>:''}
                </View>
              </View>
              }
            <View className={(show3d) ? 'bank_card_container' : 'bank_card_container hide'} style={{height: screenWidth * 0.7+'px'}}>
                  {/* <Image
                    src={this.state.staticBgUrl}
                    style="width:100%;height:100%"
                    mode="scaleToFill"
                    // onLoad={this.handleBgLoaded}
                  /> */}
                <BankCard gltfURL={this.state.gltfURL} imageURL={this.state.imageURL} screenWidth={screenWidth}></BankCard>
              </View>
            </View>

            <View className='subSection'>
              <View className={'show_buttons' + (show3d ? ' show3d' : '')}>
                {showType === 0 ? null : 
                <View className="addSub" onClick={this.preview}>
                  <Image className='eye_icon' src={show3d ?'https://static01.versa-ai.com/upload/914001ed696e/b6d792dd-8f22-4c7e-a771-a318717a3090.png':'https://static01.versa-ai.com/upload/d795c515acbe/58ad6490-e0c4-4f59-b898-b816df4c65d6.png'}/>
                <Text>{show3d?'切换到普通浏览':'切换到3D浏览'}</Text>
                </View>}
                {(showType!==0 && !show3d) &&
                  <View className="hideIcon" onClick={()=>this.hideLogo()}>
                      <Image className='eye_icon' src={showBankLogo ?'https://static01.versa-ai.com/upload/c34b3d6329a5/bde7562a-5fd4-4ed6-b4c3-e9e339810964.png':'https://static01.versa-ai.com/upload/619f7ec1bc56/9a122af8-3414-4eb6-bdab-0ff4b0dd43a5.png'}/>
                      <Text>{this.state.showBankLogo ? '隐藏卡面图标' : '显示卡面图标'}</Text>
                  </View>}
              </View>
              {showType === 2 && <View className='save_success_tip'>「 图片已自动保存到手机相册 」</View>}
              {showType ?
              (showType === 1 ? <View className="buttonPart">
                <Button style='flex:1;z-index:2' id='addPhoto' openType="getUserInfo" className="custom-button white border"
                        hoverClass="btn-hover" onGetUserInfo={this.todo}>{this.state.chooseText}</Button>
                <Button style='flex:1;margin-left:10px' className="custom-button pink" hoverClass="btn-hover" onClick={this.handleOpenResult}>
                    完成定制
                </Button>
              </View> :
                <View>
                  <View className="buttonPart">
                    <Button id='addPhotoFit1' openType="getUserInfo" className="custom-button pink" hoverClass="btn-hover" onGetUserInfo={this.jumpToUndertake}>
                      提交至银行
                    </Button>
                  </View>
                  <View className="buttonPart">
                    <Button openType="getUserInfo" className="custom-button white border play_agin" hoverClass="btn-hover" onGetUserInfo={this.pageToHome}>
                      再做一张
                    </Button>
                </View>
                </View>
                ):
                <View className="buttonPart">
                    <Button id='addPhotoFit2' openType="getUserInfo" className="custom-button pink"
                        hoverClass="btn-hover" onGetUserInfo={this.todo}>{this.state.chooseText}</Button>
                </View>
              }
            </View>
          </View>
          {/* <Image src={this.state.imageURL}/> */}
          {showType !== 2 &&
            <View className="subMain" style="width:100%;height:100%">
            <View className="addSub">&middot;&middot;其他可定制卡片&middot;&middot;</View>
            
            <View className="pictureList">
                {this.state.sceneList.map((item) => {
                    return (<View style={{background:`url(${item.boxUrl}) no-repeat center`,backgroundSize:'contain'}} className='singlePicture'>
                                <Image src={item.exampleUrl} onClick={this.substituteBgUrl.bind(this,item)}/>
                                {currentScene.index === item.index ? <View className='currentIcon'></View> : null}

                            </View>)
                })}
                </View>
            </View>
          }
          <Image className='bottomTip' src='https://static01.versa-ai.com/upload/ac05476db5da/e0f294b1-ae32-4e96-b4ed-637fed563de3.png'/>

          <View class="canvas-wrap">
            <Canvas
              disable-scroll={true}
              style={`width: ${(frame.width +this.state.margin*2)* canvas.ratio}px; height: ${(frame.height+this.state.margin*2) * canvas.ratio}px;`}
              canvasId={canvas.id}/>
          </View>
          <View class="canvas-wrap">
            <Canvas
              disable-scroll={true}
              style={`width: 1024px; height: 1024px;`}
              canvasId='canvas3d'/>
          </View>

          <Loading visible={loading}/>

          {/* <View className='newGuide' style={{display: this.state.hasGuide === false ? 'none' : 'block'}}>
            <Image src={addTips} alt="" className='tips' style={{top: this.state.guiderTop + 'px'}}/>
          </View> */}

          {/*<AuthModal/>*/}
        </View>
      </ScrollView>
    )
  }
}

export default Bank as ComponentClass<PageOwnProps, PageState>
