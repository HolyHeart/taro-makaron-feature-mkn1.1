import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, CoverView, Text, CoverImage } from '@tarojs/components'

import menu_light from '@/assets/images/icon_menu_light.png'
import menu_dark from '@/assets/images/icon_menu_dark.png'
import back_light from '@/assets/images/icon_back_light.png'
import back_dark from '@/assets/images/icon_back_dark.png'
import home_dark from '@/assets/images/icon_home_dark.png'
import './index.less'
type ComponentStateProps = {}

type ComponentOwnProps = {
  type: string,  // icon类型
  theme?: string // 主题
  onClick?: () => void
}
type ComponentState = {}

type IProps = ComponentStateProps & ComponentOwnProps

interface Icon {
  props: IProps;
}

class Icon extends Component { 
  static defaultProps = {
    theme: 'light',
    onClick: () => {}
  }
  handleClick = () => {
    const {onClick} = this.props
    typeof onClick === 'function' && onClick()
  }
  render() {
    const { type, theme } = this.props
    return (
      <CoverView className='icon' onClick={this.handleClick}>
        {type === 'menu' ? <CoverImage class="icon-menu" src={theme === 'light' ? menu_light : menu_dark} mode="scaleToFill" /> : null}         
        {type === 'back' ? <CoverImage class="icon-back" src={theme === 'light' ? back_light : back_dark} mode="scaleToFill" /> : null}  
        {type === 'home' ? <CoverImage class="icon-home" src={home_dark} mode="scaleToFill" /> : null}         
      </CoverView>
    )
  }
}

export default Icon as ComponentClass<ComponentOwnProps, ComponentState>