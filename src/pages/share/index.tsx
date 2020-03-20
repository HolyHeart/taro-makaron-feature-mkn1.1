
import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Form, Button, Image, Video, Canvas } from '@tarojs/components'
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

// import ShareDialog from '@/components/ShareDialog'
import like from '@/assets/images/like@3x.png'
import wx from '@/assets/images/wxicon@3x.png'
import pyq from '@/assets/images/pyq@3x.png'
import userImage from '@/assets/images/logo@2x.png'
// import bgImage from '@/assets/images/random-bg.png'
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
    saveTitle:'图片已保存到手机相册',
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
    source: 'https://static01.versa-ai.com/upload/e5a9c1751c84/1222ad34-a1f7-4720-a223-43aa29936087.jpg',
    coverList: [],
    currentScene: {
      bgUrl: 'https://static01.versa-ai.com/upload/e5a9c1751c84/1222ad34-a1f7-4720-a223-43aa29936087.jpg',
      desc: '@叶小明的作品',
      title: '皮皮虾  骑上你  我们走',
      coverList: [
        {
          "id": 1581308296098,
          "imageUrl": "",
          "zIndex": 3,
          "fixed": false,
          "isActive": true,
          "size": {
            "default": 0.28,
            "zoomInMax": 1,
            "zoomOutMin": 1
          },
          "rotate": 0,
          "position": {
            "place": "10",
            "xAxis": {
              "derection": "left",
              "offset": 0.52
            },
            "yAxis": {
              "derection": "top",
              "offset": 0.26
            }
          }
        },
        {
          "id": 1581308296093,
          "imageUrl": "",
          "zIndex": 3,
          "fixed": false,
          "isActive": true,
          "size": {
            "default": 0.25,
            "zoomInMax": 1,
            "zoomOutMin": 1
          },
          "rotate": 0,
          "position": {
            "place": "10",
            "xAxis": {
              "derection": "left",
              "offset": 0.3
            },
            "yAxis": {
              "derection": "top",
              "offset": 0.4
            }
          }
        },

      ],
    },
    logoRect: {
      width: 300,
      height: 50,
      left: 0,
      top: 0,
    },

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
    const shareContent = ''
    const url = `${this.state.shareSource}?x-oss-process=image/resize,m_pad,h_420,w_525`
    console.log(22,url)
    const { userInfo = {} } = globalData
    const title = `@${userInfo.nickName}：${shareContent}`
    const path = `/pages/share/index?shareSource=${this.state.shareSource}`
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
  shareHandle =  () => {
    this.setState({
      isshow: true
    })
    this.handelConfirm()
  }
  handelSave = () => {
    this.setState({
      isshow: false
    })
  }

  downloadRemoteImage = async (remoteUrl = '') => {
    let localImagePath = ''
    try {
      const result = await service.base.downloadFile(remoteUrl)
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
    const { frame, canvas, source } = this.state
    const postfix = '?x-oss-process=image/resize,h_748,w_560'
    const { ratio = 3 } = canvas
    let localBgImagePath = ''
    try {
      const bgUrl = source + postfix
      localBgImagePath = await this.downloadRemoteImage(bgUrl)
    } catch (err) {
      console.log('下载背景图片失败', err)
      return
    }
    //防止锯齿，绘的图片是所需图片的3倍
    context.drawImage(localBgImagePath, 10, 10, 258 , 345)
    // 绘制元素
    // await this.canvasDrawElement(context, ratio)
    this.canvasDrawLogo(context, ratio)
  }

  // 绘制贴纸，文字，覆盖层所有元素
  // canvasDrawElement = async (context, ratio) => {
  //   const { currentScene, frame, canvas} = this.state
  //   // 收集所有元素进行排序
  //   const coverList = work.formatRawCoverList(currentScene.coverList)
  //   this.setState({
  //     coverList: coverList
  //   })
  //   let elements: Array<any> = []
  //   // 收集贴纸
  //   coverList.filter(v => !v.deleted).forEach(v => {
  //     const element_cover = {
  //       type: 'cover',
  //       zIndex: v.zIndex,
  //       id: v.id,
  //       remoteUrl: v.remoteUrl,
  //       width: v.width * ratio,
  //       height: v.height * ratio,
  //       x: v.x * ratio,
  //       y: v.y * ratio,
  //       rotate: v.rotate,
  //     }
  //     elements.push(element_cover)
  //   })
  //   // 对元素进行排序
  //   elements.sort((a, b) => {
  //     return a.zIndex - b.zIndex
  //   })

  //   // 下载成本地图片并绘制
  //   for (let i = 0; i < elements.length; i++) {
  //     const element = elements[i]
  //     console.log(555,element)
  //     try {
  //       const localImagePath = await this.downloadRemoteImage(element.remoteUrl)
  //       console.log(999,localImagePath)
  //       element.localUrl = localImagePath
  //       drawElement(element)
  //     } catch (err) {
  //       console.log('下载贴纸图片失败', err)
  //       continue
  //     }
  //   }
  //   // console.log('elements', elements)
  //   function drawElement({ localUrl, width, height, x, y, rotate }) {
  //     console.log(888,{ localUrl, width, height, x, y, rotate })
  //     context.save()
  //     context.translate(x + 0.5 * width, y + 0.5 * height)
  //     context.rotate(rotate * Math.PI / 180)
  //     context.drawImage(localUrl, -0.5 * width, -0.5 * height, width, height)
  //     context.restore()
  //     context.stroke()
  //   }
  // }

  // 绘制二维码和logo
  canvasDrawLogo = (context, ratio) => {
    console.log(1236,context)
    console.log(1237,ratio)
    // const { frame } = this.state
    // console.log('frame',frame)
    // const codeWidth = 67.5 * 1.5
    // const codeHeight = 67.5 * 1.5
    // const codeLeft = frame.width * ratio - codeWidth - 15
    // const codeTop = frame.height * ratio - codeHeight - 15
    context.save()
    // context.drawImage(image_code, codeLeft, codeTop, codeWidth, codeHeight)
    context.drawImage(image_code, 226, 365, 42, 43 )
    context.restore()
    context.stroke()

    context.save()
    context.drawImage(userImage, 10, 371, 38, 38 )
    context.restore()
    context.stroke()

    // const logoWidth = 197 * 1.5
    // const logoHeight = 20 * 1.5
    // const logoLeft = frame.width * ratio * 0.5 - logoWidth * 0.5
    // const logoTop = frame.height * ratio - logoHeight - 8
    // context.save()
    // context.drawImage(userImage, logoLeft, logoTop, logoWidth, logoHeight)
    // context.restore()
    // context.stroke()
    context.font = "15px 'PingFangSC-Medium'";
    context.fillStyle = "#333333";
    // // 设置水平对齐方式
    // context.textAlign = "center";
    // // 设置垂直对齐方式
    // context.textBaseline = "middle";
    // 绘制文字（参数：要写的字，x坐标，y坐标）
    context.fillText(this.state.currentScene.desc, 56, 388)
    // context.fillText(this.state.checkoutImage, 56, 405)
    this.canvasDrawText(context, ratio)
  }
  canvasDrawText = (context, ratio) => {
    context.font = "12px 'PingFangSC-Medium'"
    context.fillStyle = "#999999"
    context.fillText(this.state.checkoutImage, 56, 405)
    this.canvasDrawLogoText(context, ratio)
  }

  canvasDrawLogoText = (context, ratio) => {
    context.font = "10px 'PingFangSC-Medium'"
    context.fillStyle = "#000000"
    context.fillText(this.state.logoName, 227, 415)
  }

  handelConfirm = async () => {
    // 保存图片到相册
    const canvasImageUrl = await this.createCanvas()
    console.log(666,canvasImageUrl)
    // if (this.state.type === 'image') {
      work.saveSourceToPhotosAlbum({
        location: 'remote',
        sourceUrl: 'canvasImageUrl',
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
    // } else {
    //   work.saveSourceToPhotosAlbum({
    //     location: 'remote',
    //     sourceUrl: canvasImageUrl,
    //     sourceType: 'video',
    //     onSuccess: () => {
    //       Taro.hideLoading()           
    //       Taro.showToast({
    //         title: '保存成功!',
    //         icon: 'success',
    //         duration: 2000
    //       })
    //       this.state.savePoint = true
    //     },
    //     onAuthFail: () => {
    //       Taro.authModal({
    //         open: true
    //       })
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

  render() {
    const { isFromApp, shareSourceType, shareSource, videoPoster, width, height, recommendList, originalCompleteImageUrl, canvasInfo, confirmText, isshow, savePoint, 
      saveTitle, source, type, currentScene, checkoutImage, checkoutVideo} = this.state
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
              {/* <View className="showImage">
                <View className="showImage blur" style='background:url(https://static01.versa-ai.com/upload/603758b1f31f/b56d56d8-743c-4af9-8b3b-7f38644628b4.jpg);' ></View>
                <Image src={shareSource} mode='aspectFill' className="bgImage" />
                <Image src={originalCompleteImageUrl}  mode='aspectFill' className="bgImage"/>
              </View> */}
              <View className="showImage">
                <View className="showImage blur" style='background:url(https://static01.versa-ai.com/upload/603758b1f31f/b56d56d8-743c-4af9-8b3b-7f38644628b4.jpg);'></View>
                <Image src={source} className="bgImage" mode="aspectFill"/>
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
            <Image src={pyq} onClick={this.shareHandle} className="pyq"/>
            {/* <Image src={pyq} onClick={this.handleOpenResult} className="pyq"/> */}
          </View>
          {/* {
            isshow === true ?
            <View className="wx_dialog_container">           
              <View className="wx-mask"></View>
              <View className="wx-dialog">
                {savePoint === true ? <View className="wx-dialog-save">{saveTitle}</View> : <View className="wx-dialog-save"></View>}
                <View className="wx-dialog-content">
                    <View className="bgImage">
                      <Image src={source} className="bgImage" mode="aspectFill"/>
                    </View>
                    <View className="userInfo">
                      <Image className="userimage" src={userImage} />
                      <View className="username">
                        <View className="userwork">{currentScene.desc}</View>
                        {
                          type === 'image' ? <View className="seetwo">{checkoutImage}</View> : <View className="seetwo">{checkoutVIdeo}</View>
                        }
                      </View>
                      <View className="two">
                        <Image className="twoCode" src={image_code} />
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
          } */}
          {
            isshow === true ?
            <View className="canvas-wrap">
              <View className="wx-mask"></View>
              <View className="wx-dialog">
                {savePoint === true ? <View className="wx-dialog-save">{saveTitle}</View> : <View className="wx-dialog-save"></View>}
                <Canvas
                  // disable-scroll={true}
                  onClick={this.handelConfirm}
                  // style={`width: ${canvasInfo.width * canvas.ratio}px; height: ${canvasInfo.height * canvas.ratio}px;`}
                  className="wx-dialog-content"
                  canvasId={canvas.id} />
                <View className="wx-dialog-footer">
                  <Button className="wx-dialog-btn" onClick={this.handelSave}  style="flex:1" >
                      {confirmText}
                  </Button>
                </View>
              </View>
            </View>
           : ''
          } 

          {/* {
            this.state.isshow === true ?
            <ShareDialog
            confirmText={this.state.confirmText}
            content={bgImage}
            type={shareSourceType}
            renderButton ={
              <View className="wx-dialog-footer">
                <Button className="wx-dialog-btn" onClick={this.handelSave}  style="flex:1" >
                    {this.state.confirmText}
                </Button>
                
              </View>
            }
            />
            : ''
          } */}
        </View>
        {/* <View className='sub-section'>
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
        {isFromApp && <BackApp onClick={this.handleOpenApp} />} */}
        <AuthModal />
      </View>
    )
  }
}

export default Share as ComponentClass<PageOwnProps, PageState>
