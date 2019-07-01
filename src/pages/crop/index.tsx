import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Button, Canvas} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import {getSystemInfo} from "@/model/actions/global"
import globalData from "@/services/global_data";

import './index.less'

type PageStateProps = {
  global: {
    system: object
  }
}

type PageDispatchProps = {
  getSystemInfo: (data:object) => void
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Crop {
  props: IProps;
}

@connect(({ global }) => ({
  global
}), (dispatch) => ({
  getSystemInfo (data) {
    dispatch(getSystemInfo(data))
  }
}))
class Crop extends Component {
  config = {
    disableScroll: true
  }
  components = {
    // panel: Panel,
  }

  mixins = []

  state = {
    iamgePath: '',
    box: {
      width: Taro.getSystemInfoSync().windowWidth,
      height: Taro.getSystemInfoSync().windowWidth,
    },
    img: {
      originWidth: 0, // 图片原始大小
      originHeight: 0,
      autoScale: 1, // 自适应的缩放比
      userScale: 1, // 用户手势后缩放比
      autoX:0,     // 自适应后的x偏移
      autoY:0,
      scale: 1,  // 真实缩放比 （相比原始尺寸）
      autoWidth: 0,
      autoHeight: 0,
      width: 0,  // 变换后的宽
      height: 0, // 变换后的高
      x: 0,  // 与box的X轴偏移
      y: 0,  // 与box的y轴偏移
      offsetX: 0, //图片左上角x实际偏移值
      offsetY: 0, //图片左上角y实际偏移值
    },
    gesture: {
      startX: 0,
      startY: 0,
      zoom: false,
      distance: 0
    },
    transitionDuration: '0.2s',
    canvas: {
      width: 375,
      height: 375,
      ratio: 1
    }
  }

  app = Taro.getApp()

  componentWillMount(): void {
    this.initPage()
    /*
    const {getSystemInfo} = this.props
    const systemInfo = Taro.getSystemInfoSync()
    if (/iphone x/i.test(systemInfo.model)) {
      // iPhone XS Max China-exclusive<iPhone11,6>
      // 'iPhone X'
      systemInfo.isIphoneX = true
    } else {
      systemInfo.isIphoneX = false
    }
    getSystemInfo(systemInfo)
     */
  }

  componentDidMount(): void {
    // this.initPage()
  }

  componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
  }

  componentWillUnmount(): void {
  }

  componentDidShow(): void {
  }

  componentDidHide(): void {
  }

  imageLoad (e) {
    const {detail} = e
    let {img} = this.state
    // this.state.img.originWidth = detail.width
    // this.state.img.originHeight = detail.height
    // console.log('image load', detail)
    this.setState({
      img: {
        ...img,
        originWidth: detail.width,
        originHeight: detail.height
      }
    }, () => {
      this.autoScale()
      console.log('imageLoad', this.state.img)
    })
    // 图片自适应
    // this.autoScale()

  }
  ontouchstart (e) {
    // console.log('ontouchstart', e)
    const {transitionDuration, gesture} = this.state
    this.state.transitionDuration = '0s'
    if (e.touches.length === 1) {
      let { clientX, clientY } = e.touches[0]
      this.state.gesture.startX = clientX
      this.state.gesture.startY = clientY
      // this.touchStartEvent = e.touches;
      // console.log('gesture-one', this.gesture);
    } else {
      let xMove = e.touches[1].clientX - e.touches[0].clientX
      let yMove = e.touches[1].clientY - e.touches[0].clientY
      let distance = Math.sqrt(xMove * xMove + yMove * yMove)

      this.state.gesture.distance = distance
      this.state.gesture.zoom = true
      // console.log('gesture-two', this.gesture);
    }
    this.setState({
      transitionDuration: '0s',
      gesture: {
        ...gesture
      }
    }, () => {
      console.log('ontouchstart', this.state.gesture, this.state.transitionDuration)
    })
  }
  ontouchmove () {
    this.throttle(this.touchmove, 1000/500).bind(this)
    // ontouchmove: this.touchmove,
  }

  ontouchend (e) {
    // console.log('ontouchend', e)
    if (e.touches.length === 0) {
      const {gesture, img, box} = this.state
      const scale = img.scale
      // 如果小于自动缩放时，则还原
      if (img.userScale < 1) {
        // img.scale = img.autoScale
        // let diffScale = img.autoScale - scale
        // img.width = img.scale * img.originWidth
        // img.height = img.scale * img.originHeight
        // img.x = img.autoX
        // img.y = img.autoY
        img.userScale = 1
        // 位移使图片居中
        img.x = img.autoX
        img.y = img.autoY
      }
      // 如果移动超出边界 则还原
      if(!gesture.zoom){
        if (img.offsetX > 0) {
          img.x = 0 - (1 - img.userScale) * img.width * 0.5
          img.offsetX = 0
        }
        if (img.offsetY > 0) {
          img.y = 0 - (1 - img.userScale) * img.height * 0.5
          img.offsetY = 0
        }
        if (box.width - img.width * img.userScale > img.offsetX ) {
          img.x = (box.width - img.width * img.userScale) - (1 - img.userScale) * img.width * 0.5
          img.offsetX = (box.width - img.width  * img.userScale)
        }
        if (box.height - img.height * img.userScale > img.offsetY ) {
          img.y = (box.width - img.height * img.userScale) - (1 - img.userScale) * img.height * 0.5
          img.offsetY = (box.width - img.height  * img.userScale)
        }
      }
      //重置缩放状态
      this.state.transitionDuration = '0.15s'
      gesture.zoom = false
      this.setState({
        transitionDuration: '0s',
        gesture: {
          ...gesture
        }
      }, () => {
        console.log('ontouchend', this.state.gesture, this.state.transitionDuration)
      })
    }
    // console.log('end', this.state.img)
  }
  generateImage () {
    Taro.showLoading({
      title: "正在生成图片",
      mask: true,
    })
    this.createCanvas()
  }
  async back () {
    Taro.navigateBack({delta: 1})
    // await this.chooseImg()
    // this.initPage()
  }

  initPage () {
    /// const {globalData} = this.app
    const demo = [
      "http://tmp/wx21630a5d4651096a.o6zAJsztn2DIgXEGteELseHpiOtU.NKidKasfEbMa5fa447cdf99ebe9bdfaff42b8dee3019.jpg",
    ]
    const demo1 = ["https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561701969834&di=d5b1269d072f0124f4a72910695efc92&imgtype=0&src=http%3A%2F%2Fpic37.nipic.com%2F20140113%2F8800276_184927469000_2.png"]
    // this.state.iamgePath = globalData.choosedImagePath || demo[0]
    this.state.iamgePath = demo1[0]
    // console.log('wx.getSystemInfoSync().windowWidth', wx.getSystemInfoSync())
    // 计算canvas尺寸
    const { pixelRatio = 2 } = Taro.getSystemInfoSync() || {}
    const {img, box, canvas} = this.state
    canvas.ratio = pixelRatio
    canvas.width = pixelRatio * box.width
    canvas.height = pixelRatio * box.height
  }

  // 重选照片
  async chooseImg () {
    let choosedImagePath: any
    try {
      const {tempFilePaths: [path]} = await Taro.chooseImage({count: 1,sizeType: ['compressed']})
      choosedImagePath = path
    } catch (error) {
      console.log('catch-error: chooseImage-fail', error)
      return
    }
    // const {globalData} = this.app
    globalData.choosedImagePath = choosedImagePath
    console.log('globalData', globalData)
  }

  // 自适应图片
  autoScale () {
    // 获取图片原始大小
    const {originWidth, originHeight} = this.state.img
    const boxWidth = this.state.box.width
    const minSize = Math.min(originWidth, originHeight)
    const autoScale = boxWidth / minSize
    console.log('auto-scale', autoScale)
    this.state.img.width = this.state.img.autoWidth = originWidth * autoScale
    this.state.img.height = this.state.img.autoHeight = originHeight * autoScale
    this.state.img.scale = this.state.img.autoScale = autoScale
    // 位移使图片居中
    this.state.img.x -= (originWidth*autoScale - boxWidth) * 0.5
    this.state.img.y -= (originHeight*autoScale - boxWidth) * 0.5
    this.state.img.autoX = this.state.img.x
    this.state.img.autoY = this.state.img.y
    this.state.img.offsetX = this.state.img.x
    this.state.img.offsetY = this.state.img.y
    //用于更新this.state.img，不可删去
    this.setState({})
  }

  touchmove (e) {
    // console.log('ontouchmove', e)
    if (e.touches.length === 1) {
      //单指移动
      if (this.state.gesture.zoom) {
        //缩放状态，不处理单指
        return;
      }
      const {gesture, img} = this.state
      let { clientX, clientY } = e.touches[0];
      let offsetX = clientX - gesture.startX;
      let offsetY = clientY - gesture.startY;
      gesture.startX = clientX;
      gesture.startY = clientY;

      img.x += offsetX
      img.y += offsetY
      img.offsetX += offsetX
      img.offsetY += offsetY
    } else {
      //双指缩放
      const {gesture, img} = this.state
      let xMove = e.touches[1].clientX - e.touches[0].clientX;
      let yMove = e.touches[1].clientY - e.touches[0].clientY;
      let distance = Math.sqrt(xMove * xMove + yMove * yMove);

      // 计算新的缩放比
      let distanceDiff = distance - gesture.distance;
      let diffScale =  0.004 * distanceDiff
      let newScale = img.userScale + diffScale;
      if (newScale * img.width < 100) {
        return
      }
      // let newWidth = newScale * img.originWidth;
      // let newHeight = newScale * img.originHeight;
      // console.log('newWidth', newWidth, 'newHeight', newHeight)

      gesture.distance = distance
      img.userScale = newScale
      // img.width = newWidth
      // img.height = newHeight
      // 位移变化。使放大中心为图片中心
      // img.x = img.x - diffScale * img.originWidth *0.5
      // img.y = img.y - diffScale * img.originHeight *0.5
      img.offsetX = img.width * (1 - img.userScale) * 0.5 + img.x
      img.offsetY = img.height * (1 - img.userScale) * 0.5 + img.y
    }
  }
  // 函数截留
  throttle(func, deltaX) {
    let lastCalledAt = new Date().getTime();
    let that = this;
    return function(e) {
      if(new Date().getTime() - lastCalledAt >= deltaX) {
        func.apply(that, arguments);
        lastCalledAt = new Date().getTime();
      }
    }
  }
  // 生成canvas
  createCanvas () {
    // const _this = this;
    const {img, box, canvas} = this.state;
    const choosedImagePath = this.state.iamgePath;
    const context = Taro.createCanvasContext('mycanvas');
    const { ratio } = canvas
    const {width, height, offsetX, offsetY, userScale} = img
    //防止锯齿，绘的图片是所需图片的两倍
    context.drawImage(choosedImagePath, offsetX * ratio, offsetY * ratio, width * userScale * ratio, height * userScale * ratio)
    // context.drawImage(choosedImagePath, 0, 0, 0, 0, offsetX * ratio, offsetY * ratio, width * userScale * ratio, height * userScale * ratio)

    //绘制图片
    context.draw();

    const that = this
    //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
    setTimeout(function () {
      Taro.canvasToTempFilePath({
        canvasId: 'mycanvas',
        success: function (res) {
          let tempFilePath = res.tempFilePath;
          console.log('tempFilePath', tempFilePath);
          // const {globalData} = _this.app
          globalData.cropedImagePath = tempFilePath
          console.log('globalData', globalData)
          // 跳转裁剪后页面
          Taro.hideLoading()
          // wx.navigateTo({url: `/pages/waiting`})
          Taro.redirectTo({url: '/pages/waiting/index'})
        },
        fail: function (res) {
          console.log(res)
        },
        complete:function(){
          // wx.hideLoading();
        }
      });
    }, 200);
  }

  test () {
    console.log(this.state.img)
    console.log(this.state.iamgePath)
  }

  render () {
    const {iamgePath, box, img, gesture, transitionDuration, canvas} = this.state
    return(
      <View className="page-crop">
        <View className="header"></View>
        <View
          className="main"
          style={`width:${box.width}px; height:${box.height}px`}
          onTouchStart={this.ontouchstart}
          onTouchMove={this.ontouchmove}
          onTouchEnd={this.ontouchend}>
          <View className="image-wrap" style={`transform: translate(${img.x}px, ${img.y}px) scale(${img.userScale});transition-duration: ${transitionDuration};`}>
            <Image src={iamgePath} style={`width:${img.width}px;height:${img.height}px`} onLoad={this.imageLoad} />
          </View>
        </View>
        <View className="footer">
          <View className="word">调整画面位置</View>
          <View className="button red generate" onClick={this.generateImage}>生成</View>
          <View className="button black" onClick={this.back}>重选</View>
        </View>
        <View className="canvas-wrap">
          <Canvas style={`width: ${canvas.width}px; height: ${canvas.height}px;border: 1px solid #000`} canvasId="mycanvas"/>
        </View>
      </View>
    )
  }
}

export default Crop as ComponentClass<PageOwnProps, PageState>
