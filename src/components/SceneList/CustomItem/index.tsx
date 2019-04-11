import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'

import './index.less'
import loading from '@/assets/images/pic_loading.png'

type ComponentStateProps = {}

type ComponentOwnProps = {
  onClick?: () => void,
  bgUrl?: string,
  thumbnailUrl: string,
  sceneName?: string,
  active: boolean,
  icon?: any  
}

type ComponentState = {}

type IProps = ComponentStateProps & ComponentOwnProps

interface CustomItem {
  props: IProps;
}

class CustomItem extends Component {
  static defaultProps = {
    bgUrl: loading,
    thumbnailUrl: '',
    sceneName: '',
    active: false,
  }
  componentWillReceiveProps (nextProps) {
    // console.log(this.props, nextProps)
  }
  render() {
    const { onClick, active, thumbnailUrl } = this.props
    return (
      <View className="custom-item" onClick={onClick}>
        <View className="bg">
          <Image
            className='add-icon'
            src='https://static01.versa-ai.com/upload/prod/image/bg_replace/add.9bd7d3a5b7fd2e69e8d3fa98ac93ece1.png'
          />  
          {thumbnailUrl &&           
            <Image 
              className="thumbnai"
              src={thumbnailUrl}
              style="width:100%;height:100%"
            />
          }              
        </View>                              
        <View className="tag">
          {active && <Text className="icon"></Text>}
          <Text className="tag-title">自定义</Text>
        </View>
      </View>   
    )
  }
}

export default CustomItem as ComponentClass<ComponentOwnProps, ComponentState>