import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Canvas } from '@tarojs/components'
import * as THREE from '../../utils/libs/three.weapp'
import { renderExample1 as renderExample, change } from '../../utils/example.js'
import './index.less'

type ComponentStateProps = {}

type ComponentOwnProps = {
  imageURL: String
}

type ComponentState = {}

type IProps = ComponentStateProps & ComponentOwnProps

interface BankCard {
  props: IProps;
}


class BankCard extends Component { 
  
  THREE: any
  componentDidMount() {
    console.log("hello from bank card component")
    const { imageURL } = this.props
    console.log(imageURL)
    
    const query = Taro.createSelectorQuery().in(this.$scope)
    query
      .select('#c')
      .node((res) => {
        console.log(111, res)
        const canvas = THREE.global.registerCanvas(res.node)
        renderExample(canvas, THREE, imageURL)
        this.THREE = THREE
        console.log(THREE.ObjectLoader, 111)
        console.log(123)
      })
      .exec()
    console.log(0)
  }

  touchStart(e) {
    this.THREE.global.touchEventHandlerFactory('canvas', 'touchstart')(e)
  }
  touchMove(e) {
    this.THREE.global.touchEventHandlerFactory('canvas', 'touchmove')(e)
  }
  touchEnd(e) {
    this.THREE.global.touchEventHandlerFactory('canvas', 'touchend')(e)
  }
  touchCancel(e) {}

  render() {
    
    return (
     <view>
        <Canvas
          type="webgl"
          style={{
            width: `120%`,
            height: '120%',
            position: 'absolute',
            
            zIndex: 99,
          }}
          canvasId="poster"
          className="canvas"
          id="c"
        />
     </view>
    )
  }
}

export default BankCard as ComponentClass<ComponentOwnProps, ComponentState>