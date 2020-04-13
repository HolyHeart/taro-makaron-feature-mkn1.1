import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Image, Canvas } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { getSystemInfo } from '@/model/actions/global'
import tool from '@/utils/tool'
import work from '@/utils/work'
import Title from '@/components/Title'
import CustomIcon from '@/components/Icon'
import Voice from '@/components/Voice'
import Sticker from '@/components/Sticker'
import SceneList from '@/components/SceneList'
import ResultModal from '@/components/ResultModal'
import Loading from '@/components/Loading'
import MarginTopWrap from '@/components/MarginTopWrap'
import AuthModal from '@/components/AuthModal'
import globalData from '@/services/global_data'
import Session from '@/services/session'
import service from '@/services/service'
import { appConfig } from '@/services/config'
import { createCache } from '@/services/cache'
import './index.less'
import addTips from "@/assets/images/tips_addpic@2x.png";

// const mock_path = 'https://static01.versa-ai.com/upload/783272fc1375/999deac02e85f3ea.png'
// const mock_segment_url = 'https://static01.versa-ai.com/images/process/segment/2019/01/14/b4cf047a-17a5-11e9-817f-00163e001583.png'

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
    visible: boolean
  },
  music: {
    remoteUrl: string,
    play: boolean,
  },
  currentScene: {
    bgUrl: string
  },
  videoRatio: number
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Dynamic {
  props: IProps;
}

@connect(({ global }) => ({
  global
}), (dispatch) => ({
  getSystemInfo (data) {
    dispatch(getSystemInfo(data))
  }
}))
class Dynamic extends Component {
  config: Config = {
    navigationBarTitleText: '懒人抠图',
    disableScroll: true,
    enablePullDownRefresh:false
  }

  state = {
    rawImage: {
      localUrl: '',
      remoteUrl: ''
    },
    guiderTop: '',
    hasGuide: false,
    frame: {
      width: 0,
      height: 0,
      left: 0,
      top: 0,
    },
    chooseText:'添加人像照片',
    foreground: {
      id: 'foreground',
      remoteUrl: '',
      zIndex:2,
      width:0,
      height:0,
      x: 0,
      y:0,
      rotate: 0,
      originWidth: 0, // 原始宽度
      originHeight: 0, // 原始高度
      autoWidth: 0, // 自适应后的宽度
      autoHeight: 0, // 自适应后的高度
      autoScale: 0, // 相对画框缩放比例
      fixed: false, // 是否固定
      isActive: true, // 是否激活
      visible: true, // 是否显示
      loaded: false, // 是否加载完毕
    },
    coverList: [
      // {
      // id: 'cover-01',
      // remoteUrl: 'https://static01.versa-ai.com/images/process/segment/2019/01/07/a102310e-122a-11e9-b5ef-00163e023476.png',
      // originHeight: 2440,
      // originWidth: 750,
      // autoHeight: 244,
      // autoScale: 0.1,
      // autoWidth: 75,
      // width: 57.378244033967235,
      // height:186.6705539238401,
      // x: 185.1442062300867,
      // y: 155.66472303807996,
      // rotate: -25.912119928692746,
      // zIndex: 3,
      // fixed: false, // 是否固定
      // isActive: false, // 是否激活
      // visible: true, // 是否显示
      // deleted: false, // 是否删除
      // }
    ],
    music: {
      remoteUrl: '',
      play: true
    },
    sceneList: [],
    currentScene: {
      bgUrl: '', // ...
      shareContent: '',
      sceneId: '',
    },
    loading: false,
    result: {
      show: false,
      shareImage: {
        remoteUrl: '',
      },
      shareVideo: {
        remoteUrl: '',
        width: 0,
        height: 0
      },
      shareGif: {
        remoteUrl: '',
      }
    },
    videoRatio: 2,
    ableToShareToQZone: false
  }

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

  innerAudioContext = Taro.createInnerAudioContext()

  isSaving = false // 是否正在保存

