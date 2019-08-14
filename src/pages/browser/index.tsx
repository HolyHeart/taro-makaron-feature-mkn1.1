import { ComponentClass } from 'react'
import Taro, { Component, Config, navigateBackMiniProgram } from '@tarojs/taro'
import { View, Button, Image, ScrollView, Text } from '@tarojs/components'
import Title from '@/components/Title'
import CustomIcon from '@/components/Icon'
import './index.less'
import globalData from "@/services/global_data"



import service,{ browser, base } from '@/services/service'
import Loading from '@/components/Loading'

import tool from '@/utils/tool'


type PageOwnProps = {}

type PageState = {}

class Browser extends Component {

  config: Config = {
    navigationBarTitleText: '这图我能P',
    disableScroll: false,
    enablePullDownRefresh: false
  }

  activityId = 0
  themeId = ''
  activityImgId = ''

  activityImgWidthL = 240
  activityImgWidthS = 120

  state = {
    navScrollHeight: '',
    navScrollHeight_higher: '',
    currentActivityID: '',

    currentActivityImgID: '',

    waterfallLoaded: false,
    activityId: 0,
    showPic: false,
    currentPicOnMask: '',
    loading: false,


    //loadMoreWorks: false,

    currentPage: 1,
    bottomTip: '加载中...',

    waterfallTopMargin: '',
    titleAndNavHeight: '',

    shareImgSpecific: '',

    activityName: '',

  }

  onShareAppMessage (res) {
    const {userInfo = {}} = globalData
    console.log('username: ', userInfo.nickName)
    var content = ''
    // if(userInfo.nickName){
    //   content = `@${userInfo.nickName}：${globalData.themeData.shareContent}`
    // }
    // content = `@${userInfo.nickName}：${globalData.themeData.shareContent}`
    const originalImage = globalData.themeData.originalImageList.filter((item)=>{
      return item.imageId == this.state.currentActivityImgID
    })
    if(originalImage.length>0){
      content = `${originalImage[0].shareContent}`
    } else{
      content = globalData.themeData.shareContent
    }

    const data = {
      themeId: globalData.themeId || '',
      activityId: this.state.currentActivityID || '',
      activityImgId: this.state.currentActivityImgID || '',
    }

    const path = tool.formatQueryUrl('/pages/browser/index', data)
    var imgurl = ''
    console.log(this.state.showPic)
    if (this.state.showPic) {
      imgurl = this.state.currentPicOnMask
      const data = {
        shareSource: this.state.currentPicOnMask,
        themeId: globalData.themeId || '',
        // sceneId: currentScene.sceneId || '',
        originalCompleteImageUrl:this.state.originUrl
      }
      const path = tool.formatQueryUrl('/pages/index', data)
      const { userInfo = {} } = globalData
      if(userInfo.nickName){
         content = `@${userInfo.nickName}：${content}`
      }
      return {
        title: content,
        path: path,
        imageUrl: this.state.currentPicOnMask,
        success: () => {
          console.log('分享成功')
        },
      }

    } else {
      imgurl = globalData.waterfallLeftList[0].url
    }
    if(userInfo.nickName){
      content =`@${userInfo.nickName}: ${content}`
    }
    return {
      title: content,
      imageUrl: imgurl,
      path: path,
      success: () => {
        console.log('分享成功')
      },
    }
  }

  // 显示与隐藏Loading
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

  componentWillMount() {
    this.themeId = this.$router.params.themeId
    this.activityId = this.$router.params.activityId
    this.activityImgId = this.$router.params.activityImgId
  }

  componentDidMount() {
    this.setState({
      navScrollHeight: this.activityImgWidthL + 'rpx',
      navScrollHeight_higher: this.activityImgWidthL + 32 + 'rpx'
    })
    this.getThemeData(() => {
      this.initParameters()
      this.initThemeList()
      if (this.activityId) {
        this.changeWorkList(this.activityId)
        this.setState({
          activityName: 'x'+this.activityImgId
        })
      } else {
        this.changeWorkList(globalData.themeData.originalImageList[0].activityId)
      }
    })
  }

  initParameters() {
    this.setState({
      waterfallTopMargin: globalData.totalTopHeight * 2 + this.activityImgWidthL + 40 + 32 + 'rpx',
      titleAndNavHeight: globalData.totalTopHeight * 2 + 20 + 'rpx',
    })
  }
  getThemeData = async (callback) => {
    if (!globalData.themeData) {
      const res = await service.core.theme(this.themeId)
      globalData.themeData = res.result && res.result.result
    }
    typeof callback === 'function' && callback()

  }
  initThemeList() {
    if (this.activityId) {
      this.setState({
        currentActivityID: this.activityId,
        currentActivityImgID: this.activityImgId,
        }, () => {
      })
    } else {
      this.setState({
        currentActivityID: globalData.themeData.originalImageList[0].activityId,
        currentActivityImgID: globalData.themeData.originalImageList[0].imageId,
        }, () => {
      })
    }
  }

  resetPage() {
    this.setState({
      currentPage: 1
    })
  }

