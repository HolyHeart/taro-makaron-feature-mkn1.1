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
import globalData from '@/services/global_data'
import Session from '@/services/session'
import service from '@/services/service'
import { appConfig } from '@/services/config'
import { createCache } from '@/services/cache'
import mock_theme_data from './mock_theme_data.json'
import './index.less'

const mock_path = 'https://static01.versa-ai.com/upload/783272fc1375/999deac02e85f3ea.png'
const mock_segment_url = 'https://static01.versa-ai.com/images/process/segment/2019/01/14/b4cf047a-17a5-11e9-817f-00163e001583.png'
const getSceneList = function (sceneList:Array<object> = []) {
  const result = []
  sceneList.forEach(v => {
    const {sceneType, bgUrl, sceneId, sceneName, shareContent, thumbnailUrl, sceneConfig, segmentType, segmentZIndex, bgZIndex} = v
    let supportMusic = false
    let hasIcon = false
    if (sceneConfig) {
      const {music = {}} = JSON.parse(sceneConfig)
      supportMusic = music.fileUrl ? true : false      
    } 
    if (sceneType === 2 || sceneType === 1 ) {
      hasIcon = true
    }
    result.push({
      sceneType,
      bgUrl, 
      sceneId, 
      sceneName, 
      shareContent, 
      thumbnailUrl, 
      sceneConfig, 
      segmentType, 
      segmentZIndex, 
      bgZIndex, 
      supportMusic,
      hasIcon})
  })
  return result
}

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
  }
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Dynamic {
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
class Dynamic extends Component {
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
      // }
    ],
    music: {
      remoteUrl: '',
      play: true
    },
    sceneList: [],
    currentScene: {},    
    result: {
      show: false,
      url: '',
    }
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

  _initPage = async () => {
    this.calFrameRect()
    this.initRawImage()
    await Session.set()
    this.initSceneData(() => {
      this.initCoverData()
    })    
    this.initSegment()
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
      }, 100)
    } else {
      this.innerAudioContext.pause()
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
  // 初始化分割
  initSegment = async () => {
    const {foreground} = this.state   
    let segmentData
    try {   
      Taro.showLoading({
        title: '照片变身中...',
        mask: true,
      })
      segmentData = await service.core.segmentDemo(globalData.choosedImage, mock_segment_url , 3000)
      Taro.hideLoading()
    } catch(err) {
      console.log('catch', err)
    }     
    this.setState({      
      foreground: {
        ...foreground,
        remoteUrl: segmentData.result
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
    // const themeData = mock_theme_data.result
    const themeData = globalData.themeData || {sceneList: []}
    this.themeData.sceneList = getSceneList(themeData.sceneList || [])

    // 去除sceneConfig属性
    const sceneList = this.themeData.sceneList.map((v:object) => {
      const {sceneConfig, ...rest} = v
      return {
        ...rest
      }
    })
    const currentScene = sceneList[0]

    this.setState({
      sceneList: sceneList,
      currentScene: currentScene
    }, () => {
      // console.log('state', this.state)
      typeof callback === 'function' && callback()
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
    const sceneInfo = work.getSceneInfoById(currentScene.sceneId, this.themeData.sceneList, 'sceneId')
    const sceneConfig = JSON.parse(sceneInfo.sceneConfig)
    const remoteUrl = sceneConfig.music && sceneConfig.music.fileUrl
    if (remoteUrl) {
      this.createAudio(remoteUrl)  
      this.setState({
        music: {
          ...this.state.music,
          remoteUrl
        }
      })
      if (this.state.music.play) {
        this.setAudio('play')
      } else {
        this.setAudio('pause')
      }         
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
    const {width, height} = detail
    this.setStateTarget('foreground', {
      originWidth: width,
      originHeight: height
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
      this.foregroundAuto()
      this.initCoverData()
      // 初始化音乐
      this.initMusicData()
    })
  }
  // 保存
  handleOpenResult = async () => {     
    Taro.showLoading({
      title: '照片生成中...',
      mask: true,
    }) 
    // const canvasImageUrl = await this.createCanvas()
    Taro.hideLoading()
    // this.setState({
    //   result: {
    //     url: canvasImageUrl,
    //     show: true
    //   }
    // })
  }
  // 再玩一次
  handleResultClick = () => {
    this.setResultModalStatus(false)
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
    const sceneId = currentScene.sceneId || 'demo_scene'  
    const cache_foreground = this.cache['foreground']
    const scene_foreground_params = cache_foreground.get(sceneId)

    if ( scene_foreground_params ) {
      this.setStateTarget('foreground', {
        ...scene_foreground_params
      }, () => {
        typeof callback === 'function' && callback()
      })
      return
    }

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
    const {currentScene, sceneList, foreground, frame} = this.state
    const {originWidth, originHeight} = foreground    
    const sceneInfo = work.getSceneInfoById(currentScene.sceneId, this.themeData.sceneList, 'sceneId')

    const imageRatio = originWidth / originHeight
    const params = JSON.parse(sceneInfo.sceneConfig)
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
    const sceneInfo = work.getSceneInfoById(currentScene.sceneId, this.themeData.sceneList, 'sceneId')

    const boxWidth = frame.width
    const boxHeight = frame.height
    const sceneConfig = JSON.parse(sceneInfo.sceneConfig)
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
    const { global } = this.props
    const { rawImage, frame, foreground, coverList, sceneList, currentScene, result, music } = this.state
    return (
      <View className='page-dynamic'>
        <Title 
          top={global.system.statusBarHeight + 10}
          color="#333"
          renderLeft={
            <CustomIcon type="back" theme="dark" onClick={work.pageToHome}/>
          }
        >马卡龙玩图-动态贴纸</Title>
        <View className="main">
          <View className="pic-section">
            <View className={`raw ${foreground.remoteUrl ? 'hidden' : ''}`}>
              <Image src={rawImage.localUrl} style="width:100%;height:100%" mode="aspectFit"/>
            </View>
            <View className={`crop ${foreground.remoteUrl ? '' : 'hidden'}`} id="crop">                
              <View className="background-image">
                <Image 
                  src={currentScene.bgUrl} 
                  style="width:100%;height:100%" 
                  mode="scaleToFill"
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
                      />
              })}
              <Voice status={music.play ? 'on' : 'off'} onClick={this.handleToggleMusic}/>
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
        {result.show &&
          <ResultModal 
            url={result.url}
            onClick={this.handleResultClick}
          />
        }        
      </View>
    )
  }
}

export default Dynamic as ComponentClass<PageOwnProps, PageState>
