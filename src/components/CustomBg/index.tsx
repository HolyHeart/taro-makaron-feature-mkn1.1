import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import tool from '../../utils/tool'
import './index.less'
import loading from '../../assets/images/pic_loading.png'

type ComponentStateProps = {}

type ComponentOwnProps = {
  onChangeStyle: () => void,
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

interface CustomBg {
  props: IProps;
  throttledStickerOntouchmove: () => void;
  throttledArrowOntouchmove: () => void;
}

class CustomBg extends Component {
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
    scale: 1
  } 

  constructor (props) {
    super(props)    
    this.throttledStickerOntouchmove = this.throttle(this.stickerOntouchmove, 1000/30).bind(this)
  }

  componentWillMount () {
  }

  componentWillReceiveProps (nextProps) {
    // console.log('sticker componentWillReceiveProps', this.props, nextProps)
    let { framePrams, url } = this.props
    let hasChange = false
    if (nextProps.framePrams && nextProps.framePrams.width !== this.props.framePrams.width) {
      framePrams = nextProps.framePrams
      hasChange = true
      // console.log('change framePrams', framePrams)
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

  emitTouchstart = () => {
    const {onTouchstart, stylePrams} = this.props
    typeof onTouchstart === 'function' && onTouchstart(stylePrams)
  }

  emitTouchend = () => {
    const {onTouchend, stylePrams} = this.props
    typeof onTouchend === 'function' && onTouchend(stylePrams)
  }

  stickerOntouchstart = (e) => {   
    // console.log('stickerOntouchstart', e)
    const {gesture} = this
    const {framePrams} = this.state
    const frameOffsetX = framePrams.left
    const frameOffsetY = framePrams.top    
    if (e.touches.length === 1) {
      let { clientX, clientY } = e.touches[0]
      gesture.startX = clientX - frameOffsetX
      gesture.startY = clientY - frameOffsetY
    }
    this.emitTouchstart()
  }

  stickerOntouchmove = (e) => {
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
    }
  }

  stickerOntouchend = (e) => {

    // console.log('stickerOntouchend', e)
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
    const styleObj = this.formatStyle(this.props.stylePrams)
    // console.log('sticker render', this.state.url)
    return (
      <View 
        className='custom-bg-wrap'
        style={styleObj}
      > 
        {this.state.url && 
          <Image 
            src={this.state.url} 
            mode="widthFix" 
            style="width:100%;height:100%"
            onLoad={this.handleImageLoaded}
            onTouchstart={this.stickerOntouchstart} 
            onTouchmove={this.throttledStickerOntouchmove}
            onTouchend={this.stickerOntouchend}
          />
        }
      </View>
    )
  }
}

export default CustomBg as ComponentClass<ComponentOwnProps, ComponentState>