  changeWorkList = async (activityID) => {
    this.showLoading()
    this.resetPage()
    globalData.waterfallLeftHeight = 0
    globalData.waterfallRightHeight = 0
    globalData.waterfallLeftList = []
    globalData.waterfallRightList = []
    try {
      const result = await browser.getWorkList(activityID, 1)
      const workList = result.result.result
      globalData.browserWorkList = workList

      //如果没有第二页
      const resultAdvance = await browser.getWorkList(activityID, 2)
      if (resultAdvance.result.result.length === 0) {
        this.setState({
          bottomTip: '-没有更多啦-',
        })
      } else {
        this.setState({
          bottomTip: '加载中...',
        })
      }
    } catch (err) {
      this.hideLoading()
      Taro.showToast({
        title:'系统异常',
      })
      this.setState({
        bottomTip: '-没有更多啦-',
      })
      return
    }
    this.getList(globalData.browserWorkList)
  }


  loadMoreWorks = async () => {
    try {
      console.log(this.state.currentPage)
      const result = await browser.getWorkList(this.state.currentActivityID, this.state.currentPage + 1)
      const workList = result.result.result
      if (workList.length != 0) {
        this.getList(workList)
        this.setState({
          currentPage: this.state.currentPage + 1
        })
      } else {
        this.setState({
          bottomTip: '-没有更多啦-',
        })
      }
    } catch (err) {
      console.log(err)
      this.hideLoading()
      Taro.showToast({
        title:'系统异常',
      })
      this.setState({
        bottomTip: '-没有更多啦-',
      })
      return
    }
  }

  app = Taro.getApp()

  pageToHome () {
    console.log(this.activityId+'1111')
    if(this.activityId!=0 && this.activityId!==undefined){
      console.log(this.activityId+'1111')
      Taro.navigateTo({ url: '/pages/home/index' })
    }else{
      Taro.navigateBack({ delta: 1 })
    }
  }

  onPageScroll(e) {
    var topDistance = e.scrollTop
    var minHeight = this.activityImgWidthS
    var maxHeight = this.activityImgWidthL
    var navScrollHeight = ''
    var navScrollHeight_higher = ''
    if (topDistance > 0) {
      navScrollHeight = minHeight + 'rpx',
        navScrollHeight_higher = minHeight + 32 + 'rpx'
    } else {
      // 当没有滚动的时候，navbar高度为最大值
      navScrollHeight = maxHeight + 'rpx'
      navScrollHeight_higher = maxHeight + 32 + 'rpx'
    }
    this.setState({
      navScrollHeight: navScrollHeight,
      navScrollHeight_higher: navScrollHeight_higher
    })
  }

  onReachBottom() {
    console.log('触底了')
    this.loadMoreWorks()
  }

  clickThemeIcon(activityID, activityImgID, e) {
    this.app.aldstat.sendEvent('选择原图', {'imgid':activityImgID})
    this.setState({
      currentActivityID: activityID,
      currentActivityImgID: activityImgID,
      bottomTip: '加载中...',
      //activityName: 'x' + activityImgID,
    })
    this.changeWorkList(activityID)
  }

  getList(list) {
    var counter = 0
    if (list.length === 0) {
      console.log('列表为空')
      this.hideLoading()
    }
    list.forEach(element => {
      let picUrl = element.renderPictureInfo.type==='video'?element.renderPictureInfo.firstFrame:element.renderPictureInfo.url
      let originalUrl = element.originPictureInfo && element.originPictureInfo.url || ""
      let originalBgColor = this.colorStrTransform(element.renderPictureInfo.placeHolderColor)
      this.divideList({height:element.renderPictureInfo.imageHeight,width:element.renderPictureInfo.imageWidth},picUrl,counter ,originalUrl, originalBgColor)
      counter = counter + 1
      this.formWaterfall()
    });
  }

  colorStrTransform (strOriginal) {
    if (strOriginal) {
      return '#'+strOriginal.substr(2)
    } else {
      console.log('未收到背景颜色！')
      return '#000000'
    }
  }

  divideList(result, url, counter,originalUrl, originalBgColor) {
    if (counter === 0 || globalData.waterfallLeftHeight <= globalData.waterfallRightHeight) {
      globalData.waterfallLeftHeight = globalData.waterfallLeftHeight + (result.height / result.width)
      globalData.waterfallLeftList.push({url:url,originUrl:originalUrl,bgColor:originalBgColor})
    } else {
      globalData.waterfallRightHeight = globalData.waterfallRightHeight + (result.height / result.width)
      globalData.waterfallRightList.push({url:url,originUrl:originalUrl,bgColor:originalBgColor})
    }
  }
  formWaterfall() {
    if (globalData.browserWorkList.length === globalData.waterfallLeftList.length + globalData.waterfallRightList.length) {
      this.setState({
        waterfallLoaded: true
      })
    }
    this.hideLoading()
  }

  openPicMaskContent(item, e) {
    console.log(item)
    this.setState({
      showPic: true,
      currentPicOnMask: item.url,
      originUrl:item.originUrl
    })
  }

