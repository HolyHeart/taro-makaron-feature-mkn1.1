import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Form, Button, Image, Video } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import Title from '@/components/Title'
import CustomIcon from '@/components/Icon'
import RecommendList from '@/components/RecommendList'
import AuthModal from '@/components/AuthModal'
import { appConfig } from '@/services/config'
import Session from '@/services/session'
import service from '@/services/service'
import globalData from '@/services/global_data'
import tool from '@/utils/tool'
import './index.less'

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
    navigationBarTitleText: '马卡龙玩图'
  }

  state = {
    showAuth: false,
    isFromApp: false,
    shareSourceType: 'image', // 'video' 'image'
    shareSource: '',
    videoPoster: '',
    width: 690,
    height: 920,
    recommendList: [],
    themeId: '',
    sceneId: '',
    themeData: {},
  }
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
    const themeData = globalData.themeData || {generalShowUrl: '', shareContent: ''}
    const shareContent = themeData.shareContent || ''
    const url = themeData.generalShowUrl
    return {
      title: shareContent,
      path: '/pages/home/index',
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
        themeData
      })
    })
    this.getRecommendList()
  }

  processLoadData = () => {
    console.log('share page', this.$router.params) // 输出 { id: 2, type: 'test' }
    let isFromApp, shareSourceType = 'image', videoPoster = '', shareVideoInfo = {width: 690, height: 920,}
    let {shareSource, themeId, sceneId, from, remoteURL = '', width = 690, height = 920} = this.$router.params
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
    })
  }

  getRecommendList = async () => {
    const recommendData = await service.core.recommend()
    // console.log('recommendData', recommendData.result.result)
    this.setState({
      recommendList: (recommendData.result && recommendData.result.result) || []
    })
  }

  getThemeData = async (callback?:(data?)=>void) => {
    if (!globalData.themeId) {
      return
    }
    const themeId = globalData.themeId || ''
    const themeData = await service.core.theme(themeId)
    globalData.themeData = themeData.result.result
    typeof callback === 'function' && callback(themeData.result.result)
  }

  pageToHome = () => {
    Taro.redirectTo({
      url: '/pages/home/index'
    })
  }

  handleGetUserInfo = (e) => {
    // console.log('handleGetUserInfo', e)
    const {detail: {userInfo}} = e   
    if (userInfo) {
      globalData.userInfo = userInfo      
      this.todo()
    } else {
      Taro.showToast({
        title: '请授权',
        icon: 'success',
        duration: 2000
      })
    }
  }
  todo = () => {
    this.showActionSheet((path)=>{      
      globalData.choosedImage = path
      // console.log('choosedImage', path, globalData)
      const { themeData = {}, sceneId } = globalData      
      let url = ''
      if (themeData.sceneType === 1) {
        url = '/pages/filter/index'
      } else if (themeData.sceneType === 2) {
        url = '/pages/dynamic/index'
      } else if (themeData.sceneType === 3) {
        url = '/pages/segment/index'
      } else {
        url = '/pages/editor/index'
      }
      if (sceneId) {
        url = url + '?sceneId=' + sceneId
      }        
      Taro.redirectTo({url})         
    })
  }
  showActionSheet = async (callback) => {
    const _this = this
    Taro.showActionSheet({
      itemList: [
        '拍摄人像照',
        '从相册选择带有人像的照片',
      ],
      success: function ({tapIndex}) {
        if (tapIndex === 0) {
          Taro.authorize({
            scope: "scope.camera",
          }).then(res => {
            // console.log('res', res)
            Taro.chooseImage({
              count: 1,
              sourceType: ['camera'],
              sizeType: ['compressed '],
            }).then(({tempFilePaths: [path]}) => {
              typeof callback === 'function' && callback(path)
            })
          }, err => {
            console.log('authorize err', err)
            Taro.getSetting().then(authSetting => {
              if (authSetting['scope.camera']) {
              } else {
                Taro.showModal({
                  title: '拍摄图片需要授权',
                  content: '拍摄图片需要授权\n可以授权吗？',
                  confirmText: "允许",
                  cancelText: "拒绝",                      
                }).then(res => {     
                  if (res.confirm) {
                    _this.showAuthModal(true)
                  }
                })
              }                
            })
          })
        } else if (tapIndex === 1) { 
          Taro.chooseImage({
            count: 1,
            sourceType: ['album'],
          }).then(({tempFilePaths: [path]}) => {
            typeof callback === 'function' && callback(path)
          })
        }		
      }
    }).catch(err => console.log(err))
  }
  showAuthModal = (flag = false) => {
    this.setState({
      showAuth: flag
    })
  }
  closeAuthModal = () => {
    this.setState({
      showAuth: false
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
  }
  handleFormSubmit = (e) => {
    // console.log('handleFormSubmit', e)
    const {detail: {formId}} = e
    if (formId) {
      service.core.reportFormId(formId)
    }
  }

  render () {
    const {shareSourceType, shareSource, videoPoster, width, height, recommendList, showAuth} = this.state
    return (
      <View className='page-share'>
        <Title
          leftStyleObj={{left: Taro.pxTransform(12)}}
          renderLeft={
            <CustomIcon type="home" theme="dark" onClick={this.pageToHome}/>
          }
          color='#333'
        >马卡龙玩图</Title>
        <View className='main-section'>
          {shareSourceType === 'image' && 
            <View className='pic-wrap'>              
              {themeData.sceneType === 3 && <View class="share-bg"></View>}
              <View class="share-img">
                <Image src={shareSource} style='width: 100%; height: 100%' mode='scaleToFill'/>      
              </View>
            </View>
          }
          {shareSourceType === 'video' && 
            <View className='video-wrap'>
              <Video
                className="video"
                style={{width: Taro.pxTransform(width), height:Taro.pxTransform(height - 2)}}
                loop
                autoplay
                src={shareSource}
                poster={videoPoster}
                objectFit='cover'
                controls
              ></Video>            
            </View>
          }          
        </View>
        <View className='sub-section'>
          <Form onSubmit={this.handleFormSubmit} reportSubmit>
            <Button
              className="button animation-btn" 
              hoverClass="btnhover"
              openType="getUserInfo" 
              onGetUserInfo={this.handleGetUserInfo}
              formType='submit'>限时用同款</Button>
          </Form>    
          <View className='recommend-wrap'>
            <View className='recommend-title'>你还可以玩：</View>
            <RecommendList 
              list={recommendList} 
              onGetUserInfo={this.handleGetUserInfo} 
              onFormSubmit={this.handleFormSubmit}
              onClick={this.handleRecommendClick}
            />
          </View>      
        </View> 
        {showAuth && <AuthModal onClick={this.closeAuthModal}/>}       
      </View>
    )
  }
}

export default Share as ComponentClass<PageOwnProps, PageState>