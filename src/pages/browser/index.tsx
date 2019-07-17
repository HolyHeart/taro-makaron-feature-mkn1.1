import { ComponentClass } from 'react'
import Taro, { Component, Config, navigateBackMiniProgram } from '@tarojs/taro'
import { View, Button, Image, ScrollView, Text} from '@tarojs/components'
import Title from '@/components/Title'
import CustomIcon from '@/components/Icon'
import './index.less'
import globalData from "@/services/global_data"

import testImg from '@/assets/images/Test.png'
import likeBtn from '@/assets/images/likeBtn.png'
import shareBtn from '@/assets/images/shareBtn.png'

import { browser, base } from '@/services/service'


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
    currentThemeID: 0,
    waterfallLoaded: false,
    showPic: false,
    currentPicOnMask: '',
  }

  componentDidMount () {
    this.getScreenHeight()
    globalData.windowTop = globalData.totalTopHeight * 2 + globalData.sysHeight * 0.36 + 40 + 'rpx'
    globalData.totalTopHeight = globalData.totalTopHeight * 2 + 20 + 'rpx'
    this.initThemeList()
    this.changeWorkList(this.state.currentThemeID)
  }

  initThemeList () {
    this.setState({
      currentThemeID: globalData.themeData.originalImageList[0].activityId
    })
    console.log(globalData.themeData.originalImageList[0].activityId)
  }

  async changeWorkList (themeID) {

    globalData.waterfallLeftHeight = 0
    globalData.waterfallRightHeight = 0
    globalData.waterfallLeftList = []
    globalData.waterfallRightList = []

    try {
      const result = await browser.psWorkList(themeID, '1')
      const workList = result.result.result.workList
      globalData.browserWorkList = workList
    } catch (err) {
      console.log('Oops, failed to get work list', err)
    }
    this.getList(globalData.browserWorkList)
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

  clickThemeIcon (activityID, e) {
    this.setState({
      currentThemeID: activityID
    })
    console.log(activityID)
    this.changeWorkList(activityID)
  }

  getList (list) {
    var counter = 0
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
      //console.log(url)
    } else {
      globalData.waterfallRightHeight = globalData.waterfallRightHeight + (result.height / result.width)
      globalData.waterfallRightList.push(url)
      //console.log(url)
    }
  }


  async formWaterfall () {
    if (globalData.browserWorkList.length === globalData.waterfallLeftList.length + globalData.waterfallRightList.length) {
      this.setState({
        waterfallLoaded: true
      })
    }
  }


  openPicMaskContent (path, e) {
    this.setState({
      showPic: !this.state.showPic,
      currentPicOnMask: path
    })
  }

  closePicMaskContent () {
    this.setState({
      showPic: !this.state.showPic
    })
  }

  clickLikeBtn () {
    console.log('I like it!!!')
  }

  clickShareBtn () {
    console.log('I Share it!!!')
  }

  render () {
    

    let waterfallLeft
    let leftList
    let rightList
    let picMaskContent

    if (this.state.waterfallLoaded) {
      leftList = globalData.waterfallLeftList
      rightList = globalData.waterfallRightList
    }

    if (this.state.showPic) {
      picMaskContent = (
        <View className='showPicMask' style={{top: globalData.totalTopHeight}}>
          <View className='maskContent'>

            <Image src={this.state.currentPicOnMask} mode='widthFix' className='maskImg' onClick={this.closePicMaskContent}></Image>

            <View className='maskBtnGrp'>
              <View className='maskBtn' hoverClass='maskBtn-hover'>
                <Image src={likeBtn} className='maskBtnImg' onClick={this.clickLikeBtn}></Image>
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



        <View className='navBar' style={{top: globalData.totalTopHeight}}>
          <ScrollView className='scroll' scrollX={true} style={{height: this.state.navScrollHeight_higher}}>
            {globalData.themeData.originalImageList.map(item=>{
                return <View className='item' hoverClass="item-hover" onClick={this.clickThemeIcon.bind(this, item.activityId)} key={item.activityId}> 
                        <Image className='itemImg' src={item.originalImageUrl} style={{height: this.state.navScrollHeight, width: this.state.navScrollHeight}}>


                          {this.state.currentThemeID === item.activityId ?
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
          <View className='left-div' style={{marginTop: globalData.windowTop}}>
          {leftList.map(item=>{
                return <View className='card' hoverClass="card-hover" key={item} onClick={this.openPicMaskContent.bind(this, item)}> 
                        <Image className='cardImg' src={item} mode='widthFix'></Image>
                      </View>
                })
          }
          </View> 

          <View className='right-div' style={{marginTop: globalData.windowTop}}>
          {rightList.map(item=>{
                return <View className='card' hoverClass="card-hover" key={item} onClick={this.openPicMaskContent.bind(this, item)}> 
                        <Image className='cardImg' src={item} mode='widthFix'></Image>
                      </View>
                })
          }
          </View> 

        </View>




        <View className='divider'>-没有更多啦-</View>





        <View className='btnGrp'>
          <Button className="button white" hoverClass="btn-hover">分享给好友</Button>
          <Button className="button pink" hoverClass="btn-hover">我要创作</Button>
        </View>  

      </View>
    )
  }
}

export default Browser as ComponentClass<PageOwnProps, PageState>
