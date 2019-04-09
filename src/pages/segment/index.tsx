import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Image, Canvas } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { getSystemInfo } from '@/model/actions/global'
import tool from '@/utils/tool'
import work from '@/utils/work'
import Title from '@/components/Title'
import CustomIcon from '@/components/Icon'
import Sticker from '@/components/Sticker'
import Loading from '@/components/Loading'
import AuthModal from '@/components/AuthModal'
import ResultModal from '@/components/ResultModal'
import globalData from '@/services/global_data'
import Session from '@/services/session'
import service from '@/services/service'
import { appConfig } from '@/services/config'
import { createCache } from '@/services/cache'
import './index.less'
import image_code from '@/assets/images/code.png'
import image_versa from '@/assets/images/versa.png'

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
  coverList: Array<object>
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Segment {
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
class Segment extends Component {
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
      isActive: true, // 是否激活
      loaded: false, // 是否加载完毕
      visible: true, // 是否显示
    },
    sceneList: [],
    currentScene: {},
    canvas: {
      id: 'shareCanvas',
      ratio: 3
    },
    loading: false,
    result: {
      show: false,
      shareImage: {
        remoteUrl: '',
        localUrl: '',
      },
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

  componentWillMount () {}
  componentDidMount () { 
    this._initPage()
  }
  componentWillReceiveProps (nextProps) {
    // console.log(this.props, nextProps)  
  }
  componentWillUnmount () { }
  componentDidShow () { }
  componentDidHide () { }
  onShareAppMessage (res) {
    // if (res.from === 'button') {
    //   console.log('页面按钮分享', res.target)
    // }
    const {currentScene, result = {}} = this.state  
    const {shareImage = {}} = result
    const shareContent = currentScene.shareContent || (globalData.themeData && globalData.themeData.shareContent)
    const shareImageUrl = `${shareImage.remoteUrl}?x-oss-process=image/resize,m_pad,h_420,w_525`
    const data = {
      shareSource: shareImage.remoteUrl,
      themeId: globalData.themeId || '',
      sceneId: currentScene.sceneId || '',
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
    this.calFrameRect()
    this.initRawImage()
    await Session.set()
    this.initSceneData(() => {
    })    
    const separateResult = globalData.separateResult = await this.initSegment()
    // console.log('separateResult', separateResult)
    await this.initSeparateData(separateResult)
  }

  _refreshPage = async (path) => {
    globalData.choosedImage = path  
    this.setState({
      foreground: {
        ...this.state.foreground,
        remoteUrl: '',
        loaded: false
      }
    }, () => {
      this.initRawImage(async () => {
        const separateResult = await this.initSegment()
        globalData.separateResult = separateResult
        await this.initSeparateData(separateResult)        
      })      
    })          
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
  setResultModalStatus = (flag = false) => {
    const {result} = this.state
    result.show = flag
    this.setState({
      result: {
        ...result
      }
    })
  }  

  initRawImage = (callback?:()=>void) => {
    const {rawImage} = this.state
    globalData.choosedImage = globalData.choosedImage || 'http://tmp/wxcfe56965f4d986f0.o6zAJsztn2DIgXEGteELseHpiOtU.6gRGsIZIvyytf45cffd60a62912bada466d51e03f6fa.jpg'
    this.setState({
      rawImage: {
        ...rawImage,
        localUrl: globalData.choosedImage
      }
    }, () => {
      typeof callback === 'function' && callback()
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
    const sceneList = this.themeData.sceneList.map((v:object = {}) => {
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
      typeof callback === 'function' && callback()
    })
  }  
  // 初始化分割
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
        }
      })
      const {cateImageDict = {}} = separateRes.result || {}
      if (!cateImageDict['16'] && !cateImageDict['16-1']) {
        console.log('技术犯规了')
        // Taro.redirectTo({url: '/pages/home/index'})       
        return 
      } 
    } catch(err) {
      console.log('catch', err)
      this.hideLoading()
      return {}
    }
    return (separateRes && separateRes.result) || {}
  }

  initSeparateData = async (separateResult) => {  
    const { currentScene } = this.state 
    this.changeSceneChooseSegment(currentScene, separateResult, (res = {}) => {
      // console.log('changeSceneChooseSegment', res)
      this.setState({      
        foreground: {
          ...this.state.foreground,
          remoteUrl: res.separateUrl
        }
      }) 
    }) 
  }

  // 根据场景决定头像
  changeSceneChooseSegment = async (currentScene, separateResult = {}, callback) => {    
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
 
  // 背景
  handleBackgroundClick = () => {
    this.setForegroundActiveStatus(false)
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
  }
  handleForegroundTouchend = () => {
    this.storeForegroundInfo()
  }

  // 保存
  handleOpenResult = async () => {     
    Taro.showLoading({
      title: '照片生成中...',
      mask: true,
    }) 
    const canvasImageUrl = await this.createCanvas()
    Taro.hideLoading()
    this.setState({
      result: {
        shareImage: {
          localUrl: canvasImageUrl,
          remoteUrl: '',
        },
        show: true
      }
    }, async () => {
      const {url} = await service.base.upload(canvasImageUrl)
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
  }
  handlePlayAgain = () => {    
    work.chooseImage({
      onTap: (index) => {
        console.log('tap index', index)
      },
      onSuccess: (path) => {
        this.setResultModalStatus(false)
        this._refreshPage(path)              
      }
    })
  }  

  createCanvas = async () => {
    return new Promise(async (resolve, reject) => {
      const { foreground, frame, canvas} = this.state
      const context = Taro.createCanvasContext(canvas.id, this)
      const { ratio = 3 } = canvas
      
      // 绘制元素
      await this.canvasDrawElement(context, ratio)       
      //绘制图片
      context.draw()
      //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
      setTimeout(function () {
        Taro.canvasToTempFilePath({
          canvasId: canvas.id,
          fileType: 'png',
          success: function (res) {
            let tempFilePath = res.tempFilePath
            resolve(tempFilePath)
          },
          fail: function (res) {
            reject(res)
          },
          complete:function(){
          }
        });
      }, 400)
    })  
  }
  // 绘制贴纸，文字，覆盖层所有元素
  canvasDrawElement = async (context, ratio) => {
    const { foreground } = this.state
    // 收集所有元素进行排序
    let elements:Array<any> = []
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
    // 对元素进行排序
    elements.sort((a, b) => {
      return a.zIndex - b.zIndex
    })
    // 下载成本地图片并绘制
    for (let i = 0; i < elements.length; i++ ) {
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
    function drawElement ({localUrl, width, height, x, y, rotate}) {    
      context.save()    
      context.translate(x + 0.5 * width, y + 0.5 * height)
      context.rotate(rotate * Math.PI / 180)
      context.drawImage(localUrl,  -0.5 * width, -0.5 * height, width, height) 
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
    context.drawImage(image_code,  codeLeft, codeTop, codeWidth, codeHeight) 
    context.restore()
    context.stroke()
    // const localLogoImagePath = '../../assets/images/versa.png'
    const logoWidth = 197 * 1.5
    const logoHeight = 20 * 1.5
    const logoLeft = frame.width * ratio * 0.5 - logoWidth * 0.5
    const logoTop = frame.height * ratio - logoHeight - 8
    context.save()
    context.drawImage(image_versa,  logoLeft, logoTop, logoWidth, logoHeight) 
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
      // console.log('get-cache', cacheKey, cache_source.get(cacheKey))
      return cache_source.get(cacheKey)
    } else {
      try {
        const result = await service.base.downloadFile(remoteUrl)
        localImagePath = result.tempFilePath
      } catch (err) {
        console.log('下载图片失败', err)
      }
    }
    return this.cache['source'].set(cacheKey, localImagePath)
  }
  // 设置人物状态
  setForegroundActiveStatus = (value = false) => {
    this.setStateTarget('foreground', {isActive: value})
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
    function faceCenterLocation (position, boxWidth, boxHeight, width, height) {
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
    // console.log('this.cache.foreground', this.cache['foreground'].get(sceneId))
  }

  render () {
    const { loading, rawImage, frame, foreground, result, canvas } = this.state
    const { global: {system: {windowHeight}} } = this.props
    return (
      <View className='page-segment'>
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
              <Image src={rawImage.localUrl} style="width:100%;height:100%" mode="aspectFit"/>
            </View>
            <View className={`crop ${(foreground.remoteUrl && foreground.loaded) ? '' : 'hidden'}`} id="crop">                
              <View className="layer-bg" onClick={this.handleBackgroundClick}></View>   
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
            </View>  
          </View>          
          <View className={`button-section ${windowHeight > 800 ? 'high' : ''}`}>
            <Button className="custom-button pink" hoverClass="btn-hover" onClick={this.handleOpenResult}>保存透明底图片(PNG)</Button>
          </View>        
        </View>
        <View class="canvas-wrap">
          <Canvas 
            style={`width: ${frame.width * canvas.ratio}px; height: ${frame.height * canvas.ratio}px;`} 
            canvasId={canvas.id} />
        </View>
        <Loading visible={loading} />
        <AuthModal />
        {result.show &&
          <ResultModal 
            type='image'
            image={{
              url: result.shareImage.localUrl,
            }}
            layer={true}
            renderButton={
              <View className="btn-wrap">
                <Button className="custom-button pink btn-1" hoverClass="btn-hover" openType="share" >分享给好友</Button>
                <Button className="custom-button dark btn-2" hoverClass="btn-hover"  onClick={this.handlePlayAgain}>再玩一次</Button>            
              </View>
            }
          />
        }        
      </View>
    )
  }
}

export default Segment as ComponentClass<PageOwnProps, PageState>
