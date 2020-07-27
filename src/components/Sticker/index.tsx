import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Image,Button } from '@tarojs/components'
import tool from '../../utils/tool'
import './index.less'
import loading from '../../assets/images/pic_loading.png'
import scale from '../../assets/images/scale.png'
import close from '@/assets/images/icon_close_dark.png'
import mirror from '@/assets/images/Sticker_Flip.png'

type ComponentStateProps = {}

type ComponentOwnProps = {
  onChangeStyle: (data:any) => void,
  onTouchend: (data?:any) => void,
  onTouchstart: (data?:any) => void,
  onImageLoaded?: (detail:object, item?:any) => void,
  onDeleteSticker?:(item?:any) => void,
  url: string,
  stylePrams: object
}

type ComponentState = {
  framePrams: {
    width: number,
    height: number,
    left: number,
    top: number,
  },
  url: string
}

type IProps = ComponentStateProps & ComponentOwnProps

interface Sticker {
  props: IProps;
  throttledStickerOntouchmove: () => void;
  throttledArrowOntouchmove: () => void;
}

class Sticker extends Component {
  static defaultProps = {
    url: loading,
    stylePrams: {
      id: '',
      zIndex: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      rotate: 0,
      originWidth: 0, // 原始宽度
      originHeight: 0, // 原始高度
      autoWidth: 0, // 自适应后的宽度
      autoHeight: 0, // 自适应后的高度
      autoScale: 1, // 相对画框缩放比例
      fixed: false, // 是否固定
      isActive: false, // 是否激活
      visible: true, // 是否显示
      deleteable: false, //是否可以删除
      isMirror: false

    },
    framePrams: {
      width: 0,
      height: 0,
      left: 0,
      top: 0,
    },
  }

  state = {
    framePrams: {
      width: 0,
      height: 0,
      left: 0,
      top: 0,
    },
    url: this.props.url,
  }

  gesture = {
    startX: 0,
    startY: 0,
    zoom: false,
    distance: 0,
    preV: {x:null, y:null},
    center: {x:0, y:0}, // 中心点y坐标
    scale: 1,
  }

  constructor (props) {
    super(props)
    this.throttledStickerOntouchmove = this.throttle(this.stickerOntouchmove, 16.7).bind(this)
    this.throttledArrowOntouchmove = this.throttle(this.arrowOntouchmove, 16.7).bind(this)
  }

  componentWillMount () {
  }

  mirrorOntouchstart(){
      let isMirror = !this.props.stylePrams.isMirror;
      this.changeStyleParams({
        isMirror
      })
  }

  componentWillReceiveProps (nextProps) {
    let { framePrams, url } = this.props//远端url传过来
    //framPrams width 294 height 392 left 13 top 73
    let hasChange = false
    if (nextProps.framePrams && nextProps.framePrams.width !== this.props.framePrams.width) {
      framePrams = nextProps.framePrams
      hasChange = true
      // console.log('change framePrams', framePrams)·
    }

    if (nextProps.url !== this.props.url) {
      url = nextProps.url
      hasChange = true
      // console.log('change url', url)
    }

    if (hasChange) {
      // console.log('sticker componentWillReceiveProps', 'next-'+nextProps.url, 'last'+this.props.url)
      this.setState({
        framePrams,
        url
      }, () => {
        // console.log('sticker update state', this.state)
      })
    }
  }

  isFixed = () => {
    const {stylePrams} = this.props;

    //console.log(stylePrams,'this is stylePrams from Editor!!!') 图片的属性；原大小-自动大小-实时大小

    console.log(stylePrams.fixed,'this is stylePrams')
    return stylePrams.fixed || false
  }

  emitTouchstart = () => {
    const {onTouchstart, stylePrams} = this.props
    typeof onTouchstart === 'function' && onTouchstart(stylePrams)
  }

  emitTouchend = () => {
    const {onTouchend, stylePrams} = this.props
    typeof onTouchend === 'function' && onTouchend(stylePrams)
  }

  stickerOntouchstart = (e) => {
    e.stopPropagation()
    if (this.isFixed()) {
      // 若固定则不能移动
      return
    }
    //console.log('!!! stickerOntouchstart !!!', e)
    const {gesture} = this
    const {framePrams} = this.state
    const frameOffsetX = framePrams.left
    const frameOffsetY = framePrams.top
    if (e.touches.length === 1) {
      let { clientX, clientY } = e.touches[0]
      gesture.startX = clientX - frameOffsetX
      gesture.startY = clientY - frameOffsetY
      // console.log('gesture-one', gesture)
    } else {
      let xMove = e.touches[1].clientX - e.touches[0].clientX
      let yMove = e.touches[1].clientY - e.touches[0].clientY
      let distance = Math.sqrt(xMove * xMove + yMove * yMove)
      // 记录旋转
      let v = { x: xMove, y: yMove }
      gesture.preV = v
      gesture.distance = distance
      gesture.zoom = true
      // console.log('双指缩放', gesture)
    }
    this.emitTouchstart()
  }