  closePicMaskContent() {
    this.setState({
      showPic: false,
    })
    //console.log(globalData.themeData.originalImageList)
  }

  clickLikeBtn() {
    console.log('I like it :)')
    Taro.showToast({
      title: '喜欢+1❤',
      icon: 'none',
      duration: 800
    })
      .then(res => console.log(res))
  }

  clickShareBtn() {
  }

  goEditor = () => {
    Taro.navigateTo({ url: `/pages/psChallenge/index?imageId=${this.state.currentActivityImgID}&activityId=${this.state.currentActivityID}` })
  }

  handleGetUserInfo = async (data) => {
    // console.log('handleGetUserInfo', data)
    const {detail: {userInfo}} = data
    if (userInfo) {
      const result = await base.loginAuth(data.detail)
      globalData.totalUserInfo = result.result.result
      globalData.userInfo = userInfo
      Taro.navigateTo({ url: `/pages/psChallenge/index?imageId=${this.state.currentActivityImgID}&activityId=${this.state.currentActivityID}` })
    } else {
      Taro.showToast({
        title: '请授权',
        icon: 'success',
        duration: 2000
      })
    }
  }

  render() {

    let leftList
    let rightList
    let picMaskContent

    if (this.state.waterfallLoaded) {
      leftList = globalData.waterfallLeftList
      rightList = globalData.waterfallRightList
    }

    if (this.state.showPic) {
      picMaskContent = (
        <View className='showPicMask' style={{ top: this.state.titleAndNavHeight }}>
          <View className='maskContent'>

            <View className='clickArea' onClick={this.closePicMaskContent}></View>

            <Image src={this.state.currentPicOnMask} mode='widthFix' className='maskImg'></Image>

            <Button className="shareButton" hoverClass="btn-hover" openType='share'>分享</Button>

          </View>
        </View>
      )
    }

    return (
      <View className='browser'>
        <View className='title'>
          <Title
            color="#333"
            leftStyleObj={{ left: Taro.pxTransform(8) }}
            renderLeft={
              <CustomIcon type="back" theme="dark" onClick={this.pageToHome} />
            }
          >这图我能P</Title>
        </View>

        {picMaskContent}
        {/* 加入loading */}
        <Loading visible={this.state.loading} />

        <View className='navBar' style={{ top: 0, paddingTop: this.state.titleAndNavHeight}}>
          <ScrollView className='scroll' scrollX={true} style={{ height: this.state.navScrollHeight_higher}} scrollIntoView={this.state.activityName} scrollWithAnimation={true}>
            <View className='item' style='width: 33rpx'></View>
            {globalData && globalData.themeData && globalData.themeData.originalImageList.map(item => {
              return <View id={'x'+item.imageId} className='item' hoverClass="item-hover" onClick={this.clickThemeIcon.bind(this, item.activityId, item.imageId)} key={item.activityId}>
                <Image className='itemImg' src={item.originalImageUrl} style={{ height: this.state.navScrollHeight, width: this.state.navScrollHeight }}>
                  {this.state.currentActivityImgID === item.imageId ?
                    <View className='itemImgBorder' style={{ height: this.state.navScrollHeight, width: this.state.navScrollHeight }}>
                      <View className='itemImgBorderText'>原图</View>
                      {/* <View className='itemImgBorderTri'></View> */}
                    </View>
                    : <View className='itemMask'></View>}
                </Image>




                <View className='itemBottomArrow'>
                  {this.state.currentActivityImgID === item.imageId ?
                    <View className='itemImgBorderTri'></View>
                    : <View />}
                </View>



              </View>
            })
            }
            <View className='item' style='width: 33rpx'></View>
          </ScrollView>
        </View>

        <View className='waterfall'>
          <View className='left-div' style={{ marginTop: this.state.waterfallTopMargin }}>
            {leftList&&leftList.map(item => {
              return <View className='card' hoverClass="card-hover" key={item.url} onClick={this.openPicMaskContent.bind(this, item)}>
                <Image className='cardImg' src={item.url} mode='widthFix' style={{ backgroundColor: item.bgColor }}></Image>
              </View>
            })
            }
          </View>
          <View className='right-div' style={{ marginTop: this.state.waterfallTopMargin }}>
            {rightList&&rightList.map(item => {
              return <View className='card' hoverClass="card-hover" key={item.url} onClick={this.openPicMaskContent.bind(this, item)}>
                <Image className='cardImg' src={item.url} mode='widthFix' style={{ backgroundColor: item.bgColor }}></Image>
              </View>
            })
            }
          </View>
        </View>

        <View className='divider'>{this.state.bottomTip}</View>

        <View className='btnGrp'>
          <Button className="button white" hoverClass="btn-hover" openType='share'>邀请好友PK</Button>
          <Button className="button pink" openType='getUserInfo' onGetUserInfo={this.handleGetUserInfo} hoverClass="btn-hover" >开始P图</Button>
        </View>

      </View>
    )
  }
}

export default Browser as ComponentClass<PageOwnProps, PageState>
