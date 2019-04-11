import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.less'

type ComponentStateProps = {}

type ComponentOwnProps = {
  children: any,
  styleObj?: object
}

type ComponentState = {}

type IProps = ComponentStateProps & ComponentOwnProps

interface Tooltip {
  props: IProps;
}

class Tooltip extends Component {
  static defaultProps = {}

  state = {
    open: false
  }

  bindListener () {
    Taro.eventCenter.on('myTooltip', (options = {}) => {
      const { open = false } = options
      this.setState({
        open
      })
    })
    // 绑定函数
    Taro.tooltip = Taro.eventCenter.trigger.bind(Taro.eventCenter, 'myTooltip')
    Taro.getTooltipStatus = () => {
      return this.state.open
    }
  }
  componentDidShow () {
    this.bindListener()
  }

  componentDidMount () {
    this.bindListener()
  }

  componentDidHide () {
    Taro.eventCenter.off('myTooltip')
  }

  componentWillUnmount () {
    Taro.eventCenter.off('myTooltip')
  }

  handleClick = () => {
    this.setState({
      open: false
    })
  }

  render() {
    const {open} = this.state
    return (
      <View 
        className={`tooltip-wrap ${open ? '' : 'hidden'}`} 
        style={this.props.styleObj} 
        onClick={this.handleClick}
      >
        <View class="arrow-up"></View>
        {this.props.children}
      </View>
    )
  }
}

export default Tooltip as ComponentClass<ComponentOwnProps, ComponentState>