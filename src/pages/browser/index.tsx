import { ComponentClass } from 'react'
import Taro, { Component, Config, navigateBackMiniProgram } from '@tarojs/taro'
import { View, Button, Image, ScrollView} from '@tarojs/components'
import Title from '@/components/Title'
import CustomIcon from '@/components/Icon'
import './index.less'
import globalData from "@/services/global_data"

import testImg from '@/assets/images/Test.png'


type PageOwnProps = {}

type PageState = {}

class Browser extends Component {
  
  config: Config = {
    navigationBarTitleText: '这图我能P',
    disableScroll: false,
    enablePullDownRefresh:false
  }
  
  state = {
    navHeight: '',
    navScrollHeight: '',
  }

  componentDidMount () {
    this.getScreenHeight()
    globalData.totalTopHeight = globalData.totalTopHeight * 2 + 'rpx'
  }

  getScreenHeight () {
    Taro.getSystemInfo({
      success : res => 
      globalData.sysHeight = res.screenHeight
    })

    this.setState({
      navHeight: globalData.sysHeight * 0.6 + 'rpx',
      navScrollHeight: globalData.sysHeight * 0.3 + 'rpx',
    })
  }

  pageToHome () {
    Taro.navigateBack({ delta: 1 })
  }

  onPageScroll (e) {
    var topDistance = e.scrollTop


    // TODO

    var minHeight = globalData.sysHeight * 0.40
    var maxHeight = globalData.sysHeight * 0.60
    var navHeight = ''
    var navScrollHeight = ''
    if (topDistance!==0) {
      navHeight = minHeight + 'rpx'
      navScrollHeight = minHeight/2 + 'rpx'
    } else {
      navHeight = maxHeight + 'rpx'
      navScrollHeight = maxHeight/2 + 'rpx'
    }

    this.setState({
      navHeight: navHeight,
      navScrollHeight: navScrollHeight
    })
  }


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
            <View className='item' hoverClass="item-hover" style={{height: this.state.navScrollHeight, width: this.state.navScrollHeight}}> 
            </View>
            <View className='item' hoverClass="item-hover" style={{height: this.state.navScrollHeight, width: this.state.navScrollHeight}}> 
            </View>
            <View className='item' hoverClass="item-hover" style={{height: this.state.navScrollHeight, width: this.state.navScrollHeight}}> 
            </View>
            <View className='item' hoverClass="item-hover" style={{height: this.state.navScrollHeight, width: this.state.navScrollHeight}}> 
            </View>
            <View className='item' hoverClass="item-hover" style={{height: this.state.navScrollHeight, width: this.state.navScrollHeight}}> 
            </View>
            <View className='item' hoverClass="item-hover" style={{height: this.state.navScrollHeight, width: this.state.navScrollHeight}}> 
            </View>
            <View className='item' hoverClass="item-hover" style={{height: this.state.navScrollHeight, width: this.state.navScrollHeight}}> 
            </View>
            <View className='item' hoverClass="item-hover" style={{height: this.state.navScrollHeight, width: this.state.navScrollHeight}}> 
            </View>
            <View className='item' hoverClass="item-hover" style={{height: this.state.navScrollHeight, width: this.state.navScrollHeight}}> 
            </View>
          </ScrollView>
        </View>






        <ScrollView className='waterfall'>
          <View className='left-div'>
          </View>
          <View className='right-div'>
          </View>
        </ScrollView>






        <View className='divider'>-底部-</View>

        <View className='btnGrp'>
          <Button className="button white" hoverClass="btn-hover">分享给好友</Button>
          <Button className="button pink" hoverClass="btn-hover">我要创作</Button>
        </View>  

      </View>
    )
  }
}

export default Browser as ComponentClass<PageOwnProps, PageState>
