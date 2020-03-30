import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import './index.less'
type ComponentStateProps = {}

type ComponentOwnProps = {
  styleObj?: object,
  onClick?: () => void
}
type ComponentState = {}

type IProps = ComponentStateProps & ComponentOwnProps

interface BackApp {
  props: IProps;
}

class BackApp extends Component { 
  static defaultProps = {
    onClick: () => {},
    styleObj: {}
  }
  handleClick = () => {
    const {onClick} = this.props
    typeof onClick === 'function' && onClick()
  }
  render() {
    return (
      <View className='back-app' style={this.props.styleObj} onClick={this.handleClick}> 
        <Button
          className='open-app'
          openType='launchApp'
        ></Button>    
      </View>
    )
  }
}

export default BackApp as ComponentClass<ComponentOwnProps, ComponentState>