import { ComponentClass } from 'react'
import Taro, { Component, Config, navigateBackMiniProgram } from '@tarojs/taro'
import { View, Button, Image, ScrollView, Text} from '@tarojs/components'
import Title from '@/components/Title'
import CustomIcon from '@/components/Icon'
import './index.less'
import globalData from "@/services/global_data"

import testImg from '@/assets/images/Test.png'
import likeBtn from '@/assets/images/icon_like@2x.png'
import likedBtn from '@/assets/images/icon_liked@2x.png'
import shareBtn from '@/assets/images/icon_share@2x.png'

import { browser, base } from '@/services/service'
import Loading from '@/components/Loading'


type PageOwnProps = {}

type PageState = {}

class Browser extends Component {
  
  config: Config = {
    navigationBarTitleText: '这图我能P',
    disableScroll: false,
    enablePullDownRefresh:false
  }
  
  state = {
    navScrollHeight: '',
    navScrollHeight_higher: '',
    currentActivityID: '',

    currentActivityImgID: '',

    waterfallLoaded: false,
    showPic: false,
    currentPicOnMask: '',
    loading: false,
    likeOrNot: false,
    likeBtnUrl: likeBtn,

    currentPage: 0,
    bottomTip: '-加载中-',

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

  componentDidMount () {
    this.getScreenHeight()
    this.initParameters()
    this.initThemeList()
    this.changeWorkList(globalData.themeData.originalImageList[0].activityId)

    //this.changeWorkList('303588543618289664')

  }

  initParameters () {
    this.setState({
      // IP7有显示问题，需要分别加20和40。待解决
      waterfallTopMargin: globalData.totalTopHeight * 2 + globalData.sysHeight * 0.36 + 'rpx',
      titleAndNavHeight: globalData.totalTopHeight * 2 + 'rpx',
    })
  }

  initThemeList () {
    this.setState({
      currentActivityID: globalData.themeData.originalImageList[0].activityId,
      currentActivityImgID: globalData.themeData.originalImageList[0].imageId,
    })
  }

  resetPage () {
    this.setState({
      currentPage:0
    })
  }

  async changeWorkList (activityID) {
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
      if (resultAdvance.result.result.workList.length===0) {
        this.setState({
          bottomTip: '-没有更多啦-',
        })
      } else {
        this.setState({
          bottomTip: '-加载中-',
        })
      }
    } catch (err) {
      console.log('Oops, failed to get work list', err)
    }
    this.getList(globalData.browserWorkList)
  }


