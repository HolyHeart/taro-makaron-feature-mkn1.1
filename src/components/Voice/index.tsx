import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import sound_on from '@/assets/images/icon_sound.png'
import sound_off from '@/assets/images/icon_sound_off.png'

import './index.less'
type ComponentStateProps = {}

type ComponentOwnProps = { 
  status?: string, 
  styleObj?: object,
  onClick?: (status: any) => void
}
type ComponentState = {}

type IProps = ComponentStateProps & ComponentOwnProps

interface Voice {
  props: IProps;
}

class Voice extends Component { 
  static defaultProps = {
    styleObj: {},
    status: 'on', // 'on' 'off'
    onClick: () => {},
  }
  handleClick = () => {
    const {onClick, status} = this.props
    typeof onClick === 'function' && onClick(status)
  }
  render() {
    const { status, styleObj } = this.props
    return (
      <View className='comp-voice' style={styleObj} onClick={this.handleClick} >
        <Image 
          wx-if="{{!music.autoPlay}}" 
          class="bg-img" 
          src={status === 'on' ? sound_on : sound_off}
          style="width: 100%; height:100%"
        />
      </View>
    )
  }
}

export default Voice as ComponentClass<ComponentOwnProps, ComponentState>