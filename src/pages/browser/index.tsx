import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Image } from '@tarojs/components'
import Title from '@/components/Title'
import CustomIcon from '@/components/Icon'
import './index.less'



type PageOwnProps = {}

type PageState = {}

class Browser extends Component {
  
  config: Config = {
    navigationBarTitleText: '这图我能P',
    disableScroll: true,
    enablePullDownRefresh:false
  }
  


  pageToHome () {
    Taro.navigateBack({ delta: 1 })
  }



  render () {
    return (
      <View className='browser'>
        <Title
          color="#333"
          leftStyleObj={{left: Taro.pxTransform(8)}}
          renderLeft={
            <CustomIcon type="back" theme="dark" onClick={this.pageToHome}/>
          }
        >这图我能P</Title>

        <View className='navBar'>
        </View>


        <View className='waterfall'>
        </View>
        
        <View className='btnGrp'>
          {/* <View className='at-row'>
            <View className='at-col'><Button className="custom-button pink" hoverClass="btn-hover">分享给好友</Button></View>
            <View className='at-col'><Button className="custom-button pink" hoverClass="btn-hover">我要创作</Button></View>
          </View> */}

          <Button className="custom-button pink" hoverClass="btn-hover">分享给好友</Button>
          <Button className="custom-button pink" hoverClass="btn-hover">我要创作</Button>
        </View>  

      </View>
    )
  }
}

export default Browser as ComponentClass<PageOwnProps, PageState>
