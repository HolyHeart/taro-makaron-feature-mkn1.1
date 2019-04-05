import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'

import './index.less'
import loading from '@/assets/images/pic_loading.png'

type ComponentStateProps = {}

type ComponentOwnProps = {
  onClick?: () => void,
  bgUrl: string,
  thumbnailUrl: string,
  sceneName: string,
  active: boolean,
  icon: any  
}

type ComponentState = {}

type IProps = ComponentStateProps & ComponentOwnProps

interface SceneItem {
  props: IProps;
}

class SceneItem extends Component {
  static defaultProps = {
    bgUrl: loading,
    thumbnailUrl: loading,
    sceneName: '',
    active: false,
    hasIcon: false, // 是否有音乐icon
    iconType: 'gif-music', // 'gif-music' 'gif'
  }
  componentWillReceiveProps (nextProps) {
    // console.log(this.props, nextProps)
  }
  render() {
    const { onClick, active, thumbnailUrl, bgUrl, sceneName, hasIcon, iconType } = this.props
    return (
      <View className="scene-item" onClick={onClick}>
        {hasIcon && <View className={`music ${iconType}`}></View>}
        <View className="bg">
          <Image
            src={bgUrl}
            style="position:absolute;width:100%;height:100%;opacity:0"
          />              
          <Image className="thumbnai"
            src={thumbnailUrl}
            style="width:100%;height:100%"
          />                
        </View>                              
        <View className="tag">
          {active && <Text className="icon"></Text>}
          <Text className="tag-title">{sceneName}</Text>
        </View>
      </View>   
    )
  }
}

export default SceneItem as ComponentClass<ComponentOwnProps, ComponentState>