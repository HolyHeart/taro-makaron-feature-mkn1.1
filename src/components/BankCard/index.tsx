import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Canvas } from '@tarojs/components'
import THREE from '../../utils/libs/three.weapp'
import {
  renderExample1 as renderExample,
  change,
  stop,
  update,
  begin
} from '../../utils/example.js'
import './index.less'

type ComponentStateProps = {}

type ComponentOwnProps = {
  imageURL: string
  gltfURL: string
  screenWidth: number
}

type ComponentState = {}

type IProps = ComponentStateProps & ComponentOwnProps

interface BankCard {
  props: IProps
}


class BankCard extends Component {
  _imageUrl: string
  THREE: any
  moveX:number
  lastMoveX: number
  offsetX: number
  moveY:number
  lastMoveY: number
  offsetY: number

  componentWillUnmount(){
      console.log('uuuuuu')
  }

  componentDidUpdate() {
    if (this._imageUrl !== this.props.imageURL) {
      change(this.props.imageURL)
      stop();
      begin();
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
        // THREE.global.unregisterCanvas(res.node);
        const canvas = THREE.global.registerCanvas(res.node)
        this._imageUrl = imageURL
        renderExample(canvas, THREE, gltfURL, imageURL,true,this.props.screenWidth)
        this.THREE = THREE
      })
      .exec()
  }

  stopPropagation(e){
    e.stopPropagation()
  }

  touchStart(e) {
    stop()
    this.lastMoveX = e.touches[0].x;
    this.lastMoveY = e.touches[0].y;
  }
  touchMove(e) {
    this.moveX = e.touches[0].x;
    this.offsetX = this.moveX - this.lastMoveX;
    this.lastMoveX = this.moveX;
    this.moveY= e.touches[0].y;
    this.offsetY = this.moveY - this.lastMoveY;
    this.lastMoveY = this.moveY;
    update(this.offsetX,this.offsetY);
  }
  touchEnd(e) {
    this.startX = this.moveX = this.offsetX = 0;
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
