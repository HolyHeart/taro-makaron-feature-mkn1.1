import { ComponentClass } from 'react'
import Taro, { Component, Config, navigateBackMiniProgram } from '@tarojs/taro'
import { View, Button, Image, ScrollView} from '@tarojs/components'
import Title from '@/components/Title'
import CustomIcon from '@/components/Icon'
import './index.less'
import globalData from "@/services/global_data"

import testImg from '@/assets/images/Test.png'

import { browser } from '@/services/service'


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
    currentThemeID: 0,

    leftList: [],
    leftHeight: 0,
    rightList: [],
    rightHeight: 0,
  }

  componentDidMount () {
    this.getScreenHeight()
    //待用
    globalData.windowTop = globalData.totalTopHeight * 2 + globalData.sysHeight * 0.36 + 'rpx'
    globalData.totalTopHeight = globalData.totalTopHeight * 2 + 'rpx'
    this.initThemeList()
    //console.log(globalData.themeData.originalImageList[0].activityId)
    this.initWorkList()

  }

  initThemeList () {
    this.setState({
      currentThemeID: globalData.themeData.originalImageList[0].activityId
    })
  }

  async initWorkList () {
    try {
      const result = await browser.psWorkList('293060964369879040', '1')
      const workList = result.result.result.workList

      globalData.browserWorkList = workList

    } catch (err) {
      console.log('Oops, failed to get work list', err)
    }

    //console.log('browserWorkList', globalData.browserWorkList)
    this.getList(globalData.browserWorkList)
  }


  getScreenHeight () {
    Taro.getSystemInfo({
      success : res => 
      globalData.sysHeight = res.screenHeight
    })

    this.setState({
      navScrollHeight: globalData.sysHeight * 0.3 + 'rpx',
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
    if (topDistance!==0) {
      navScrollHeight = minHeight + 'rpx'
    } else {
      // 当没有滚动的时候，navbar高度为最大值
      navScrollHeight = maxHeight + 'rpx'
    }
    this.setState({
      navScrollHeight: navScrollHeight
    })
  }

  clickThemeIcon (activityID, e) {
    this.setState({
      currentThemeID: activityID
    })
    console.log(activityID)
  }


  // TODO: divide the original list into 2 sublists
  getList (list) {
    var counter = 0
    list.forEach(element => {
      var picUrl = element.url
      Taro.getImageInfo({
        src: picUrl,
        success: function (res) {
          console.log(res)
        }
      })
    });
    //this.divideList(globalData.picSizeList)
  }


  divideList (result) {
    console.log(result)
  }





            //  if (counter === 0) {
          //    var temList = this.state.leftList
          //    var temHeight = this.state.leftHeight
          //    this.setState({
          //      leftList: temList.push(element),
          //      leftHeight: temHeight + (res.height / res.width)
          //    })
          //  } else {
          //    if (this.state.leftHeight > this.state.rightHeight) {
          //     var temList = this.state.rightList
          //     var temHeight = this.state.rightHeight
          //     this.setState({
          //       rightList: temList.push(element),
          //       rightHeight: temHeight + (res.height / res.width)
          //     })
          //    } else {
          //     var temList = this.state.leftList
          //     var temHeight = this.state.leftHeight
          //     this.setState({
          //       leftList: temList.push(element),
          //       leftHeight: temHeight + (res.height / res.width)
          //     })
          //    }
          //  }





  render () {
    
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

        <View className='navBar' style={{top: globalData.totalTopHeight}}>
          <ScrollView className='scroll' scrollX={true} style={{height: this.state.navScrollHeight}}>
            {globalData.themeData.originalImageList.map(item=>{
                return <View className='item' hoverClass="item-hover" onClick={this.clickThemeIcon.bind(this, item.activityId)} key={item.activityId}> 
                        <Image className='itemImg' src={item.originalImageUrl} style={{height: this.state.navScrollHeight, width: this.state.navScrollHeight}}></Image>
                      </View>
                })
            }
          </ScrollView>
        </View>
        

        <View className='waterfall'>
          <View className='left-div' style={{marginTop: globalData.windowTop}}>
            <View className='card' hoverClass="card-hover" style='height:300rpx'>
            </View>
            <View className='card' hoverClass="card-hover" style='height:350rpx'>
            </View>
            <View className='card' hoverClass="card-hover" style='height:330rpx'>
            </View>
            <View className='card' hoverClass="card-hover" style='height:400rpx'>
            </View>
            <View className='card' hoverClass="card-hover" style='height:300rpx'>
            </View>
            <View className='card' hoverClass="card-hover" style='height:300rpx'>
            </View>
          </View> 
          <View className='right-div' style={{marginTop: globalData.windowTop}}>
            <View className='card' hoverClass="card-hover" style='height:400rpx'>
            </View>
            <View className='card' hoverClass="card-hover" style='height:300rpx'>
            </View>
            <View className='card' hoverClass="card-hover" style='height:350rpx'>
            </View>
            <View className='card' hoverClass="card-hover" style='height:300rpx'>
            </View>
            <View className='card' hoverClass="card-hover" style='height:350rpx'>
            </View>
            <View className='card' hoverClass="card-hover" style='height:330rpx'>
            </View>

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