  stickerOntouchmove = (e) => {
    if (this.isFixed()) {
      // 若固定则不能移动
      return
    }
    // console.log('stickerOntouchmove', e)
    const {gesture} = this
    const {stylePrams} = this.props
    const {framePrams} = this.state
    const frameOffsetX = framePrams.left
    const frameOffsetY = framePrams.top

    if (e.touches.length === 1) {
      //单指移动
      if (gesture.zoom) {
        //缩放状态，不处理单指
        // console.log('不能移动')
        return
      }
      let { clientX, clientY } = e.touches[0];
      const pointX = clientX - frameOffsetX // 触摸点所在画框坐标系的x坐标
      const pointY = clientY - frameOffsetY // 触摸点所在画框坐标系的y坐标
      let offsetX = pointX - gesture.startX;
      let offsetY = pointY - gesture.startY;
      gesture.startX = pointX;
      gesture.startY = pointY;
      this.changeStyleParams({
        offsetX,
        offsetY
      }, 'offset')
    } else {
      //双指缩放
      let xMove = e.touches[1].clientX - e.touches[0].clientX;
      let yMove = e.touches[1].clientY - e.touches[0].clientY;
      let distance = Math.sqrt(xMove * xMove + yMove * yMove);

      // 计算缩放
      let distanceDiff = distance - gesture.distance;
      let newScale = gesture.scale + 0.005 * distanceDiff;
      // console.log('newScale', newScale)
      if (newScale < 0.3) {
        newScale = 0.3;
      }
      if (newScale > 4) {
        newScale = 4;
      }
      let newWidth = newScale * stylePrams.autoWidth
      let newHeight = newScale * stylePrams.autoHeight
      let newX = stylePrams.x - (newWidth - gesture.scale * stylePrams.autoWidth) * 0.5
      let newY = stylePrams.y - (newHeight - gesture.scale * stylePrams.autoHeight) * 0.5

      // 计算旋转
      let newRotate = 0
      let preV = gesture.preV
      let v = {
        x: xMove,
        y: yMove
      }
      if (preV.x !== null) {
        let angle = tool.getRotateAngle(v, preV)
        newRotate = parseFloat(stylePrams.rotate) + angle
      }
      // 更新数据
      gesture.scale = newScale
      gesture.distance = distance
      gesture.preV = v
      this.changeStyleParams({
        ...stylePrams,
        width: newWidth,
        height: newHeight,
        x : newX,
        y : newY,
        rotate: newRotate
      })
    }
  }

  stickerOntouchend = (e) => {
    if (this.isFixed()) {
      // 若固定则不能移动
      return
    }
    // console.log('stickerOntouchend', e)
    if (e.touches.length === 0) {
      //重置缩放状态
      this.gesture.zoom = false
    }
    this.emitTouchend()
  }

  arrowOntouchstart = (e) => {
    e.stopPropagation()
    if (this.isFixed()) {
      // 若固定则不能移动
      return
    }
    const {gesture} = this
    const {stylePrams} = this.props //是foreground传过来的
    const {framePrams} = this.state
    const frameOffsetX = framePrams.left
    const frameOffsetY = framePrams.top
    const center = tool.calcCenterPosition(stylePrams.x, stylePrams.y, stylePrams.width, stylePrams.height)
    if (e.touches.length === 1) {
      let { clientX, clientY } = e.touches[0]
      gesture.startX = clientX - frameOffsetX
      gesture.startY = clientY - frameOffsetY
      // console.log('gesture-one', gesture)
      let xMove = clientX - frameOffsetX - center.x;
      let yMove = clientY - frameOffsetY -center.y;
      let distance = Math.sqrt(xMove * xMove + yMove * yMove);
      // 记录旋转
      let v = { x: xMove, y: yMove }
      gesture.distance = distance
      gesture.zoom = true
      gesture.preV = v
      gesture.center = center
    }
    this.emitTouchstart()
  }

  arrowOntouchmove = (e) => {
    if (this.isFixed()) {
      // 若固定则不能移动
      return
    }
    // console.log('arrowOntouchmove', e)
    const {gesture} = this
    const {stylePrams} = this.props
    const {center} = gesture
    const {framePrams} = this.state
    const frameOffsetX = framePrams.left
    const frameOffsetY = framePrams.top
    if (e.touches.length === 1) {
      let xMove = e.touches[0].clientX - frameOffsetX - center.x
      let yMove = e.touches[0].clientY - frameOffsetY - center.y
      let distance = Math.sqrt(xMove * xMove + yMove * yMove)
      // 计算缩放
      let distanceDiff = distance - gesture.distance;
      let newScale = gesture.scale + 0.005 * distanceDiff;
      if (newScale < 0.2) {
        newScale = 0.2;
      }
      if (newScale > 4) {
        newScale = 4;
      }
      let newWidth = newScale * stylePrams.autoWidth
      let newHeight = newScale * stylePrams.autoHeight
      let newX = stylePrams.x - (newWidth - gesture.scale * stylePrams.autoWidth) * 0.5
      let newY = stylePrams.y - (newHeight - gesture.scale * stylePrams.autoHeight) * 0.5

      // 计算旋转
      let newRotate
      let preV = gesture.preV
      let v = {
        x: xMove,
        y: yMove
      }
      if (preV.x !== null) {
        let angle = tool.getRotateAngle(v, preV)
        newRotate = parseFloat(stylePrams.rotate) + angle
      }
      // 更新数据
      gesture.scale = newScale
      gesture.distance = distance
      gesture.preV = v

      stylePrams.width = newWidth
      stylePrams.height = newHeight
      stylePrams.x = newX
      stylePrams.y = newY
      stylePrams.rotate = newRotate

      this.changeStyleParams({
        ...stylePrams,
        width: newWidth,
        height: newHeight,
        x : newX,
        y : newY,
        rotate: newRotate
      })
    }
  }

