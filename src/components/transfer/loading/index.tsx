import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import tool from '@/utils/tool.js'
import './index.less'
class Loading extends Component {
  state = {
    frame: '00001',
    intervalId: undefined,
    bgSrc: '/loading-css-sprite.png'
  }

  events = {}

  app = Taro.getApp()

  start () {
    if (this.state.intervalId){
      clearInterval(this.state.intervalId)
    }
    this.state.intervalId = setInterval(() => {
      let frame = Math.floor((+new Date()) % (49 * 150) / 150).toString()
      frame = tool.padStart(frame, 5, '0')
      if (frame !== this.state.frame) {
        this.state.frame = frame
        this.$apply()
      }
      // console.log('loading', frame)
    }, 90)
  }
  stop () {
    clearInterval(this.state.intervalId)
  }
  onShow () {
    this.start()
  }
  onHide () {
    this.stop()
  }
  render () {

    return (
      <view
        className="loading-{{frame}}"
        style="background-image:url('https://static01.versa-ai.com/mini-program/loading-css-sprite.png');background-size:210rpx 11270rpx;width:190rpx;height:210rpx"
      >
      </view>
    )
  }
}
