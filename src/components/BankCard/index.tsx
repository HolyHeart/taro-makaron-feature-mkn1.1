import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Canvas } from '@tarojs/components'
import * as THREE from '../../utils/libs/three.weapp'
import {
  renderExample1 as renderExample,
  change,
  stop,
} from '../../utils/example.js'
import './index.less'

type ComponentStateProps = {}

type ComponentOwnProps = {
  imageURL: string
  gltfURL: string
}

type ComponentState = {}

type IProps = ComponentStateProps & ComponentOwnProps

interface BankCard {
  props: IProps
}

class BankCard extends Component {
  _imageUrl: string
  THREE: any

  componentDidUpdate() {
    console.log('change', this._imageUrl, this.props.imageURL)
    if (this._imageUrl !== this.props.imageURL) {
      change(this.props.imageURL)
    }
    this._imageUrl = this.props.imageURL
  }
  componentDidMount() {
    console.log('hello from bank card component')
    const { gltfURL, imageURL } = this.props

    const query = Taro.createSelectorQuery().in(this.$scope)
    query
      .select('#c')
      .node((res) => {
        console.log(111, res)
        const canvas = THREE.global.registerCanvas(res.node)
        this._imageUrl = imageURL
        renderExample(canvas, THREE, gltfURL, imageURL,true)
        this.THREE = THREE
      })
      .exec()
    console.log(0)
  }

  stopPropagation(e){
    e.stopPropagation()
  }

  touchStart(e) {
    stop()
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
      <View className="bankCard" onTouchStart={this.stopPropagation}>
        <Canvas
          type="webgl"
          style={{
            width: `100%`,
            height: '100%',
          }}
          canvasId="poster"
          className="canvas"
          id="c"
          onTouchStart={this.touchStart}
          onTouchMove={this.touchMove}
          onTouchEnd={this.touchEnd}
          onTouchCancel={this.touchCancel}
        />
      </View>
    )
  }
}

export default BankCard as ComponentClass<ComponentOwnProps, ComponentState>
