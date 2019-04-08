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
import globalData from '@/services/global_data'
import Session from '@/services/session'
import service from '@/services/service'
import { appConfig } from '@/services/config'
import { createCache } from '@/services/cache'
import './index.less'

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

interface Filter {
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
class Filter extends Component {
  config: Config = {
    navigationBarTitleText: '马卡龙玩图',
    disableScroll: true,
  }

  state = {
    rawImage: {
      localUrl: '',
      remoteUrl: ''
    },
    frame: {
      width: 0,
      height: 0,
      left: 0,
      top: 0,
    },    
    background: {
      id: 'background',      
      localUrl: '',
      remoteUrl: '',
      zIndex: 0,
      width:0,
      height:0,
      x: 0,
      y:0,
      originWidth: 0, // 原始宽度
      originHeight: 0, // 原始高度
      autoWidth: 0, // 自适应后的宽度
      autoHeight: 0, // 自适应后的高度
      autoScale: 0, // 相对画框缩放比例
    },
    foreground: {
      id: 'foreground',
      // remoteUrl: 'https://static01.versa-ai.com/images/process/segment/2019/04/08/f3e6de00-59a2-11e9-aa20-525400c5c0fe.png',
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
      loaded: false, // 是否加载完毕
    },
    filter: {
      // remoteUrl: 'https://static01.versa-ai.com/upload/prod/image/3da2df2b-fab9-40d0-8b11-0f1bd96247bf.png',
      remoteUrl: '',
      axis: 'x', // x y轴
      size: 1, // 大小
      originWidth: 0, // 原始宽度
      originHeight: 0, // 原始高度
      width: 100, // 实际宽度
      height: 100, // 实际高度
      x: 0, // x坐标
      y: 0, // y坐标
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
    videoRatio: 1
  }

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
    const {currentScene, result = {}} = this.state  
    const {shareVideo = {}, shareImage = {}} = result
    const shareContent = currentScene.shareContent || (globalData.themeData && globalData.themeData.shareContent)
    const shareImageUrl = `${shareImage.remoteUrl}?x-oss-process=image/resize,m_pad,h_420,w_525`
    const data = {
      shareSource: shareVideo.remoteUrl,
      themeId: globalData.themeId || '',
      sceneId: currentScene.sceneId || '',
      width: shareVideo.width,
      height: shareVideo.height
    }
    const path = tool.formatQueryUrl('/pages/share/index', data)
    const {userInfo = {}} = globalData 
    const title = `@${userInfo.nickName}：${shareContent}`
    if (!shareImage.remoteUrl) {
      return {
        title: title,
        path: '/pages/home/index',
        imageUrl: currentScene.thumbnailUrl,	
      }
    }
    console.log(title, path, shareImageUrl)
    return {
      title: title,
      path: path,
      imageUrl: shareImageUrl,			
      success: () => {
        console.log('分享成功')
      },
    }
  }

  _initPage = async () => {
    globalData.choosedImage = globalData.choosedImage || 'http://tmp/wxcfe56965f4d986f0.o6zAJsztn2DIgXEGteELseHpiOtU.6gRGsIZIvyytf45cffd60a62912bada466d51e03f6fa.jpg'
    this.calFrameRect()
    this.initRawImage()
    await Session.set()
    this.initSceneData(() => {
      this.initFilterData()
      this.initCoverData()
    })    
    const separateResult = globalData.separateResult = await this.initSegment()
    console.log('separateResult', separateResult)
    await this.initSeparateData(separateResult)
  }