  componentWillMount () {
    this.initSystemInfo()
  }
  componentDidMount () {
    this._initPage()
    this.canIShareToQQZone()
  }
  componentWillReceiveProps (nextProps) {
    // console.log(this.props, nextProps)
  }
  componentWillUnmount () {
    this.setAudio('pause')
  }
  componentDidShow () {
    if (this.state.music.play) {
      this.setAudio('play')
    }
  }
  componentDidHide () { }
  onShareAppMessage (res) {
    // if (res.from === 'button') {
    //   console.log('页面按钮分享', res.target)
    // }
    this.app.aldstat.sendEvent('生成页分享', {'场景名': this.state.currentScene.sceneName, '场景Id': this.state.currentScene.sceneId})
    const {currentScene, result = {}} = this.state
    const {shareVideo = {}, shareImage = {}} = result
    const shareContent = currentScene.shareContent || ""
    const shareImageUrl = `${shareImage.remoteUrl}?x-oss-process=image/resize,m_pad,h_420,w_525`
    const data = {
      shareSource: shareVideo.remoteUrl,
      themeId: globalData.themeId || '',
      sceneId: currentScene.sceneId || '',
      width: shareVideo.width,
      height: shareVideo.height
    }
    const path = tool.formatQueryUrl('/pages/index', data)
    const {userInfo = {}} = globalData
    // const title = `@${userInfo.nickName}：${shareContent}`
    if (!shareImage.remoteUrl) {
      return {
        // title: title,
        path: '/pages/home/index',
        imageUrl: currentScene.thumbnailUrl,
      }
    }
    // console.log(title, path, shareImageUrl)
    // Taro.navigateTo({ url: `/pages/index?shareSource=${shareImageUrl}` })
    return {
      // title: title,
      path: path,
      imageUrl: shareImageUrl,
      success: () => {
        console.log('分享成功')
      },
    }
  }

  // 发布到QQ空间
  publishToQzone = () => {
    const {currentScene} = this.state
    const shareContent = currentScene.shareContent || (globalData.themeData && globalData.themeData.shareContent)
    qq.openQzonePublish({
      text: shareContent,
      media: [
        {
          type: 'video',
          path: globalData.videoQQZonePublishLocalUrl
        }
      ]
    })
  }

  canIShareToQQZone = () => {
    if (wx.canIUse('openQzonePublish')) {
      console.log('🔥🔥🔥可以分享到空间')
      this.setState({
        ableToShareToQZone: true
      })
    } else {
      console.log('微信版本小程序不支持分享到QQ空间')
    }
  } 

  _initPage = async () => {
    await Session.set()
    this.initSceneData(() => {
      // this.initCoverData()
      this.calFrameRect()
      const firstViewEditor = Taro.getStorageSync('firstViewEditor')
      if(!firstViewEditor){
        const query = wx.createSelectorQuery()
        query.select('#addPhoto').boundingClientRect()
        query.selectViewport().scrollOffset()
        query.exec((res)=> {
          this.setState({
            hasGuide:true,
            guiderTop: res[0].top-77-15
          })
        })
        Taro.setStorageSync('firstViewEditor',true)
      }
    })
  }

