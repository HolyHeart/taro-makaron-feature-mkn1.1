import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Image,CoverView,CoverImage } from '@tarojs/components'
import picture from '../../assets/images/Appledemo.gif'

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

  preventScroll(e){
    e.stopPropagation()
  }

  render() {
    const { styleObj, visible } = this.props
    //console.log(this.props,'this is from loading')
    //{/*src='https://static01.versa-ai.com/upload/6e6189ce82e1/faeaa924-c820-4db0-916b-a246f6ac2109.png'*/}
    return ( //visible
      <CoverView className={`comp-loading ${visible ? 'show' : 'hidden'}`} style="width:100%;height:100%" onTouchstart={this.preventScroll}>
        <CoverImage
          className="img"
          src={picture}
          mode="aspectFill"
        />
      </CoverView>
    )
  }
}

export default Loading as ComponentClass<ComponentOwnProps, ComponentState>
