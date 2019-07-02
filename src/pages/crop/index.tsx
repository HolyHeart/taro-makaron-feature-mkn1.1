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
  constructor (props) {
    super(props)
    this.throttledStickerOntouchmove = this.throttle(this.touchmove, 1000/30).bind(this)
  }
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
  }

  throttle = (func, deltaX) => {
    let lastCalledAt = new Date().getTime()
    let that = this
    return function () {
      if(new Date().getTime() - lastCalledAt >= deltaX) {
        func.apply(that, arguments)
        lastCalledAt = new Date().getTime()
      } else {
        // console.log('不执行')
      }
    }
  }
  componentDidMount(): void {
    this.initPage()
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
    console.log('ontouchstart', e)
    const { gesture } = this.state
    if (e.touches.length === 1) {
      let { clientX, clientY } = e.touches[0]
      this.setState({
        gesture: {
          ...gesture,
          startX:clientX,
          startY:clientY
        }
      }, () => {
        console.log('ontouchstart', this.state.gesture, this.state.transitionDuration)
      })
      // this.touchStartEvent = e.touches;
      // console.log('gesture-one', this.gesture);
    } else {
      let xMove = e.touches[1].clientX - e.touches[0].clientX
      let yMove = e.touches[1].clientY - e.touches[0].clientY
      let distance = Math.sqrt(xMove * xMove + yMove * yMove)
      this.setState({
        gesture: {
          ...gesture,
          distance:distance,
          zoom:true
        }
      }, () => {
        console.log('ontouchstart', this.state.gesture, this.state.transitionDuration)
      })
    }
  }
  throttledStickerOntouchmove (e) {
    this.touchmove(e)
  }

  ontouchend (e) {
    // console.log('ontouchend', e)
    if (e.touches.length === 0) {
      const {gesture, img, box} = this.state

      // const scale = img.scale
      // 如果小于自动缩放时，则还原
      if (img.userScale < 1) {
        // img.userScale = 1
        // img.x = img.autoX
        // img.y = img.autoY
        this.setState({
          img:{
            ...img,
            userScale:1,
            x:img.autoX,
            y:img.autoY
          }
        })
      }
      // 如果移动超出边界 则还原
      if(!gesture.zoom){
        if (img.offsetX > 0) {
          this.setState({
             img:{
               ...img,
               x:0 - (1 - img.userScale) * img.width * 0.5,
               offsetX:0
             }
          })
        }
        if (img.offsetY > 0) {
          this.setState({
            img:{
              ...img,
              y:0 - (1 - img.userScale) * img.height * 0.5,
              offsetY:0
            }
          })
        }
        if (box.width - img.width * img.userScale > img.offsetX ) {
          this.setState({
            img:{
              ...img,
              x:(box.width - img.width * img.userScale) - (1 - img.userScale) * img.width * 0.5,
              offsetX :(box.width - img.width * img.userScale)
            }
          })
        }
        if (box.height - img.height * img.userScale > img.offsetY ) {
          this.setState({
            img:{
              ...img,
              y:(box.width - img.width * img.userScale) - (1 - img.userScale) * img.height * 0.5,
              offsetY :(box.width - img.height * img.userScale)
            }
          })
        }
      }
      this.setState({
        transitionDuration: '0.15s',
        gesture: {
          ...gesture,
          zoom:false
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
    const demo1 = ["https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561701969834&di=d5b1269d072f0124f4a72910695efc92&imgtype=0&src=http%3A%2F%2Fpic37.nipic.com%2F20140113%2F8800276_184927469000_2.png"] //test img
    // this.state.iamgePath = globalData.choosedImagePath || demo[0]
    // this.state.iamgePath = demo1[0]
    // console.log('wx.getSystemInfoSync().windowWidth', wx.getSystemInfoSync())
    // 计算canvas尺寸
    const { pixelRatio = 2 } = Taro.getSystemInfoSync() || {}
    const { box, canvas } = this.state
    const CanvasW = pixelRatio * box.width
    const CanvasH = pixelRatio * box.height
    this.setState({
      iamgePath:demo1[0],
      canvas:{
        ...canvas,
        width:CanvasW,
        height:CanvasH,
        ratio:pixelRatio,
      }
    })
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
    // auto const size
    const justWidth = originWidth * autoScale
    const justHeight = originHeight * autoScale
    const justX = this.state.img.x -((originWidth*autoScale - boxWidth) * 0.5)
    const justY = this.state.img.y -((originHeight*autoScale - boxWidth) * 0.5)
    // const justX =
    this.setState({
      transitionDuration : '0s',
      img:{
        ...this.state.img,
        width:justWidth,
        height:justHeight,
        scale:autoScale,
        x:justX,
        y:justY,
        autoX:justX,
        autoY:justY,
        offsetX:justX,
        offsetY:justY,
      }
    })
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
      this.setState({
        img:{
          ...img,
          x:img.x+offsetX,
          y:img.y+offsetY,
          offsetX:img.offsetX+offsetX,
          offsetY:img.offsetY+offsetY
        }
      })
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
      gesture.distance = distance
      img.userScale = newScale
      img.offsetX = img.width * (1 - img.userScale) * 0.5 + img.x
      img.offsetY = img.height * (1 - img.userScale) * 0.5 + img.y

      this.setState({
          img:{
            ...img,
            userScale:newScale,
            offsetX:img.width * (1 - newScale) * 0.5 + img.x,
            offsetY:img.height * (1 - newScale) * 0.5 + img.y
          }
      })
    }
  }
  // 函数截留
  throttle(func, deltaX) {
    let lastCalledAt = new Date().getTime();
    let that = this;
    return function(e) {
      if(new Date().getTime() - lastCalledAt >= deltaX) {
        console.log('go back')
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
          onTouchMove={this.throttledStickerOntouchmove}
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
