import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'

type ComponentStateProps = {
  global: {
    system: object
  }
}

type ComponentOwnProps = {
  config?: object,
  size?: string,
  children: any, 
}

type ComponentState = {}

type IProps = ComponentStateProps & ComponentOwnProps

interface MarginTopWrap {
  props: IProps;
}

@connect(({ global }) => ({
  global
}), (dispatch) => ({  
}))
class MarginTopWrap extends Component {
  static defaultProps = {
    config: {
      'large': 60,
      'small': 30,
      'default': 0
    },
  }  
  componentWillMount () {}
  componentDidMount () {}  
  calcStyle = () => {
    const { system = {} } = this.props.global || {}    
    const windowHeight =  system.windowHeight
    let calcSize = 'default'
    if (windowHeight >= 800) {
      calcSize = 'large'
    } else if (windowHeight > 750 && windowHeight < 800) {
      calcSize = 'small'
    }
    const size = this.props.size || calcSize || 'default'
    const style = {
      marginTop: this.props.config[size] + 'rpx'
    }
    return style
  }
  render() {
    return (
      <View className='margin-wrap' style={this.calcStyle()}>
        {this.props.children}
      </View>
    )
  }
}

export default MarginTopWrap as ComponentClass<ComponentOwnProps, ComponentState>