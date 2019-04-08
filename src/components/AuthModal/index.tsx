import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'

import './index.less'

type ComponentStateProps = {}

type ComponentOwnProps = {
  onClick: () => void
}

type ComponentState = {}

type IProps = ComponentStateProps & ComponentOwnProps

interface AuthModal {
  props: IProps;
}

class AuthModal extends Component {
  state = {
    open: false
  }

  bindListener () {
    Taro.eventCenter.on('myAuth', (options = {}) => {
      const { open = false } = options
      this.setState({
        open
      })
    })
    // 绑定函数
    Taro.authModal = Taro.eventCenter.trigger.bind(Taro.eventCenter, 'myAuth')
  }

  componentDidShow () {
    this.bindListener()
  }

  componentDidMount () {
    this.bindListener()
  }

  componentDidHide () {
    Taro.eventCenter.off('myAuth')
  }

  componentWillUnmount () {
    Taro.eventCenter.off('myAuth')
  }

  handleClick = () => {
    this.setState({
      open: false
    })
  }

  render() {
    const {open} = this.state
    return (
      <View className={`auth-wrap ${open ? '' : 'hidden'}`} onClick={this.handleClick}>
        <View className="modal"></View>
        <View className="content">
          <Button openType="openSetting" size='default' type='warn' >前往授权</Button>
        </View>        
      </View>
    )
  }
}

export default AuthModal as ComponentClass<ComponentOwnProps, ComponentState>