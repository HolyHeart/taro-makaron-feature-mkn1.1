import { ComponentClass } from 'react'
import Taro, { Component, Config, navigateBackMiniProgram } from '@tarojs/taro'
import { View, Button, Image, ScrollView, Text } from '@tarojs/components'
import Title from '@/components/Title'
import CustomIcon from '@/components/Icon'
import './index.less'
import globalData from "@/services/global_data"


import likeBtn from '@/assets/images/icon_like@2x.png'
import shareBtn from '@/assets/images/icon_share@2x.png'

import { browser, base } from '@/services/service'
import Loading from '@/components/Loading'


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
  }

  // TODO

  // onShareAppMessage (res) {
  //   return {
  //     title: '这图我能P',
  //     //path: '/pages/browser/index',
  //     success: () => {
  //       console.log('分享成功')
  //     },
  //   }
  // }

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
  }

  componentDidMount() {
    this.setState({
      navScrollHeight: this.activityImgWidthL + 'rpx',
      navScrollHeight_higher: this.activityImgWidthL + 32 + 'rpx'
    })
    this.getThemeData(() => {
      this.initParameters()
      this.initThemeList()
      this.changeWorkList(globalData.themeData.originalImageList[0].activityId)
    }
  }

  initParameters() {
    this.setState({
      // IP7有显示问题，需要分别加20和40。待解决
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
    this.setState({
      currentActivityID: globalData.themeData.originalImageList[0].activityId,
      currentActivityImgID: globalData.themeData.originalImageList[0].imageId,
    }, () => {
    })
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
      const result = await browser.psWorkList(activityID, 0)
      const workList = result.result.result.workList
      globalData.browserWorkList = workList
      //如果没有第二页
      const resultAdvance = await browser.psWorkList(activityID, 1)
      if (resultAdvance.result.result.workList.length === 0) {
        this.setState({
          bottomTip: '-没有更多啦-',
        })
      } else {
        this.setState({
          bottomTip: '加载中...',
        })
      }
    } catch (err) {
      console.log('Oops, failed to get work list', err)
    }
    this.getList(globalData.browserWorkList)
  }


  loadMoreWorks = async () => {
    try {
      console.log(this.state.currentPage)
      const result = await browser.psWorkList(this.state.currentActivityID, this.state.currentPage + 1)
      const workList = result.result.result.workList
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
      console.log('Oops, failed to get work list', err)
    }
  }



  pageToHome() {
    Taro.navigateBack({ delta: 1 })
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
    this.setState({
      currentActivityID: activityID,
      currentActivityImgID: activityImgID,
      bottomTip: '加载中...',
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
      var picUrl = element.url
      Taro.getImageInfo({
        src: picUrl,
      }).then((res) => {
        this.divideList(res, picUrl, counter)
        counter = counter + 1
        this.formWaterfall()
      })
    });
  }

  divideList(result, url, counter) {
    if (counter === 0 || globalData.waterfallLeftHeight <= globalData.waterfallRightHeight) {
      globalData.waterfallLeftHeight = globalData.waterfallLeftHeight + (result.height / result.width)
      globalData.waterfallLeftList.push(url)
    } else {
      globalData.waterfallRightHeight = globalData.waterfallRightHeight + (result.height / result.width)
      globalData.waterfallRightList.push(url)
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

  openPicMaskContent(path, e) {
    this.setState({
      showPic: true,
      currentPicOnMask: path
    })
  }

  closePicMaskContent() {
    this.setState({
      showPic: false,
    })
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
    console.log('I Share it!!!')
    this.setState({
      showPic: true,
    })
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

            <View className='likeBtn'>
              <Image src={likeBtn} className='likeBtnImg' onClick={this.clickLikeBtn}></Image>
              <Text className='likeBtnText'>喜欢</Text>
            </View>

            <View className='shareBtn'>
              <Image src={shareBtn} className='shareBtnImg' onClick={this.clickShareBtn}></Image>
              <Text className='shareBtnText'>分享</Text>
            </View>
            


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
          <ScrollView className='scroll' scrollX={true} style={{ height: this.state.navScrollHeight_higher }}>
            <View className='item' style='width: 33rpx'></View>
            {globalData && globalData.themeData && globalData.themeData.originalImageList.map(item => {
              return <View className='item' hoverClass="item-hover" onClick={this.clickThemeIcon.bind(this, item.activityId, item.imageId)} key={item.activityId}>
                <Image className='itemImg' src={item.originalImageUrl} style={{ height: this.state.navScrollHeight, width: this.state.navScrollHeight }}>
                  {this.state.currentActivityImgID === item.imageId ?
                    <View className='itemImgBorder' style={{ height: this.state.navScrollHeight, width: this.state.navScrollHeight }}>
                      <View className='itemImgBorderText'>原图</View>
                      <View className='itemImgBorderTri'></View>
                    </View>
                    : ''}
                </Image>
              </View>
            })
            }
            <View className='item' style='width: 33rpx'></View>
          </ScrollView>
        </View>

        <View className='waterfall'>
          <View className='left-div' style={{ marginTop: this.state.waterfallTopMargin }}>
            {leftList.map(item => {
              return <View className='card' hoverClass="card-hover" key={item} onClick={this.openPicMaskContent.bind(this, item)}>
                <Image className='cardImg' src={item} mode='widthFix'></Image>
              </View>
            })
            }
          </View>
          <View className='right-div' style={{ marginTop: this.state.waterfallTopMargin }}>
            {rightList.map(item => {
              return <View className='card' hoverClass="card-hover" key={item} onClick={this.openPicMaskContent.bind(this, item)}>
                <Image className='cardImg' src={item} mode='widthFix'></Image>
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
