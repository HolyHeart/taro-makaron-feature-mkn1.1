import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Image, Canvas ,ScrollView} from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { getSystemInfo } from '@/model/actions/global'
import tool from '@/utils/tool'
import work from '@/utils/work'
import Title from '@/components/Title'
import CustomIcon from '@/components/Icon'
import CustomBg from '@/components/CustomBg'
import NewCustomBg from "@/components/NewCustomBg";
import Sticker from '@/components/Sticker'
import SceneList from '@/components/SceneList'
import Loading from '@/components/Loading'
import MarginTopWrap from '@/components/MarginTopWrap'
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


// const mock_path = 'https://static01.versa-ai.com/upload/783272fc1375/999deac02e85f3ea.png'
// const mock_segment_url = 'https://static01.versa-ai.com/images/process/segment/2019/01/14/b4cf047a-17a5-11e9-817f-00163e001583.png'

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

interface Editor {
  props: IProps;
}

@connect(({ global }) => ({
  global
}), (dispatch) => ({
  getSystemInfo(data) {
    dispatch(getSystemInfo(data))
  }
}))
class Editor extends Component {
  config: Config = {
    navigationBarTitleText: '马卡龙玩图',
    disableScroll: true,
    enablePullDownRefresh: false
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
    customBg: {
      localUrl: '',
      remoteUrl: '',
      originWidth: 0,
      originHeight: 0,
      autoScale: 1,
      autoWidth: 0,
      autoHeight: 0,
      width: '100%',
      height: '100%',
      x: 0,
      y: 0,
      rotate: 0,


    },
    foreground: {
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
    },
    coverList: [
    ],
    preBackGroundList: [],
    currentScene: {
      type: 'recommend', // 'custom' 'recommend'
    },
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
    },
    drawBoard: {
      width: '670rpx',
      height: '670rpx'
    }
  }

  app = Taro.getApp()

  // 全局主题数据
  themeData = {
    originalImageList:[],
    rawCoverList: [], // 原始贴纸数据
    currentOriginalImageId:'',
    imageLayer:[],
    originalImage:{},
    activityId:'',
    originalCompleteImageUrl:''
  }

  cache = {
    foreground: createCache('foreground'),
    cover: createCache('cover'),
    source: createCache('source'),
  }

  isSaving = false // 是否正在保存

  componentDidMount() {
    this._initPage()
  }
  componentWillMount(){
    this.themeData.currentOriginalImageId = this.$router.params.imageId
    this.themeData.activityId= this.$router.params.activityId
  }
  onShareAppMessage(res) {
    // if (res.from === 'button') {
    //   console.log('页面按钮分享', res.target)
    // }
    this.app.aldstat.sendEvent('生成页分享', { '场景名': this.state.currentScene.sceneName, '场景Id': this.state.currentScene.sceneId })
    const { currentScene, result = {} } = this.state
    const { shareImage = {} } = result
    const shareContent =  this.themeData.originalImage.shareContent || (globalData.themeData && globalData.themeData.shareContent)
    const shareImageUrl = `${shareImage.remoteUrl}?x-oss-process=image/resize,m_pad,h_420,w_525`
    const data = {
      shareSource: shareImage.remoteUrl,
      themeId: globalData.themeId || '',
      sceneId: currentScene.sceneId || '',
      originalCompleteImageUrl:this.themeData.originalCompleteImageUrl
    }
    const path = tool.formatQueryUrl('/pages/index', data)
    const { userInfo = {} } = globalData
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
        Taro.showToast({
          title:this.themeData.originalCompleteImageUrl
        })
        console.log('分享成功')
      },
    }
  }

  _initPage = async () => {
    // this.initRawImage()
    await Session.set()
    this.initSceneData(()=>{

      // this.initCoverData()
    })
  }
  initCoverData = () => {
    console.log('ddd')
    const coverList = work.formatIcanPsCoverList(this.themeData.imageLayer)

    this.setState({
      coverList: coverList
    })
    // console.log('initCoverData cover', cover, coverList)
  }
  initImageLayer(){
    console.log(this.themeData.imageLayer)
    const { foreground} =  this.state
    this.setState({
      foreground:{
        ...foreground,
        remoteUrl:this.themeData.imageLayer[0].imageUrl
      }
    })
  }
  // 公共方法
  pageToHome = () => {
    Taro.navigateBack({ delta: 1 })
    // Taro.redirectTo({
    //   url: '/pages/browser/index'
    // })
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
      },()=>{
        if(this.state.coverList.length===0){
          this.initCoverData()
        }
        // this.initImageLayer()
      })
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
    const themeData = globalData.themeData || { originalImageList: [], }
    this.themeData.originalImage = themeData.originalImageList.filter((item)=>{
        return item.imageId === this.themeData.currentOriginalImageId
    })[0]
    console.log(this.themeData.originalImage)
    this.themeData.originalCompleteImageUrl =this.themeData.originalImage.originalCompleteImageUrl
    this.themeData.imageLayer = JSON.parse(this.themeData.originalImage.imageLayer)
    // this.themeData.imageLayer =
    this.themeData.preBackGroundList = work.getPreBgList(this.themeData.originalImage.preBackGroundList)
    const currentScene = this.themeData.preBackGroundList[0]
    this.setState({
      preBackGroundList: this.themeData.preBackGroundList,
      currentScene: {
        ...this.state.currentScene,
        ...currentScene,
        type: 'recommend'
      }
    }, () => {
      typeof callback === 'function' && callback()
    })
  }



  handleBackgroundClick = () => {
    this.setForegroundActiveStatus(false)
    this.setCoverListActiveStatus({ type: 'all' }, false)
  }
  // 自定义背景
  onCustomBgLoaded = (detail: object) => {
    if ((detail.width / detail.height) >= (1)) {
      this.setState({
        drawBoard: {
          width: '670rpx',
          height: `${detail.height * 335 / detail.width * 2}rpx`
        }
      }, () => {
        setTimeout(() => {
          this.calFrameRect()
        }, 250);
      })
    } else {
      this.setState({
        drawBoard: {
          height: '670rpx',
          width: `${detail.width * 335 / detail.height * 2}rpx`
        }
      }, () => {
        setTimeout(() => {
          this.calFrameRect()
        }, 250);
      })
    }
    // this.setStateTarget('customBg', {
    //   originWidth: width,
    //   originHeight: height
    // }, () => {
    //   this.customBgAuto()
    // })
  }
  handleBgLoaded = ({ detail }) => {
    console.log(detail)
    if ((detail.width / detail.height) >= (1)) {
      this.setState({
        drawBoard: {
          width: '670rpx',
          height: `${detail.height * 335 / detail.width * 2}rpx`
        }
      }, () => {
        setTimeout(() => {
          this.calFrameRect()
        }, 250);
      })
    } else {
      this.setState({
        drawBoard: {
          height: '670rpx',
          width: `${detail.width * 335 / detail.height * 2}rpx`
        }
      }, () => {
        setTimeout(() => {
          this.calFrameRect()
        }, 250);
      })
    }
  }
  handleChangeCustomBgStyle = (data) => {
    // console.log('handleChangeCustomBgStyle', data)
    const { frame } = this.state
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
    const { customBg } = this.state
    this.setState({
      customBg: {
        ...customBg,
        ...data
      }
    }, () => {
    })
  }
  handleCustomBgTouchstart = () => {
    // console.log('handleCustomBgTouchstart')
    this.setForegroundActiveStatus(false)
    this.setCoverListActiveStatus({ type: 'all' }, false)
  }
  handleCustomBgTouchend = () => {
    // console.log('handleCustomBgTouchend')
  }
  // 人物
  onForegroundLoaded = (detail: object, item?: any) => {
    // console.log('handleForegroundLoaded', detail, item)
    this.hideLoading()
    const { width, height } = detail
    this.setStateTarget('foreground', {
      originWidth: width,
      originHeight: height,
      loaded: true
    }, () => {
      this.foregroundAuto()
    })
  }
  handleChangeStyle = (data) => {
    const { foreground } = this.state
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
    this.setCoverListActiveStatus({ type: 'all' }, false)
  }
  handleForegroundTouchend = () => {
    this.storeForegroundInfo()
  }
  handleChooseScene = (scene) => {
    const { currentScene } = this.state
    if (currentScene.sceneId === scene.sceneId) {
      return
    }
    this.setState({
      currentScene: {
        ...currentScene,
        ...scene,
        type: 'recommend'
      },
      // coverList:[]
    }, () => {
      // console.log('handleChooseScene', this.state.currentScene)
      // this.foregroundAuto()
      // this.initCoverData()

      this.app.aldstat.sendEvent('选择场景', { '场景名': this.state.currentScene.sceneName, '场景Id': this.state.currentScene.sceneId })
    })
  }
  // 自定义场景
  handleChooseCustom = () => {
    work.chooseImage({
      onTap: (index) => {
        if (index === 0) {
          this.app.aldstat.sendEvent('自定义背景上传人像选择拍摄照片', '选择拍摄')
        } else if (index === 1) {
          this.app.aldstat.sendEvent('自定义背景上传人像选择相册照片', '选择相册')
        }
      },
      onSuccess: (path) => {
        const { currentScene } = this.state
        const customScene = {
          type: 'custom',
          bgUrl: path,
          sceneId: '',
          sceneName: '',
          shareContent: '',
          thumbnailUrl: path,
        }
        this.setState({
          currentScene: {
            ...currentScene,
            ...customScene
          },
          customBg: {
            ...this.state.customBg,
            localUrl: path
          },
          // coverList: []
        }, () => {
          // console.log('handleChooseCustom', this.state.currentScene)
        })
      }
    })
  }
  // 保存
  handleOpenResult = async () => {
    // if (!this.state.foreground.remoteUrl) {
    //   return
    // }
    if (!this.state.currentScene.bgUrl) {
      return
    }
    if (this.isSaving) {
      return
    }
    this.app.aldstat.sendEvent('保存图片或视频', { '场景名': this.state.currentScene.sceneName, '场景Id': this.state.currentScene.sceneId })
    Taro.showLoading({
      title: '照片生成中...',
      mask: true,
    })
    this.isSaving = true
    const canvasImageUrl = await this.createCanvas()

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
      try {
        await service.browser.postNewWork(this.themeData.originalCompleteImageUrl,url,'pic','这图我能p',20,this.themeData.activityId,tool.uuid(),globalData.totalUserInfo.userToken,globalData.totalUserInfo.uid)
      } catch (error) {
        console.log(error)
      }
      this.setState({
        result: {
          show: this.state.result.show,
          shareImage: {
            localUrl: canvasImageUrl,
            remoteUrl: url,
          }
        }
      },()=>{
        Taro.hideLoading()
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
  // 再玩一次
  handlePlayAgain = () => {
    this.app.aldstat.sendEvent('生成页再玩一次', '再玩一次')
    this.pageToHome()
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
    const { currentScene, frame, canvas,preBackGroundList } = this.state
    const postfix = '?x-oss-process=image/resize,h_748,w_560'
    const { ratio = 3 } = canvas
    const sceneInfo = work.getSceneInfoById(currentScene.sceneId, preBackGroundList, 'sceneId')
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
    context.drawImage(localBgImagePath, 0, 0, this.state.frame.width * ratio, this.state.frame.height * ratio)
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
    console.log(elements)
    // console.log(elements)
    // 下载成本地图片并绘制
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i]
      try {
        const localImagePath = await this.downloadRemoteImage(element.remoteUrl)
        element.localUrl = localImagePath
        console.log(element.localUrl)
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
      console.log(`draw:${localUrl} done`)
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
    this.setStateTarget('foreground', { isActive: value })
  }
  // 设置贴纸状态
  setCoverListActiveStatus = (options = {}, value = false) => {
    const { type, ids = [] } = options
    const { coverList } = this.state
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
    const { customBg, frame } = this.state
    const { originWidth = 0, originHeight = 0 } = customBg || {}
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
    console.log('loading foreground')
    const { currentScene } = this.state
    //两层结构 暂时不满足
    // const sceneId = currentScene.sceneId || 'demo_scene'
    // const cache_foreground = this.cache['foreground']
    // const scene_foreground_params = cache_foreground.get(sceneId)

    // if (scene_foreground_params) {
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
    console.log('执行size')
    const { currentScene, preBackGroundList, foreground, frame } = this.state
    const { originWidth, originHeight } = foreground
    const sceneInfo = work.getSceneInfoById(currentScene.sceneId, preBackGroundList, 'sceneId')
    const imageRatio = originWidth / originHeight
    const params = tool.JSON_parse(sceneInfo.sceneConfig)
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
  calcForegroundPosition = ({ width, height } = {}) => {
    console.log('执行position')
    const { currentScene, preBackGroundList, foreground, frame } = this.state
    const { originWidth, originHeight } = foreground
    width = width || foreground.width
    height = height || foreground.height
    const sceneInfo = work.getSceneInfoById(currentScene.sceneId, preBackGroundList, 'sceneId')

    const boxWidth = frame.width
    const boxHeight = frame.height
    const sceneConfig = tool.JSON_parse(sceneInfo.sceneConfig)
    const { position } = sceneConfig
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
    const { foreground, currentScene } = this.state
    const clone_foreground = tool.deepClone(foreground)
    clone_foreground.isActive = false
    const sceneId = currentScene.sceneId || 'demo_scene'
    this.cache['foreground'].set(sceneId, clone_foreground)
    // console.log('this.cache.foreground', this.cache['foreground'].get(sceneId))
  }
  onCoverLoaded = (detail:object, item?:any) => {
    // console.log('onCoverLoaded', detail, item)
    const {width, height} = detail
    const originInfo = {
      originWidth: width,
      originHeight: height
    }
    this.coverAuto(originInfo, item)
  }
  handleChangeCoverStyle = (data) => {
    console.log('update')
    const {id} = data
    console.log(id)
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
  // 贴纸自适应
  coverAuto = (originInfo, cover, callback?: () => void) => {
    const size = this.calcCoverSize(originInfo, cover)
    const position = this.calcCoverPosition(size, cover)
    const { coverList = [], currentScene } = this.state
    coverList.forEach((v, i) => {
      if (v.id === cover.id) {
        // 判断是否有缓存
        const cacheKey = `${currentScene.sceneId}_${v.id}`
        const cacheRes = this.cache['cover'].get(cacheKey)
        if (cacheRes) {
          coverList[i] = cacheRes
        } else {
          coverList[i] = { ...v, ...size, ...position }
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
    const { originWidth, originHeight } = originInfo
    const { frame } = this.state
    const coverInfo = work.getCoverInfoById(cover.id, this.state.coverList, 'id')
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
    const { width = 0, height = 0 } = size
    const { frame } = this.state
    const coverInfo = work.getCoverInfoById(cover.id, this.state.coverList, 'id')
    const { position, rotate = 0 } = coverInfo
    const boxWidth = frame.width
    const boxHeight = frame.height

    const type = position || '0'
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
    const { currentScene } = this.state
    const clone_cover = tool.deepClone(sticker)
    // 贴纸存储不激活状态
    clone_cover.isActive = false
    const sceneId = currentScene.sceneId || 'demo_scene'
    const cacheKey = `${sceneId}_${sticker.id}`
    this.cache['cover'].set(cacheKey, clone_cover)
  }
  changeOriginalImage= (item)=>{

    console.log(item)
    const {id} = item
    const {coverList} = this.state
    coverList.forEach((v, i) => {
      if (v.id === id) {
        coverList[i] = {
          ...v,
          deleted: !item.deleted,
          visible: !item.visible
        }
      }
    })
    this.setState({
      coverList: coverList
    })
  }
  render() {
    const { loading, rawImage, frame, customBg, foreground, coverList, preBackGroundList, currentScene, result, canvas } = this.state
    return (
      <View className='page-editor'>
        <Title
          color="#333"
          leftStyleObj={{ left: Taro.pxTransform(8) }}
          renderLeft={
            <CustomIcon type="back" theme="dark" onClick={this.pageToHome} />
          }
        >马卡龙玩图</Title>
        <View className="main">
          <View className="pic-section">
            {/* <View className={`raw ${(foreground.remoteUrl && foreground.loaded) ? 'hidden' : ''}`} style={{ width: this.state.drawBoard.width, height: this.state.drawBoard.height }}>
              <Image src={rawImage.localUrl} style="width:100%;height:100%" mode="aspectFit" />
            </View> */}
            <View style={{ width: this.state.drawBoard.width, height: this.state.drawBoard.height }} className={`crop`} id="crop">
              {currentScene.type === 'recommend' &&
                <View className="background-image">
                  <Image
                    src={currentScene.bgUrl}
                    style="width:100%;height:100%"
                    mode="scaleToFill"
                    onLoad={this.handleBgLoaded}
                    onClick={this.handleBackgroundClick}
                  />
                </View>
              }
              {currentScene.type === 'custom' &&
                <NewCustomBg
                  framePrams={frame}
                  stylePrams={customBg}
                  url={customBg.localUrl}
                  onImageLoaded={this.onCustomBgLoaded}
                />
              }
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
            </View>
          </View>
          <MarginTopWrap config={{ large: 60, small: 40, default: 20 }}>
          <View style='width:720rpx;margin-right:-60rpx'>
            <ScrollView className='toolWrap' scrollX>
              {this.state.coverList.map((item)=>{
                return (<Button onClick={()=>this.changeOriginalImage(item)} className={`toolButton ${item.visible===true?'active':''}`}>{item.name}</Button>)
              })}
            </ScrollView>
          </View>
          </MarginTopWrap>

          <MarginTopWrap config={{ large: 60, small: 40, default: 20 }}>
            <SceneList
              list={preBackGroundList}
              customable={true}
              currentScene={currentScene}
              styleObj={{ width: '720rpx', marginRight: '-60rpx' }}
              onCustomClick={this.handleChooseCustom}
              onClick={this.handleChooseScene}
            />
          </MarginTopWrap>
          <MarginTopWrap config={{ large: 60, small: 40, default: 20 }}>
            <Button className="custom-button pink" hoverClass="btn-hover" onClick={this.handleOpenResult}>完成</Button>
          </MarginTopWrap>
        </View>
        <View class="canvas-wrap">
          <Canvas
            disable-scroll={true}
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
            cropHeight={this.state.drawBoard.height}
            cropWidth={this.state.drawBoard.width}
            renderButton={
              <View className="btn-wrap">
                <Button className="custom-button pink btn-1" hoverClass="btn-hover" openType="share" >分享给好友</Button>
                <Button className="custom-button dark btn-2" hoverClass="btn-hover" onClick={this.handlePlayAgain}>再玩一次</Button>
              </View>
            }
          />
        }
      </View>
    )
  }
}

export default Editor as ComponentClass<PageOwnProps, PageState>