  test = async () => {
  }
  // 公共方法
  pageToHome = () => {
    // Taro.redirectTo({
    //   url: '/pages/home/index'
    // })
    Taro.navigateBack({ delta: 1 })
  }
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
  setStateTarget = (key, value = {}, callback?:() => void) => {
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
      },()=>{
        this.initCoverData()
        if(Taro.getStorageSync('lastSeparateImage')){
          const {foreground} = this.state
          this.setState({
            foreground: {
              ...foreground,
              remoteUrl: Taro.getStorageSync('lastSeparateImage')
            }
          })
        }
      })
    })
  }
  createAudio (src) {
    this.innerAudioContext.src = src
    this.innerAudioContext.loop = true
    this.innerAudioContext.onPlay(() => {
      // console.log('开始播放')
    })
    this.innerAudioContext.onError(res => {
      console.log('innerAudioContext error', res.errMsg)
    })
  }
  setAudio = (type = 'play') => {
    this.setState({
      music: {
        ...this.state.music,
        play: type === 'play'
      }
    })
    if (type === 'play') {
      setTimeout(()=>{
        this.innerAudioContext.play()
      }, 50)
    } else {
      this.innerAudioContext.pause()
    }
  }
  // 根据场景决定头像 setSegmentTypeByScene
  setSegmentTypeByScene = async (currentScene, separateResult = {}, callback) => {
    const { imageHost } = appConfig
    if (!separateResult.cateImageDict) {
      return
    }
    // 判断分离的是全身还是头像
    let separateUrl = ''
    let separateMaskUrl = ''
    if (currentScene.segmentType === 1) {
      separateUrl = imageHost + separateResult.cateImageDict['16-1']
      separateMaskUrl = imageHost + separateResult.maskImageDict['16-1']
    } else {
      separateUrl = imageHost + separateResult.cateImageDict['16']
      separateMaskUrl = imageHost + separateResult.maskImageDict['16']
    }
    typeof callback === 'function' && callback({
      separateUrl,
      separateMaskUrl
    })
  }
  // 合成视频或gif
  createShareSource = async (saveType = 'mp4') => {
    // saveType 'mp4, all, gif'
    return new Promise(async (resolve, reject) => {
      const {currentScene, frame, music, foreground, coverList = [], videoRatio = 2} = this.state
      // 贴纸
      const stickerList = coverList.filter(v => !v.deleted).map(v => {
        return {
          url: v.remoteUrl,
          width: parseFloat(v.width) * videoRatio,
          height: parseFloat(v.height) * videoRatio,
          x: parseFloat(v.x) * videoRatio,
          y: parseFloat(v.y) * videoRatio,
          rotate: parseFloat(v.rotate),
          zIndex: parseFloat(v.zIndex),
        }
      })
      const postData = {
        saveType,
        background:{
          url: currentScene.bgUrl,
          width: frame.width * videoRatio,
          height: frame.height * videoRatio
        },
        foreground: {
          url: foreground.remoteUrl,
          width: parseFloat(foreground.width) * videoRatio,
          height: parseFloat(foreground.height) * videoRatio,
          x: parseFloat(foreground.x) * videoRatio,
          y: parseFloat(foreground.y) * videoRatio,
          rotate: parseFloat(foreground.rotate),
          zIndex: parseFloat(foreground.zIndex),
        },
        stickerList: stickerList,
        music: {
          url: music.remoteUrl
        }
      }
      console.log('postData', postData, JSON.stringify(postData))
      try {
        const data = await service.core.filterConvertVideo(JSON.stringify(postData))
        if (data.result.responseCode === '0000' && data.result.result) {
          resolve(data.result.result)
        } else {
          reject('生成视频或gif失败_' + saveType)
        }
      } catch (err) {
        reject(err)
      }
    })
  }
  // 生成gif
  createGif = async (loading = false, callback) => {
    // 生成gif
    loading && Taro.showLoading({title: '生成Gif中...', mask: true})
    try {
      const gif_result = await this.createShareSource('gif')
      const shareGifRemoteUrl = gif_result && gif_result.gif
      typeof callback === 'function' && callback(shareGifRemoteUrl)
      loading && Taro.hideLoading()
    } catch (err) {
      loading && Taro.hideLoading()
    }
  }

  // 初始化系统信息
  initSystemInfo = () => {
    const {getSystemInfo, global} = this.props
    if (!global.system.model) {
      const systemInfo = Taro.getSystemInfoSync()
      getSystemInfo(systemInfo)
    }
  }
  initRawImage = () => {
    const {rawImage} = this.state
    this.setState({
      rawImage: {
        ...rawImage,
        localUrl: globalData.choosedImage
      }
    })
  }
  // 分割图片
  initSegment = async () => {
    let separateRes
    try {
      separateRes = await service.core.separateLocalImg(globalData.choosedImage, {
        type: -1,
        loading: true,
        showLoading: () => {
          // console.log('showLoading')
          // Taro.showLoading({
          //   title: '照片变身中...',
          //   mask: true,
          // })
          this.showLoading()
        },
        hideLoading: () => {
          // console.log('hideLoading')
          // Taro.hideLoading()
          if (this.state.foreground.loaded) {
            this.hideLoading()
          }
        },
      })
      const {cateImageDict = {}} = separateRes.result || {}
      if (!cateImageDict['16'] && !cateImageDict['16-1']) {
        console.log('技术犯规了')
        work.pageToError()
        return
      }
    } catch(err) {
      console.log('catch', err)
      this.hideLoading()
      return {}
    }
    return (separateRes && separateRes.result) || {}
  }
  // 初始化分割图片
  initSeparateData = async (separateResult) => {
    const { currentScene, foreground } = this.state
    this.setSegmentTypeByScene(currentScene, separateResult, (res = {}) => {
      Taro.setStorageSync('lastSeparateImage',res.separateUrl)
      this.setState({
        foreground: {
          ...foreground,
          remoteUrl: res.separateUrl
        }
      })
    })
  }
  // 初始化场景信息
  initSceneData = async (callback) => {
    this.setState({
      currentScene: globalData.sceneConfig || {}
    }, () => {
      // console.log('state', this.state)
      typeof callback === 'function' && callback()
    })
  }
  // 初始化贴纸
  initCoverData = () => {
    const {currentScene} = this.state
    // const sceneInfo = work.getSceneInfoById(currentScene.sceneId, this.themeData.sceneList, 'sceneId')
    const sceneConfig = tool.JSON_parse(currentScene.sceneConfig)
    const {cover = {}} = sceneConfig
    this.themeData.rawCoverList = cover.list || []
    const coverList = work.formatRawCoverList(this.themeData.rawCoverList)
    this.setState({
      coverList: coverList
    })
    // console.log('initCoverData cover', cover, coverList)
  }
  // 初始化音乐
  initMusicData () {
    const { currentScene } = this.state
    // const sceneInfo = work.getSceneInfoById(currentScene.sceneId, this.themeData.sceneList, 'sceneId')
    const sceneConfig = tool.JSON_parse(currentScene.sceneConfig)
    const remoteUrl = sceneConfig.music && sceneConfig.music.fileUrl
    if (remoteUrl) {
      this.createAudio(remoteUrl)
      this.setState({
        music: {
          ...this.state.music,
          remoteUrl
        }
      }, ()=> {
        if (this.state.music.play) {
          this.setAudio('play')
        } else {
          this.setAudio('pause')
        }
      })
    }
  }

  // 背景
  handleBackgroundClick = () => {
    this.setForegroundActiveStatus(false, () => {
      this.storeForegroundInfo()
    })
    this.setCoverListActiveStatus({type: 'all'}, false)
  }
  // 人物
  onForegroundLoaded = (detail:object, item?:any) => {
    // console.log('handleForegroundLoaded', detail, item)
    this.hideLoading()
    const {width, height} = detail
    this.setStateTarget('foreground', {
      originWidth: width,
      originHeight: height,
      loaded: true
    }, () => {
      this.foregroundAuto()
      // 初始化音乐
      this.initMusicData()
    })
  }
  handleChangeStyle = (data) => {
    const {foreground} = this.state
    this.setState({
      foreground: {
        ...foreground,
        ...data
      }
    }, () => {
    })
  }
  handleForegroundTouchstart = (sticker) => {
    // console.log('handleForegroundTouchstart', sticker)
    this.setForegroundActiveStatus(true)
    this.setCoverListActiveStatus({type: 'all'}, false)
  }
  handleForegroundTouchend = () => {
    this.storeForegroundInfo()
  }
  // 贴纸
  onCoverLoaded = (detail:object, item?:any) => {
    // console.log('handleCoverLoaded', detail, item)
    const {width, height} = detail
    const originInfo = {
      originWidth: width,
      originHeight: height
    }
    this.coverAuto(originInfo, item)
  }
  handleChangeCoverStyle = (data) => {
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
    // console.log('handleCoverTouchstart', sticker)
    this.setCoverListActiveStatus({type: 'some', ids:[sticker.id]}, true)
    this.setForegroundActiveStatus(false)
  }
  handleCoverTouchend = (sticker) => {
    // console.log('handleCoverTouchend', sticker)
    this.storeCoverInfo(sticker)
    this.app.aldstat.sendEvent('贴纸使用', {'贴纸Id': sticker.id})
  }
  handleDeleteCover = (sticker) => {
    // console.log('handleDeleteCover', sticker)
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
  handleToggleMusic = (status) => {
    if (status === 'on') {
      this.setAudio('pause')
      this.app.aldstat.sendEvent('音乐开关', '音乐打开')
    } else if (status === 'off') {
      this.setAudio('play')
      this.app.aldstat.sendEvent('音乐开关', '音乐关闭')
    }
  }

  // 更换场景
  handleChooseScene = (scene) => {
    const {currentScene} = this.state
    if (currentScene.sceneId === scene.sceneId) {
      return
    }
    this.setState({
      currentScene: scene
    }, () => {
      // console.log('handleChooseScene', this.state.currentScene)
      this.foregroundAuto()
      this.initCoverData()
      // 初始化音乐
      this.initMusicData()
      this.app.aldstat.sendEvent('选择场景', {'场景名': this.state.currentScene.sceneName, '场景Id': this.state.currentScene.sceneId})
    })
  }
  // 保存
  handleOpenResult = async () => {
    if (!this.state.foreground.remoteUrl) {
      return
    }
    if (!this.state.currentScene.bgUrl) {
      return
    }
    if (this.isSaving) {
      return
    }
    this.app.aldstat.sendEvent('保存图片或视频', {'场景名': this.state.currentScene.sceneName, '场景Id': this.state.currentScene.sceneId})
    this.setAudio('pause')
    Taro.showLoading({
      title: '保存中...',
      mask: true,
    })
    this.isSaving = true
    let result
    try {
      result = await this.createShareSource('mp4')
      // Taro.hideLoading()
      // this.isSaving = false
    } catch (err) {
      // Taro.hideLoading()
      // this.isSaving = false
      Taro.showToast({
        title: '生成视频失败',
        icon: 'fail',
        duration: 3000
      })
      return
    }
    const shareVideoRemoteUrl = result.videoUrl
    const shareImageRemoteUrl = result.thumbnailUrl
    const {width = 690, height = 920} = result.videoSize || {}
    const shareVideoInfo = work.calcVideoSize(690, 920, width, height)
    this.setState({
      result: {
        show: true,
        shareImage: {
          remoteUrl: shareImageRemoteUrl,
        },
        shareVideo: {
          remoteUrl: shareVideoRemoteUrl,
          width: shareVideoInfo.width,
          height: shareVideoInfo.height
        }
      }
    })
    // 生成gif
    this.handleSaveGif(false)
    // 保存图片到相册
    work.saveSourceToPhotosAlbum({
      location: 'remote',
      sourceUrl: shareVideoRemoteUrl,
      sourceType: 'video',
      onSuccess: () => {
        Taro.hideLoading()
        this.isSaving = false
        Taro.showToast({
          title: '保存成功!',
          icon: 'success',
          duration: 2000
        })
      },
      onAuthFail: () => {
        Taro.authModal({
          open: true
        })
        this.setResultModalStatus(false)
      },
      onFail: () => {
        Taro.hideLoading()
        this.isSaving = false
        Taro.showToast({
          title: '保存失败!',
          icon: 'success',
          duration: 2000
        })
      }
    })
  }
  // 再玩一次
  handleResultClick = () => {
    this.setResultModalStatus(false)
  }
  // 保存gif
  handleSaveGif = (loading, callback?) => {
    this.createGif(loading, (remoteUrl) => {
      const { result } = this.state
      this.setState({
        result: {
          ...result,
          shareGif: {
            remoteUrl: remoteUrl
          }
        }
      }, () => {
        typeof callback === 'function' && callback(remoteUrl)
      })
    })
  }
  // 显示gif
  handleShowGif =  () => {
    this.app.aldstat.sendEvent('视频生成页打开Gif', '打开Gif')
    const { result } = this.state
    const remoteUrl = result.shareGif && result.shareGif.remoteUrl
    if (!remoteUrl) {
      this.handleSaveGif(true, (remoteUrl) => {
        Taro.previewImage({
          current: remoteUrl,
          urls: [remoteUrl]
        })
      })
    } else {
      Taro.previewImage({
        current: remoteUrl,
        urls: [remoteUrl]
      })
    }
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

  // 设置人物状态
  setForegroundActiveStatus = (value = false, callback?:()=>void) => {
    this.setStateTarget('foreground', {isActive: value}, callback)
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

  // 人物自适应
  foregroundAuto = (callback?:()=>void) => {
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
    this.setStateTarget('foreground', {
      ...size,
      ...position
    }, () => {
      typeof callback === 'function' && callback()
    })
  }
  // 计算人物尺寸
  calcForegroundSize = () => {
    const {currentScene, foreground, frame} = this.state
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
    const {currentScene, foreground, frame} = this.state
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
      // case '11':
      //   faceCenterLocation ()
      //   break
      default:
        result.x = (boxWidth - width) * 0.5
        result.y = (boxHeight - height) * 0.5
    }
    result.rotate = parseInt(sceneConfig.rotate)

    return result

    function location (position, boxWidth, boxHeight, width, height) {
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
    function centerLocation (position, boxWidth, boxHeight, width, height) {
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
    function faceCenterLocation () {
      // const faceCenterPosition = (globalData.separateResult &&
      //       globalData.separateResult.faceCenterDict && globalData.separateResult.faceCenterDict['16-1']) || [0, 0]
      // const imageSize = (globalData.separateResult &&
      //       globalData.separateResult.imageSizeDict && globalData.separateResult.imageSizeDict['16-1']) || [1, 1]
      // const faceLeft = (faceCenterPosition[0] / imageSize[0]) || 0.5 // 脸部中心点距离左边比例
      // const faceTop = (faceCenterPosition[1] / imageSize[1]) || 0.5 // 脸部中心点距离顶边比例
      // if (position.xAxis.derection === 'left') {
      //   sticker.x = position.xAxis.offset * boxWidth - width * faceLeft
      // }
      // if (position.xAxis.derection === 'right') {
      //   sticker.x = boxWidth * (1 - position.xAxis.offset) - width * faceLeft
      // }
      // if (position.yAxis.derection === 'top') {
      //   sticker.y = position.yAxis.offset * boxHeight - height * faceTop
      // }
      // if (position.yAxis.derection === 'bottom') {
      //   sticker.y = boxHeight * (1 - position.yAxis.offset) - height * faceTop
      // }
    }
  }
  // 缓存人物尺寸位置
  storeForegroundInfo = () => {
    const {foreground, currentScene} = this.state
    const clone_foreground = tool.deepClone(foreground)
    // clone_foreground.isActive = false
    const sceneId = currentScene.sceneId || 'demo_scene'
    this.cache['foreground'].set(sceneId, clone_foreground)
    // console.log('this.cache.foreground', this.cache['foreground'].get(sceneId))
  }

  // 贴纸自适应
  coverAuto = (originInfo, cover, callback?:()=>void) => {
    const size = this.calcCoverSize(originInfo, cover)
    const position = this.calcCoverPosition(size, cover)
    const {coverList, currentScene} = this.state
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
    const autoScale = parseFloat(coverInfo.size.default || 0.5)
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

    function location (position, boxWidth, boxHeight, width, height) {
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
    function centerLocation (position, boxWidth, boxHeight, width, height) {
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
  todo = (data) => {
    const {detail: {userInfo}} = data   
    if (userInfo) {
      service.base.loginAuth(data.detail)
      globalData.userInfo = userInfo
      if(this.state.hasGuide===true){
        this.setState({
          hasGuide:false
        })
      }
      work.chooseImage({
        onTap: (index) => {
          // console.log('tap index', index)
          if (index === 0) {
            this.app.aldstat.sendEvent('编辑页面选择拍摄照片', '选择拍摄')
          } else if (index === 1) {
            this.app.aldstat.sendEvent('编辑页面选择相册照片', '选择相册')
          }
        },
        onSuccess: async (path) => {
          console.log('choosedImage', path, globalData)
          this.app.aldstat.sendEvent('编辑页面人像成功', '上传成功')
          globalData.choosedImage = path
          const separateResult = globalData.separateResult = await this.initSegment()
          console.log('separateResult', separateResult)
          await this.initSeparateData(separateResult)
        }
      })
    } else {
      Taro.showToast({
        title: '请授权',
        icon: 'success',
        duration: 2000
      })
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

  render () {
    const { loading, rawImage, frame, foreground, coverList, sceneList, currentScene, result, music } = this.state
    return (
      <View className='page-dynamic'>
        <Title
          color="#333"
          leftStyleObj={{left: Taro.pxTransform(8)}}
          renderLeft={
            <CustomIcon type="back" theme="dark" onClick={this.pageToHome}/>
          }
        >懒人抠图</Title>
        <View className="main">
          <View className="pic-section">
            {/* <View className={`raw ${(foreground.remoteUrl && foreground.loaded) ? 'hidden' : ''}`}>
              <Image src={rawImage.localUrl} style="width:100%;height:100%" mode="aspectFit"/>
            </View> */}
            <View className={`crop`} id="crop">
              <View className="background-image">
                <Image
                  src={currentScene.bgUrl}
                  style="width:100%;height:100%"
                  mode="aspectFit"
                  onClick={this.handleBackgroundClick}
                />
              </View>
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
              {coverList.map(item => {
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
              })}
              <Voice status={music.play ? 'on' : 'off'} onClick={this.handleToggleMusic}/>
            </View>
          </View>
          <MarginTopWrap config={{large: 60, small: 40, default: 20}}>
          <View style="display:flex;margin-top:120rpx">
              <Button style='flex:1;z-index:2' id='addPhoto' openType="getUserInfo"  className="custom-button pink" hoverClass="btn-hover" onGetUserInfo={this.todo}>{this.state.chooseText}</Button>
              <Button style='flex:1;margin-left:10px' className="custom-button white" hoverClass="btn-hover" onClick={this.handleOpenResult}>保存</Button>
            </View>
          </MarginTopWrap>
        </View>
        <Loading visible={loading} />
        <View className='newGuide' style={{ display: this.state.hasGuide === false ? 'none' : 'block' }}>
          <Image src={addTips} alt="" className='tips' style={{ top: this.state.guiderTop+'px' }}/>
        </View>
        <AuthModal />
        {result.show &&
          <ResultModal
            type='video'
            video={{
              url: result.shareVideo.remoteUrl,
              width: result.shareVideo.width,
              height: result.shareVideo.height,
            }}
            renderButton={
              <View className="btn-wrap">
                <Button className="custom-button pink btn-1" hoverClass="btn-hover" openType="share" >分享给好友</Button>
                {this.state.ableToShareToQZone ? 
                <View>
                  <Button className="custom-button dark btn-2" hoverClass="btn-hover"  onClick={this.publishToQzone}>同步到说说</Button>
                  <Button className="custom-button dark btn-3" hoverClass="btn-hover"  onClick={this.handleShowGif}>保存Gif</Button>
                </View>: <View>
                  <Button className="custom-button dark btn-4" hoverClass="btn-hover"  onClick={this.handleShowGif}>保存Gif</Button>
                </View>} 
              </View>
            }
          />
        }
      </View>
    )
  }
}

export default Dynamic as ComponentClass<PageOwnProps, PageState>
