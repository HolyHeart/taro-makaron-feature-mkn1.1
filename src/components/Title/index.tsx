import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import './index.less'

type ComponentStateProps = {}

type ComponentOwnProps = {
  renderLeft: any,
  children: any, 
  color?: string,
  leftStyleObj?: object
}

type ComponentState = {}

type IProps = ComponentStateProps & ComponentOwnProps

interface Title {
  props: IProps;
}

class Title extends Component {
  static defaultProps = {
    color: '#fff'
  }
  state = {
    statusBarHeight: 20, // 状态栏高度
    titleBarHeight: 44,
  }
  componentWillMount () {}
  componentDidMount () {
    this.clacHeight()
  }
  clacHeight = () => {
    const systemInfo = Taro.getSystemInfoSync()
    const statusBarHeight = systemInfo.statusBarHeight || 20   
    let totalTopHeight = 72
    if (systemInfo.model.indexOf('iPhone X') !== -1) {
      totalTopHeight = 85
    } else if (systemInfo.model.indexOf('iPhone') !== -1) {
      totalTopHeight = 62
    }
    const titleBarHeight = totalTopHeight - statusBarHeight
    this.setState({
      statusBarHeight,
      titleBarHeight
    })
  }
  calcStyle = () => {
    const {statusBarHeight, titleBarHeight} = this.state
    const style = {
      top: statusBarHeight + 'px',
      height: titleBarHeight + 'px',
    }
    return style
  }
  render() {
    const { color, leftStyleObj } = this.props
    return (
      <View className='title-wrap' style={this.calcStyle()}>
        <View className="left" style={leftStyleObj}>
          {this.props.renderLeft}
        </View>
        <Text style={{color}}>{this.props.children}</Text>  
      </View>
    )
  }
}

export default Title as ComponentClass<ComponentOwnProps, ComponentState>