  test = async () => {
    // try {
    //   const result = await service.core.column()
    //   console.log('result', result)   
    // } catch(err) {
    //   console.log('catch', err)
    // } 
    //   const uploadResult = await service.base.upload(mock_path, 'png')
    //   console.log('uploadResult', uploadResult)    
  }
  // 公共方法
  pageToHome = () => {
    Taro.redirectTo({
      url: '/pages/home/index'
    }) 
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
      const {currentScene, frame, music, background, filter, foreground, coverList = [], videoRatio = 1} = this.state
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
          url: background.remoteUrl,
          width: background.width * videoRatio,
          height: background.height * videoRatio
        },
        filter: {
          url: filter.remoteUrl, 
          width: filter.width * videoRatio, 
          height: filter.height * videoRatio,
          x: filter.x * videoRatio,
          y: filter.y * videoRatio
        },
        foreground: {
          url: foreground.remoteUrl,
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
    const {rawImage, background} = this.state
    this.setState({
      rawImage: {
        ...rawImage,
        localUrl: globalData.choosedImage
      },
      background: {
        ...background,
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
        beforeSeparate: (remoteUrl) => {
          const { imageHost } = appConfig
          this.setState({
            background: {
              ...this.state.background,
              remoteUrl: imageHost + remoteUrl
            }
          })
        }
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
    if (!separateResult.cateImageDict) {
      return
    }
    const { foreground } = this.state 
    // 判断分离的是全身还是头像
    // 16：只含人尺寸的全身
    // 16-2：全图尺寸下全身
    // 16-1：只含人头像尺寸的头像
    // 16-3：全图尺寸下的头像
    let separateUrl = appConfig.imageHost + separateResult.cateImageDict['16-2']    
    this.setState({      
      foreground: {
        ...foreground,
        remoteUrl: separateUrl
      }
    }) 
  }
  // 初始化场景信息
  initSceneData = async (callback) => {
    // 全局主题数据
    if (!globalData.themeData) {
      const themeId = globalData.themeId || appConfig.themeId
      const res = await service.core.theme(themeId)
      globalData.themeData = res.result && res.result.result   
    }
    const themeData = globalData.themeData || {sceneList: []}
    this.themeData.sceneList = work.getSceneList(themeData.sceneList || [])

    // 去除sceneConfig属性
    const sceneList = this.themeData.sceneList.map((v:object) => {
      const {sceneConfig, ...rest} = v
      return {
        ...rest
      }
    })

    const {sceneId} = this.$router.params
    let currentScene 
    if (sceneId) {
      currentScene = sceneList.find(v => v.sceneId === sceneId) || {}
    } else {
      currentScene = sceneList[0]
    }

    this.setState({
      sceneList: sceneList,
      currentScene: currentScene || {}
    }, () => {
      // console.log('state', this.state)
      typeof callback === 'function' && callback()
    })
  } 
  // 初始化夹层滤镜
  initFilterData = () => {
    const { currentScene } = this.state
    const sceneInfo = work.getSceneInfoById(currentScene.sceneId, this.themeData.sceneList, 'sceneId')
    const sceneConfig = JSON.parse(sceneInfo.sceneConfig)
    const {filter = {}} = sceneConfig
    const remoteUrl = filter.imageUrls[0]
    const loaded = false
    const axis = filter.position && filter.position.axis || 'x'
    const size = filter.position && filter.position.size || 1  
    this.setState({      
      filter: {
        ...this.state.filter,
        remoteUrl,
        loaded,
        axis,
        size
      }
    }, () => {
      // console.log('filter', this.state.filter)
    }) 
  }
  // 初始化贴纸
  initCoverData = () => {
    const {currentScene} = this.state    
    const sceneInfo = work.getSceneInfoById(currentScene.sceneId, this.themeData.sceneList, 'sceneId')
    const sceneConfig = JSON.parse(sceneInfo.sceneConfig)
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
    const sceneInfo = work.getSceneInfoById(currentScene.sceneId, this.themeData.sceneList, 'sceneId') || {}
    const sceneConfig = JSON.parse(sceneInfo.sceneConfig)
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
    this.setCoverListActiveStatus({type: 'all'}, false)    
  }
  // 背景图片加载
  onBackgroundLoaded = (e:object,) => {    
    const {detail= {}} = e
    // console.log('onBackgroundLoaded', detail)
    const {width = 0, height = 0} = detail
    this.setStateTarget('background', {
      originWidth: width,
      originHeight: height
    }, () => {
      this.backgroundAuto()      
    })
  }
  // 人物
  onForegroundLoaded = (e:object) => {
    const {detail= {}} = e
    // console.log('handleForegroundLoaded', detail)    
    this.hideLoading()
    const {width, height} = detail
    this.setStateTarget('foreground', {
      originWidth: width,
      originHeight: height,
      loaded: true
    }, () => {
      // 初始化音乐
      this.initMusicData()
    })
  }
  // 滤镜
  onFilterLoaded = (e:object,) => {    
    const {detail= {}} = e
    // console.log('onFilterLoaded', detail)
    const {width = 0, height = 0} = detail
    this.setStateTarget('filter', {
      originWidth: width,
      originHeight: height,
      loaded: true
    }, () => {
      this.filterAuto() 
    })
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
  }
  handleCoverTouchend = (sticker) => {
    // console.log('handleCoverTouchend', sticker)
    this.storeCoverInfo(sticker)
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
  }
  handleToggleMusic = (status) => {
    if (status === 'on') {
      this.setAudio('pause')
    } else if (status === 'off') {
      this.setAudio('play')
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
      this.initCoverData()
      this.initFilterData()   
      // 初始化音乐
      this.initMusicData()
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
    this.setAudio('pause')
    Taro.showLoading({
      title: '保存中...',
      mask: true,
    }) 
    this.isSaving = true
    let result
    try {
      result = await this.createShareSource('mp4')
      Taro.hideLoading()
      this.isSaving = false
    } catch (err) {
      Taro.hideLoading()
      this.isSaving = false
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

  // 背景自适应
  backgroundAuto =(callback?:()=>void) => { 
    const size = this.calcBackgroundSize()
    const position = this.calcBackgroundPosition(size)
    this.setStateTarget('background', {
      ...size,
      ...position
    }, () => {
      typeof callback === 'function' && callback()
    })
  } 
  calcBackgroundSize = () => {
    const { background, frame} = this.state
    const { originWidth, originHeight } = background 
    const imageRatio = originWidth / originHeight  
    // 计算宽高比例
    const result = {
      autoScale: 1,
      autoWidth: 0,
      autoHeight: 0,
      width: 0,
      height: 0
    }
    if ((originWidth / originHeight) > (frame.width / frame.height) ) {  
      // 图片宽高比大于框
      // 将图片宽度缩放为与框相同    
      result.autoScale = frame.height / originHeight
      result.autoWidth = frame.width
      result.autoHeight = result.autoWidth / imageRatio
    } else {      
      result.autoScale = frame.width / originWidth
      result.autoHeight = frame.height
      result.autoWidth = result.autoHeight * imageRatio
    }   
    
    result.width = result.autoWidth
    result.height = result.autoHeight
    return result
  }
  calcBackgroundPosition = ({width, height} = {}) => {
    const { frame } = this.state    
    let x = 0
    let y = 0
    x -= (width - frame.width) * 0.5
    y -= (height - frame.height) * 0.5
    const result = {
      x,
      y,
      rotate: 0
    }
    return result
  }
  // 滤镜自适应
  filterAuto = (callback?:()=>void) => {
    // 获取图片原始大小
    const { filter, background } = this.state
    const { originWidth = 0, originHeight = 0, axis = 'x', size = 1} = filter || {}
    const boxWidth = background.width
    const boxHeight = background.height
    // 计算宽高比例
    let ratio = originWidth / originHeight
    let width = 0, height = 0, x = 0, y = 0
    if (axis === 'x') {
      // 图片宽度以x轴计算
      width = boxWidth * size
      height = width / ratio
    } else {
      height = boxHeight * size
      width = height * ratio
    }    
    // 位移使图片居中
    x -= (width - boxWidth) * 0.5
    y -= (height - boxHeight) * 0.5
    this.setState({
      filter: {
        ...this.state.filter,
        width,
        height,
        x,
        y
      }
    }, () => {
      typeof callback === 'function' && callback()
    })
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
    const {background} = this.state
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
      result.autoWidth = background.width * autoScale
      result.autoHeight = result.autoWidth / imageRatio
    } else {        
      result.autoHeight = background.height * autoScale
      result.autoWidth = result.autoHeight * imageRatio
    } 
    result.width = result.autoWidth
    result.height = result.autoHeight

    return result
  }
  calcCoverPosition = (size = {}, cover = {}) => {
    const {width = 0, height = 0} = size
    const {background} = this.state
    const coverInfo = work.getCoverInfoById(cover.id, this.themeData.rawCoverList, 'id')    
    const {position, rotate = 0} = coverInfo
    const boxWidth = background.width
    const boxHeight = background.height

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
    const { loading, rawImage, frame, background, filter, foreground, coverList, sceneList, currentScene, result, music } = this.state
    return (
      <View className='page-filter'>
        <Title
          color="#333"
          leftStyleObj={{left: Taro.pxTransform(8)}}
          renderLeft={
            <CustomIcon type="back" theme="dark" onClick={work.pageToHome}/>
          }
        >马卡龙玩图</Title>
        <View className="main">
          <View className="pic-section">
            <View className={`raw ${(foreground.remoteUrl && foreground.loaded) ? 'hidden' : ''}`}>
              <Image src={rawImage.localUrl} style="width:100%; height:100%" 
                mode="aspectFit"/>
            </View>
            <View className={`crop ${(foreground.remoteUrl && foreground.loaded) ? '' : 'hidden'}`} id="crop">                
              <View 
                className='play-section' 
                style={{width: `${background.width}px`, height: `${background.height}px`, left: `${background.x}px`, top: `${background.y}px`}}
              >
                <View className="background-image">
                  <Image 
                    src={background.localUrl} 
                    style="width:100%;height:100%" 
                    mode="scaleToFill"
                    onClick={this.handleBackgroundClick}
                    onLoad={this.onBackgroundLoaded}
                  />
                </View> 
                <View                   
                  className="filter-image" 
                  style={{width: `${filter.width}px`, height: `${filter.height}px`, left: `${filter.x}px`, top: `${filter.y}px`}}
                >
                  <Image 
                    class="bg-img {{filter.visible ? '' : 'hidden'}}" 
                    src={filter.remoteUrl}
                    style="width: 100%; height:100%;" 
                    onLoad={this.onFilterLoaded}/>
                </View>
                <View className="foreground-image">
                  <Image 
                    src={foreground.remoteUrl} 
                    style="width:100%;height:100%" 
                    mode="scaleToFill"
                    onClick={this.handleBackgroundClick}
                    onLoad={this.onForegroundLoaded}
                  />
                </View>                
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
          </View>
          <SceneList 
            list={sceneList} 
            currentScene={currentScene}
            styleObj={{width: '720rpx', paddingTop: '20rpx', marginRight: '-60rpx'}}
            onClick={this.handleChooseScene}
          />
          <View className="button-section">
            <Button className="custom-button pink" hoverClass="btn-hover" onClick={this.handleOpenResult}>保存</Button>
          </View>        
        </View> 
        <Loading visible={loading} />       
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
                <Button className="custom-button dark btn-2" hoverClass="btn-hover"  onClick={this.handleShowGif}>保存Gif</Button>            
              </View>
            }
          />
        }        
      </View>
    )
  }
}

export default Filter as ComponentClass<PageOwnProps, PageState>
