
import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Form, Button, Image, Video, Canvas } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import originalImageIcon from '@/assets/images/originalImage@2x.png'
import Title from '@/components/Title'
import CustomIcon from '@/components/Icon'
import RecommendList from '@/components/RecommendList'
import MorePlayList from '@/components/MorePlayList'
import AuthModal from '@/components/AuthModal'
import BackApp from '@/components/BackApp'
import { appConfig } from '@/services/config'
import Session from '@/services/session'
import service from '@/services/service'
import globalData from '@/services/global_data'
import tool from '@/utils/tool'
import work from '@/utils/work'
import './index.less'

// import ShareDialog from '@/components/ShareDialog'
import like from '@/assets/images/like@3x.png'
import liked from '@/assets/images/liked@3x.png'
import wx from '@/assets/images/wxicon@3x.png'
import pyq from '@/assets/images/pyq@3x.png'
import userImage from '@/assets/images/logo@2x.png'
import titleImage from '@/assets/images/pic_mkl@3x.png'
import image_code from '@/assets/images/code.png'

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
  userInfo:{}
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
    confirmText: '好的，收下了',
    saveTitle: '图片已保存到手机相册',
    savePoint: false,
    type: 'image',
    frame: {
      width: 278,
      height: 429,
      left: 0,
      top: 0,
    } ,
    canvasInfo: {
      width: 278,
      height: 429,
      left: 0,
      top: 0,
    },
    canvas: {
      id: 'shareCanvas',
      ratio: 3
    },
    checkoutImage: '长按识别二维码查看',
    checkoutVideo: '长按识别二维码播放视频',
    logoName: 'Makaron',
    user: {
      userImage: '',
      userName: '',
      likeNumber: 0,
      uid: '',
      worksId: '194770944672976896',
      liked: 0,
      templateCode: '',
      shareSource:'',
      userToken: ''
    },
    currentScene: {
      bgUrl: 'https://static01.versa-ai.com/upload/e5a9c1751c84/1222ad34-a1f7-4720-a223-43aa29936087.jpg',
      desc: '@叶小明的作品',
      title: '皮皮虾  骑上你  我们走'
    },
    logoRect: {
      width: 300,
      height: 50,
      left: 0,
      top: 0,
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
  }

  componentDidMount() {
    this.getRecommendList()
    this._initPage()
    this.singleWorkList()
    // Taro.showToast({
    //   title:this.$router.params.originalCompleteImageUrl
    // })
  }

  singleWorkList = async () => {
    const singleWorkData = await service.share.singleWorkList(this.state.user.worksId)
    console.log('singleWorkData', singleWorkData)
    if (singleWorkData.status === 'success') {
      const data = singleWorkData.result.result
      this.setState({
        user: {
          userImage: data.author.avatar,
          userName: data.author.nickname,
          likeNumber: data.likedAmount,
          uid: data.uid,
          worksId: data.worksId,
          liked: data.liked,
          shareSource : data.renderPictureInfo.url,
        }
      })
    }

  }
  componentWillReceiveProps(nextProps) {
    // console.log(this.props, nextProps)
  }
  componentWillUnmount() { }
  componentDidShow() { }
  componentDidHide() { }
  onShareAppMessage(res) {
    const shareContent = ''
    const url = `${this.state.user.worksId}?x-oss-process=image/resize,m_pad,h_420,w_525`
    console.log(22,url)
    const { userInfo = {} } = globalData
    const title = `@${userInfo.nickName}：${shareContent}` || `@${this.state.user.userName}：${shareContent}`
    const path = `/pages/index?worksId=${this.state.user.worksId}`
    return {
      title: title,
      path: path,
      imageUrl: url,
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
    let isFromApp, shareSourceType = 'image', videoPoster = '', shareVideoInfo = { width: 690, height: 920, }
    let { shareSource, themeId, sceneId, from, remoteURL = '', width = 690, height = 920, originalCompleteImageUrl } = this.$router.params
    console.log(345,sceneId)
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
    console.log(123,globalData)
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
    if (this.state.user.templateCode !== '') {
      const hotData = await service.share.getHotList(this.state.user.templateCode)
      console.log('hotData', hotData)
      this.setState({
        recommendList: (hotData.result && hotData.result.result) || []
      })
    } else {
      const recommendData = await service.share.getrecommendList(6)
      console.log('recommendData', recommendData)
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
        if (sceneId) {
          url = url + '?sceneId=' + sceneId
        }
        console.log(url)
        Taro.navigateTo({url})
      }
    })
  }
  handleRecommendClick =  (data) => {
    console.log('data',data)
    this.setState({
      user: {
        userImage: data.author.avatar,
        userName: data.author.nickname,
        likeNumber: data.likedAmount,
        uid: data.uid,
        worksId: data.worksId,
        liked: data.liked,
        shareSource : data.renderPictureInfo.url,
      }
    }, () => {this.singleWorkList()})
    
    // this.singleWorkList()
    // this.onLoad()
  }

  onLoad = async() => {
    const page = 'pages/index'
    const width = 100
    const worksId = this.state.user.worksId
    console.log(999,this.state.user)
    const scene = await service.share.getQrCode(page, width, worksId)
    console.log(23,scene)
    this.setState({
      qrCode: scene.result
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
      
      console.log(result)
      this.userInfo = result.result.result
      if (this.state.user.liked === 0) {
        this.addLike(this.userInfo)
      } else {
        this.deleteLike(this.userInfo)
      }
    } else {
      Taro.showToast({
        title: '请授权',
        icon: 'success',
        duration: 2000
      })
    }

  }
  shareHandle =  () => {
    this.setState({
      isshow: true
    })
  }
  handelSave = () => {
    this.setState({
      isshow: false,
      savePoint: false
    })
  }

  downloadRemoteImage = async (remoteUrl = '') => {
    console.log('456',remoteUrl)
    let localImagePath = ''
    try {
      console.log(678)
      const result = await service.base.downloadFile(remoteUrl)
      console.log('result',result)
      localImagePath = result.tempFilePath
    } catch (err) {
      // console.log('下载图片失败', err)
    }
    // }
    console.log(333,localImagePath)
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
    const { frame, canvas, user} = this.state
    const postfix = '?x-oss-process=image/resize,h_748,w_560'
    const { ratio = 3 } = canvas
    let localBgImagePath = ''
    try {
      const bgUrl = user.shareSource + postfix
      console.log('bgUrl',bgUrl)
      localBgImagePath = await this.downloadRemoteImage(bgUrl)
      console.log('bgImage',localBgImagePath)
    } catch (err) {
      console.log('下载背景图片失败', err)
      return
    }
    //防止锯齿，绘的图片是所需图片的3倍
    const codeWidth = frame.width * ratio - 20 * ratio 
    const codeHeight = frame.height * ratio - 84 * ratio
    context.drawImage(localBgImagePath, 10 * ratio, 10 * ratio, codeWidth, codeHeight)
    // 绘制元素
    // await this.canvasDrawElement(context, ratio)
    this.canvasDrawLogo(context, ratio)
  }

  // 绘制二维码和logo
  canvasDrawLogo = (context, ratio) => {
    const { frame } = this.state
    const codeWidth = 42 * ratio
    const codeHeight = 43 * ratio
    const codeLeft = 226 * ratio
    const codeTop = 365 * ratio
    context.save()
    context.drawImage(image_code, codeLeft, codeTop, codeWidth, codeHeight)
    context.restore()
    context.stroke()


    const logoWidth = 38 * ratio
    const logoHeight = 38 * ratio
    const logoLeft = 10 * ratio 
    const logoTop = 375 * ratio
    context.save()
    context.drawImage(userImage, logoLeft, logoTop, logoWidth, logoHeight)
    context.restore()
    context.stroke()

    context.font = "30px 'PingFangSC-Medium'";
    context.fillStyle = "#333333";
    // 设置水平对齐方式
    context.textAlign = "center";
    // 设置垂直对齐方式
    context.textBaseline = "middle";
    // 绘制文字（参数：要写的字，x坐标，y坐标）
    const userName =this.state.user.userName
    console.log('userName',userName)
    context.fillText('@userName的作品',  frame.width * ratio / 3, 388 * ratio, 103 * ratio, 21 * ratio)
    // context.fillText(this.state.checkoutImage, 56, 405)
    this.canvasDrawText(context, ratio)
  }
  canvasDrawText = (context, ratio) => {
    const { frame } = this.state
    context.font = "24px 'PingFangSC-Medium'"
    context.fillStyle = "#999999"
    context.fillText(this.state.checkoutImage, frame.width * ratio / 3, 405 * ratio)
    this.canvasDrawLogoText(context, ratio)
  }

  canvasDrawLogoText = (context, ratio) => {
    const { frame } = this.state
    context.font = "25px bold '黑体'"
    context.fillStyle = "#000000"
    context.fillText(this.state.logoName, frame.width * ratio - 96, 412 * ratio, 42 * ratio, 9  * ratio)
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
    if (this.state.type === 'image') {
      // 保存图片到相册
      work.saveSourceToPhotosAlbum({
        location: 'local',
        sourceUrl: canvasImageUrl,
        sourceType: 'image',
        onSuccess: () => {
          console.log(11111)
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
    } else {
      work.saveSourceToPhotosAlbum({
        location: 'local',
        sourceUrl: canvasImageUrl,
        sourceType: 'video',
        onSuccess: () => {
          Taro.hideLoading()           
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
          Taro.authModal({
            open: true
          })
          this.setResultModalStatus(false)
        },
        onFail: () => {
          Taro.hideLoading()
          Taro.showToast({
            title: '保存失败!',
            icon: 'success',
            duration: 2000
          })
        }
      })
    }
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
      console.log(789,data)
      const addLiked = await service.share.addLikeWork(this.state.user.worksId,data.uid,data.userToken)
      console.log('234',addLiked)
      const worksId = this.state.user.worksId
        if (addLiked.status === 'success') {
          const likedNum = this.state.user.likeNumber + 1
          this.setState({
            user: {
              liked: 1,
              likeNumber : likedNum,
              worksId: worksId
            }
          },()=>{this.singleWorkList()})
        }
        console.log(2,this.state.user.liked)
    } catch (error) {
      console.log(error)
    }
  }

  deleteLike = async (data) => {
    try {
      console.log('567',data)
      const cancelLiked = await service.share.deleteLike(this.state.user.worksId,data.uid,data.userToken)
      console.log('234',cancelLiked)
      if (cancelLiked.status === 'success') {
        const likeNum = this.state.user.likeNumber - 1
        this.setState({
          user: {
            liked: 0,
            likeNumber : likeNum
          }
        },()=>{this.singleWorkList()})
      }
      console.log(2,this.state.user.liked)
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    const { isFromApp, shareSourceType, shareSource, videoPoster, width, height, recommendList, originalCompleteImageUrl, canvasInfo, confirmText, isshow, savePoint, 
      saveTitle, type, checkoutImage, checkoutVideo, morePlayList, user, qrCode, frame, canvas} = this.state
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
          {shareSourceType === 'image' &&
            <View>
              {themeData.sceneType === 3 && <View class="share-bg"></View>}
              <View className="showImage">
                <View className="showImage blur" style={{backgroundImage: `url(${user.shareSource})`}}></View>
                <Image src={user.shareSource} mode="aspectFill"  className="bgImage" />
              </View>
            </View>
          }
          {shareSourceType === 'video' &&
            <View className='video-wrap showImage'>
              <Video
                className="video bgImage"
                // style={{ width: Taro.pxTransform(width), height: Taro.pxTransform(height - 2) }}
                loop
                autoplay
                src={shareSource}
                poster={videoPoster}
                objectFit='cover'
                controls
              ></Video>
            </View>
          }
          {
            isFromApp ? <View className="app"><Image className="goApp" src={titleImage}/><View className="toApp">去往APP</View> </View>: ''
          }
          <View className="userMessage">
            {
              user.userImage ? <Image className="user" src={user.userImage} /> : <Image className="user" src={titleImage} />
            }
            
            <View className='userName'>{user.userName}</View>
            {            
              <Button openType="getUserInfo" onGetUserInfo={this.getUserInfo}  className="likeAuth like">
                { user.liked === 0 ? <Image src={like}  className="like" /> : <Image src={liked}  className="like" />}
              </Button>               
            }
            <View style="" className="likeNum">{user.likeNumber}</View>
            <Button openType="share" className="share wx">
              <Image src={wx} className="wx"/>
            </Button>
            <Image src={pyq} onClick={this.shareHandle} className="pyq"/>
          </View>
          {
            isshow === true ?
            <View className="wx_dialog_container">           
              <View className="wx-mask"></View>
              <View className="wx-dialog">
                {savePoint === true ? <View className="wx-dialog-save">{saveTitle}</View> : <View className="wx-dialog-save"></View>}
                <View className="wx-dialog-content">
                    <View className="bgUrl">
                      <Image src={user.shareSource} className="bgUrl" mode="aspectFill" onClick={this.handelConfirm}/>
                    </View>
                    <View className="userInfo">
                      <Image className="userimage" src={user.userImage} />
                      <View className="username">
                        <View className="userwork"><View className="name">@{user.userName}</View>的作品</View>
                        {
                          type === 'image' ? <View className="seetwo">{checkoutImage}</View> : <View className="seetwo">{checkoutVideo}</View>
                        }
                      </View>
                      <View className="two">
                        <Image className="twoCode" src={qrCode} />
                        <View className="logo">Makaron</View>
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
                {isFromApp ?
                  <Button
                    className="custom-button pink"
                    hoverClass="btnhover"
                    onClick={this.pageToHome}
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
          <View className='recommend-wrap'>
            <View className='recommend-title'>热门作品</View>
            <RecommendList
              list={recommendList}
              onClick={this.handleRecommendClick}
            />
          </View>
          <View className='recommend-wrap'>
            <View className='recommend-title'>更多好玩</View>
            <MorePlayList
              list={morePlayList}
              onClick={this.handlePlayClick}
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
