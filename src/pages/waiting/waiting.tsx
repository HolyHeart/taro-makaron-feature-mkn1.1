<template>
  <view class="page-waiting">
<view class="main">
<image class="image {{loading?'blur':''}}" src="{{iamgePath}}"/>
<view class="loading-wrap" wx-if="{{loading}}">
<view class="bg"></view>
  <view class="loading">
  <loading></loading>
  <text class="loading-text">正在渲染中...</text>
</view>
</view>
</view>
<view class="footer">
<view class="button red rechoose" @tap="back">重选照片</view>
<!-- <view class="button red rechoose" @tap="show">show</view>
  <view class="button red rechoose" @tap="hide">hide</view> -->
  </view>
  </view>
  </template>

import wepy from 'wepy'
import tool from '../utils/tool.js'
import {styleTransfer, base} from '../services/service.js'
import {cacheStyle} from '../services/cache.js'
import loading from '../components/transfer/loading/index'
// 计算风格标签数组
const calFilterTagList = function (tagCanUseList = [], originTagList = [], originStyleList = []) {
  originTagList = tool.deepClone(originTagList)
  originStyleList = tool.deepClone(originStyleList)
  const newTagList = originTagList.filter(v => {
    return tagCanUseList.indexOf(v.id) > -1
  })
  newTagList.forEach(v => {
    // v.tagCode = ''
    // v.tagName = ''
    // v.tagOrder = ''
    v.styleList = []
    v.detailIdList.forEach(id => {
      let style = originStyleList.filter(k => {
        return k.detailId === id
      })[0]
      if (style) {
        const {backgroundUrl, brushAnimation, detailId, name, stylePicUrl} = style
        const newStyle = {backgroundUrl, brushAnimation, detailId, name, stylePicUrl}
        v.styleList.push(newStyle)
      }
    })
  })
  return newTagList
}
export default class Index extends wepy.page {
  config = {
    disableScroll: true
  }
  components = {
    loading: loading
  }

  mixins = []

  data = {
    iamgePath: '',
    loading: false,
    isUnload: false,
    tagCanUseList: [12, 29, 27, 28, 33, 32, 31,30, 34, 1],
    // tagCanUseList: [12, 1],
    cropedImagePath: '',
    renderStatus: 'init'
  }

  computed = {
    // now () {
    //   return +new Date()
    // }
  }

  methods = {
    back () {
      // console.log('back')
      if (this.loading) {
        // console.log('图片渲染中不能重选')
        wx.showToast({
          title: '图片渲染中不能重选',
          icon: 'success',
          duration: 3000
        })
        return
      }
      wx.navigateBack({url: `/pages/versa`})
    },
    show () {
      this.onShowLoading()
    },
    hide () {
      this.onHideLoading()
    }
  }

  events = {

  }

  async onLoad() {
    const {globalData} = this.$parent
    const demo = [
      'http://tmp/wx21630a5d4651096a.o6zAJsztn2DIgXEGteELseHpiOtU.1pt6jtQ6MgIb779bd49c491911729629c3064e1cb5f0.png'
    ]
    this.iamgePath = globalData.cropedImagePath || demo[0]
    // this.iamgePath =  demo[0]
    console.log('globalData', globalData)
    // this.segment(this.iamgePath, 64)
    this.wait()
  }

  async wait () {
    this.onShowLoading()
    await this.getTagList()
    await this.randomRender()
    this.onHideLoading()
    // 如果卸载页面,不能跳转到下一页
    if (!this.isUnload) {
      wx.redirectTo({url: '/pages/style'})
    }
  }

  onShowLoading () {
    this.loading = true
    this.$invoke('loading', 'onShow');
  }
  onHideLoading () {
    this.loading = false
    this.$invoke('loading', 'onHide');
  }


  async getTagList () {
    const {globalData} = this.$parent
    if (!globalData.styleList) {
      try {
        const styleList = await styleTransfer.styleList()
        globalData.styleList = styleList.result
      } catch (err) {
        console.log('catch-error: get styleList fail', err)
      }
    }
    if (!globalData.tagList) {
      try {
        const tagList = await styleTransfer.tagList()
        globalData.tagList = tagList.result && tagList.result.featureTagVoList
      } catch (err) {
        console.log('catch-error: get tagList fail', err)
      }
    }
    globalData.filterTagList = calFilterTagList(this.tagCanUseList, globalData.tagList, globalData.styleList) || []
  }

  // 随机处理
  async randomRender () {
    // console.log('randomRender')
    const {globalData} = this.$parent
    const {filterTagList = [], cropedImagePath = ''} = globalData
    // 获取图片
    const randomTagIndex = tool.createRandom(0, filterTagList.length -1)
    const randomStyleIndex = tool.createRandom(0, filterTagList[randomTagIndex].styleList.length - 1)
    const currentStyle = filterTagList[randomTagIndex].styleList[randomStyleIndex]
    console.log('随机选择后的当前风格', currentStyle)
    globalData.renderResult = await this.segment(cropedImagePath, currentStyle.detailId)
    globalData.currentStyle = currentStyle
    console.log('globalData', globalData)
  }

  // 渲染服务
  async segment (localImgPath, styleId) {
    // 判断是否在缓存里
    const cacheKey = `${localImgPath}_styleId_${styleId}`
    if (cacheStyle.get(cacheKey)) {
      console.log('get-cache', cacheKey, cacheStyle.get(cacheKey))
      return cacheStyle.get(cacheKey)
    }
    // 先上传到静态服务器
    let remoteImageUrl = ''
    // 判断是否有远程图片地址
    const cacheRemoteUrlKey = `${localImgPath}_remoteUrl`
    if (cacheStyle.get(cacheRemoteUrlKey)) {
      remoteImageUrl = cacheStyle.get(cacheRemoteUrlKey)
    } else {
      try {
        const {url} = await base.upload(localImgPath)
        remoteImageUrl = cacheStyle.set(cacheRemoteUrlKey, url)
      } catch (err) {
        console.log('上传图片失败', err)
      }
    }

    // 最后进行风格迁移
    let allSegmentData = []
    try {
      this.renderStatus = 'loading'
      allSegmentData = await styleTransfer.allSegment(remoteImageUrl, styleId)
    } catch (err) {
      console.log('风格迁移失败', err)
      this.renderStatus = 'fail'
      return
    }

    function hasSegmentButton (data) {
      return data.result.renderUrl !== data.result.targetUrl
    }
    console.log('set-cache')
    return cacheStyle.set(cacheKey, {
      color: allSegmentData[0].result,
      raw: allSegmentData[1].result,
      hasSegmentButton: hasSegmentButton(allSegmentData[0])
    })
  }

  onUnload () {
    this.isUnload = true
    console.log('isUnload', this.isUnload)
  }

}