  async loadMoreWorks () {
    try {
      console.log(this.state.currentPage)
      const result = await browser.psWorkList(this.state.currentActivityID, this.state.currentPage + 1)
      const workList = result.result.result.workList
      if (workList.length!=0) {
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



  getScreenHeight () {
    Taro.getSystemInfo({
      success : res => 
      globalData.sysHeight = res.screenHeight
    })
    this.setState({
      navScrollHeight: globalData.sysHeight * 0.3 + 'rpx',
      navScrollHeight_higher: globalData.sysHeight * 0.3 + 32 + 'rpx'
    })
  }

  pageToHome () {
    Taro.navigateBack({ delta: 1 })
  }

  onPageScroll (e) {
    var topDistance = e.scrollTop
    var minHeight = globalData.sysHeight * 0.20
    var maxHeight = globalData.sysHeight * 0.30
    var navScrollHeight = ''
    var navScrollHeight_higher = ''
    if (topDistance>0) {
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

  onReachBottom () {
    console.log('触底了')
    this.loadMoreWorks()
  }

  clickThemeIcon (activityID, activityImgID, e) {
    this.setState({
      currentActivityID: activityID,
      currentActivityImgID: activityImgID,
      bottomTip: '-加载中-',
    })
    console.log(activityID)
    this.changeWorkList(activityID)
  }

  getList (list) {
    var counter = 0
    if (list.length===0) {
      console.log('列表为空')
      this.hideLoading()
    }
    list.forEach(element => {
      var picUrl = element.url
      Taro.getImageInfo({
        src: picUrl,
      }).then((res)=>{
        this.divideList(res, picUrl, counter)
        counter = counter + 1
        this.formWaterfall()
      })
    });
  }

  divideList (result, url, counter) {
    if (counter===0 || globalData.waterfallLeftHeight <= globalData.waterfallRightHeight) {
      globalData.waterfallLeftHeight = globalData.waterfallLeftHeight + (result.height / result.width)
      globalData.waterfallLeftList.push(url)
    } else {
      globalData.waterfallRightHeight = globalData.waterfallRightHeight + (result.height / result.width)
      globalData.waterfallRightList.push(url)
    }
  }

  async formWaterfall () {
    if (globalData.browserWorkList.length === globalData.waterfallLeftList.length + globalData.waterfallRightList.length) {
      this.setState({
        waterfallLoaded: true
      })
    }
    this.hideLoading()
  }

  openPicMaskContent (path, e) {
    this.setState({
      showPic: true,
      currentPicOnMask: path
    })
  }

  closePicMaskContent () {
    this.setState({
      showPic: false,
    })
  }

  clickLikeBtn () {
    if (this.state.likeOrNot===false) {
      console.log('I like it :)')
      this.setState({
        likeBtnUrl: likedBtn,
        likeOrNot: true,
        showPic: true,
      })
    } else {
      console.log('I dislike it :(')
      this.setState({
        likeBtnUrl: likeBtn,
        likeOrNot: false,
        showPic: true,
      })
    }
  }

  clickShareBtn () {
    console.log('I Share it!!!')
    this.setState({
      showPic: true,
    })
  }

  addWork () {
    console.log('我要创作')
  }

  render () {
    
    let leftList
    let rightList
    let picMaskContent

    if (this.state.waterfallLoaded) {
      leftList = globalData.waterfallLeftList
      rightList = globalData.waterfallRightList
    }

    if (this.state.showPic) {
      picMaskContent = (
        <View className='showPicMask' style={{top: this.state.titleAndNavHeight}} onClick={this.closePicMaskContent}>
          <View className='maskContent'>
            <Image src={this.state.currentPicOnMask} mode='widthFix' className='maskImg'></Image>
            <View className='maskBtnGrp'>
              <View className='maskBtn' hoverClass='maskBtn-hover'>
                {/* TODO 判断是否喜欢 */}
                <Image src={this.state.likeBtnUrl} className='maskBtnImg' onClick={this.clickLikeBtn}></Image>
                <Text className='maskBtnText'>喜欢</Text>
              </View>
              <View className='maskBtn' hoverClass='maskBtn-hover'>
                <Image src={shareBtn} className='maskBtnImg' onClick={this.clickShareBtn}></Image>
                <Text className='maskBtnText'>分享</Text>
              </View>
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
            leftStyleObj={{left: Taro.pxTransform(8)}}
            renderLeft={
              <CustomIcon type="back" theme="dark" onClick={this.pageToHome}/>
            }
          >这图我能P</Title>
        </View>

        {picMaskContent}
        {/* 加入loading */}
        <Loading visible={this.state.loading} />

        <View className='navBar' style={{top: this.state.titleAndNavHeight}}>
          <ScrollView className='scroll' scrollX={true} style={{height: this.state.navScrollHeight_higher}}>
            {globalData.themeData.originalImageList.map(item=>{
                return <View className='item' hoverClass="item-hover" onClick={this.clickThemeIcon.bind(this, item.activityId, item.imageId)} key={item.activityId}> 
                        <Image className='itemImg' src={item.originalImageUrl} style={{height: this.state.navScrollHeight, width: this.state.navScrollHeight}}>
                          {this.state.currentActivityImgID === item.imageId ?
                          <View className='itemImgBorder' style={{height: this.state.navScrollHeight, width: this.state.navScrollHeight}}>
                            <View className='itemImgBorderText'>原图</View>
                            <View className='itemImgBorderTri'></View>
                          </View>
                          :''}
                        </Image> 
                      </View>
                })
            }
          </ScrollView>
        </View> 

        <View className='waterfall'>
          <View className='left-div' style={{marginTop: this.state.waterfallTopMargin}}>
          {leftList.map(item=>{
                return <View className='card' hoverClass="card-hover" key={item} onClick={this.openPicMaskContent.bind(this, item)}> 
                        <Image className='cardImg' src={item} mode='widthFix'></Image>
                      </View>
                })
          }
          </View> 
          <View className='right-div' style={{marginTop: this.state.waterfallTopMargin}}>
          {rightList.map(item=>{
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
          <Button className="button pink" hoverClass="btn-hover" onClick={this.addWork}>开始P图</Button>
        </View>  

      </View>
    )
  }
}

export default Browser as ComponentClass<PageOwnProps, PageState>