  arrowOntouchend = (e) => {
    if (this.isFixed()) {
      // 若固定则不能移动
      return
    }
    // console.log('arrowOntouchend', e)
    if (e.touches.length === 0) {
      //重置缩放状态
      this.gesture.zoom = false
    }
    this.emitTouchend()
  }

  handleImageLoaded = (e) => {
    const { onImageLoaded, stylePrams } = this.props
    onImageLoaded && onImageLoaded(e.detail, stylePrams)
  }

  handleDeleteSticker = () => {
    const { onDeleteSticker, stylePrams } = this.props
    typeof onDeleteSticker === 'function' && onDeleteSticker(stylePrams)
  }

  changeStyleParams = (obj:any, type?:string) => {
    const {stylePrams} = this.props
    const {onChangeStyle} = this.props
    let newStylePrams:any = null
    if (type === 'offset') {
      const {offsetX, offsetY} = obj
      newStylePrams = {
        ...stylePrams,
        x: stylePrams.x + offsetX,
        y: stylePrams.y + offsetY,
      }
    } else {
      newStylePrams = {
        ...stylePrams,
        ...obj
      }
    }
    typeof onChangeStyle === 'function' && onChangeStyle(newStylePrams)
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

  formatStyle = (style) => {
    const {zIndex, width, height, x, y, rotate} = style
    return {
      zIndex: zIndex,
      width:`${width}px`,
      height:`${height}px`,
      transform: `translate(${x}px, ${y}px) rotate(${rotate}deg)`
    }
  }

  render() {
    const { stylePrams } = this.props

    //console.log(stylePrams,'this is actual foreground from sticker')

    const styleObj = this.formatStyle(this.props.stylePrams)
    //console.log(styleObj,'this is styleObj this is styleObj');
    // console.log('sticker render', this.state.url)
    return (
      <View
        className={`sticker-wrap ${stylePrams.fixed ? 'event-through' : ''} ${(stylePrams.visible && stylePrams.width > 0) ? '' : 'hidden' } ${stylePrams.isActive ? 'canChange':''}`}
        style={styleObj}
      >
        
        {/* <View style="position: absolute;left:0;top:0">{framePrams.width}</View> */}
        {/* <View style="position: absolute;left:0;top:20px">{stylePrams.autoWidth}</View> */}
        {/* <View style="position: absolute;left:0;top:20px">{stylePrams.width}</View>  */}
        {this.state.url &&
          <Image
            src={this.state.url}
            mode="scaleToFill"
            style="width:100%;height:100%"
            onLoad={this.handleImageLoaded}
            onTouchstart={this.stickerOntouchstart}
            onTouchmove={this.throttledStickerOntouchmove}
            onTouchend={this.stickerOntouchend}
            className={this.props.stylePrams.isMirror ? 'isMirror' : ''}
          />
        }
        <View className={`border ${stylePrams.isActive ? 'active' : ''}`}></View>
        <View className={`control move ${stylePrams.isActive ? 'active' : ''}`}
          onTouchstart={this.arrowOntouchstart}
          onTouchmove={this.throttledArrowOntouchmove}
          onTouchend={this.arrowOntouchend}
        >
          <Image src={scale} mode="widthFix" style="width:100%;height:100%"/>
        </View>
        {stylePrams.deleteable &&
          <View className={`control close ${stylePrams.isActive ? 'active' : ''}`}
            onClick={this.handleDeleteSticker}
          >
            <Image src={close} mode="widthFix" style="width:80%;height:80%" />
          </View>
        }
        <View className={`control mirror ${stylePrams.isActive ? 'active' : ''}`}
          onTouchstart={this.mirrorOntouchstart}
        //   onTouchmove={this.throttledArrowOntouchmove}
        //   onTouchend={this.arrowOntouchend}
        >
          <Image src={mirror} mode="widthFix" style="width:100%;height:100%"/>
        </View>
      </View>
    )
  }
}

export default Sticker as ComponentClass<ComponentOwnProps, ComponentState>
