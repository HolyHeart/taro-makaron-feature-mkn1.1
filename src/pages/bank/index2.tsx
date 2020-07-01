import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Image, Canvas, WebView } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { getSystemInfo } from '@/model/actions/global'
import tool from '@/utils/tool'
import work from '@/utils/work'
import Title from '@/components/Title'
import CustomIcon from '@/components/Icon'
import globalData from '@/services/global_data'
import './index.less'
// import { createScopedThreejs } from 'threejs-miniprogram'
import * as THREE from '../../utils/libs/three.weapp'
import renderExample from '../../utils/example.js'

type PageStateProps = {
  global: {
    system: object
  }
}

type PageDispatchProps = {
  getSystemInfo: (data: object) => void
}

type PageOwnProps = {}

type PageState = {
  foreground: {
    remoteUrl: string
    zIndex: number
    width: number
    height: number
    x: number
    y: number
    rotate: number
    originWidth: number
    originHeight: number
    autoWidth: number
    autoHeight: number
    autoScale: number
    fixed: boolean
    visible: boolean
  }
  coverList: Array<object>
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Editor {
  props: IProps
}

class Editor extends Component {
  config: Config = {
    navigationBarTitleText: '懒人抠图',
    disableScroll: true,
    enablePullDownRefresh: false,
  }

  state = {
    rawImage: {
      localUrl: '',
      remoteUrl: '',
    },
    content: '',
    isshow: false,
    cancelText: '取消',
    confirmText: '看广告',
    frame: {
      width: 0,
      height: 0,
      left: 0,
      top: 0,
    },
    customBg: {
      localUrl: '',
      remoteUrl: '',
      originWidth: 0,
      originHeight: 0,
      autoScale: 1,
      autoWidth: 0,
      autoHeight: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      rotate: 0,
    },
    chooseText: '添加人像照片',
    foreground: {
      id: 'foreground',
      remoteUrl: '',
      zIndex: 2,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      rotate: 0,
      originWidth: 0, // 原始宽度
      originHeight: 0, // 原始高度
      autoWidth: 0, // 自适应后的宽度
      autoHeight: 0, // 自适应后的高度
      autoScale: 0, // 相对画框缩放比例
      fixed: false, // 是否固定
      isActive: true, // 是否激活
      loaded: false, // 是否加载完毕
      visible: true, // 是否显示
    },
    coverList: [
      // {
      // id: 'cover-01',
      // remoteUrl: 'https://static01.versa-ai.com/images/process/segment/2019/01/07/a102310e-122a-11e9-b5ef-00163e023476.png',
      // originHeight: 2440,
      // originWidth: 750,
      // autoHeight: 244,
      // autoScale: 0.1,
      // autoWidth: 75,
      // width: 57.378244033967235,
      // height:186.6705539238401,
      // x: 185.1442062300867,
      // y: 155.66472303807996,
      // rotate: -25.912119928692746,
      // zIndex: 3,
      // fixed: false, // 是否固定
      // isActive: false, // 是否激活
      // visible: true, // 是否显示
      // }
    ],
    sceneList: [],
    guiderTop: '',
    hasGuide: false,
    currentScene: {
      type: 'recommend', // 'custom' 'recommend'
    },
    canvas: {
      id: 'shareCanvas',
      ratio: 3,
    },
    loading: false,
    result: {
      show: false,
      shareImage: {
        remoteUrl: '',
        localUrl: '',
      },
    },
    drawBoard: {
      width: '690rpx',
      height: '920rpx',
    },
    ableToShareToQZone: false,
  }

  app = Taro.getApp()

  // 全局主题数据
  themeData = {
    sceneList: [],
    rawCoverList: [], // 原始贴纸数据
  }

  // cache = {
  //     foreground: createCache('foreground'),
  //     cover: createCache('cover'),
  //     source: createCache('source')
  // };

  isSaving = false // 是否正在保存
  saveNumber = {
    number: 0,
    date: 0,
  }

  THREE: any

  componentDidMount() {
    // console.log(THREE.WebGLRenderer, 111)
    // const cvsCtx = Taro.createCanvasContext('c', this.$scope)
    // console.log(cvsCtx, 222)
    // const render = new THREE.WebGLRenderer({
    //   context: cvsCtx,
    //   antialias: true,
    // })

    const query = Taro.createSelectorQuery().in(this.$scope)
    query
      .select('#c')
      .node((res) => {
        // const canvas = res[0].node
        // console.log(res)
        // const THREE = createScopedThreejs(canvas)
        // renderExample(canvas, THREE)
        // this.THREE = THREE
        console.log(111, res)
        const canvas = THREE.global.registerCanvas(res.node)
        renderExample(canvas, THREE)
        this.THREE = THREE
        console.log(123)
      })
      .exec()
    console.log(0)
  }

  render() {
    return (
      <View className="page-editor">
        <Canvas
          type="webgl"
          onTouchStart={this.touchStart}
          onTouchMove={this.touchMove}
          onTouchEnd={this.touchEnd}
          onTouchCancel={this.touchCancel}
          style={{
            width: `100%`,
            height: '100%',
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 99,
          }}
          canvasId="poster"
          className="canvas"
          id="c"
        />
      </View>
    )
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
}

export default Editor as ComponentClass<PageOwnProps, PageState>
