import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'

import './index.less'

type ComponentStateProps = {}

type ComponentOwnProps = {
  styleObj?: object
  visible?: boolean
}

type ComponentState = {}

type IProps = ComponentStateProps & ComponentOwnProps

interface Loading {
  props: IProps;
}

class Loading extends Component {
  static defaultProps = {
    color: '#fff',
    visible: false
  }
  state = {}
  componentWillMount () {}
  componentDidMount () {}
  
  render() {
    const { styleObj, visible } = this.props
    return (
      <View className={`comp-loading ${visible ? 'show' : 'hidden'}`} style={styleObj}>
        <Image 
          className="img"        
          src='https://static01.versa-ai.com/upload/6e6189ce82e1/faeaa924-c820-4db0-916b-a246f6ac2109.png'
          mode="aspectFill" 
        />
      </View>
    )
  }
}

export default Loading as ComponentClass<ComponentOwnProps, ComponentState>