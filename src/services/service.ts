// http服务
import Taro from '@tarojs/taro'
import {commonRequest, request} from './http'
import { api } from './api.config'
import { appId } from './config'
import tool from '@/utils/tool'
import { cacheSegment, cacheImg } from './cache'

interface segmentData {
  clientType: string;
  timestamp: string;
  imageUrl: string;
  segmentType?: number;
}

interface separateOptionsData {
  type?: number;
  loading?: boolean;
  showLoading?(): void;
  hideLoading?(): void;
  beforeSeparate?(url?): void;
}

export const base = {
  uploadToken: function () {
    return request({
      url: api.base.uploadToken,
      method: 'GET',
      dataType: 'json',
      data: {
        clientType: 'qq-mini-program',
        fileType: 'image',
        filename: 'image.jpeg'
      }
    })
  },
  async getUploadToken () {
    let token = Taro.getStorageSync('token')
    if (token && token.expire > Date.now()) {
      return token
    }
    try {
      const data = await base.uploadToken()
      token = data && data.result && data.result.result
      Taro.setStorageSync('token', token)
      return token
    } catch (err) {
      console.log('get uploadToken fail', err)
    }
  },
  async upload (localFilePath, type?:string) {
    // 上传图片
    let imageType = type || 'png'
    const token = await base.getUploadToken()
    const imgName = tool.createImgName(16)
    const prefix = token.prefix // 'upload/prod/image/'
    token.params.key = `${prefix}${imgName}.${imageType}`
    let {data} = await Taro.uploadFile({
      filePath: localFilePath,
      name: 'file',
      url: token.host,
      formData: token.params
    })
    if (typeof data === 'string') {
      try {
        let result = JSON.parse(data)
        result.host = 'https://static01.versa-ai.com/'
        result.url = result.host + result.picurl
        return result
      } catch (err) {
        console.log('upload image string parse to json fail !!!')
      }
    }
    return {
      host: '',
      picurl: '',
      url: ''
    }
  },
  auth (data) {
    return commonRequest({
      url: api.base.auth,
      method: 'POST',
      data: data
    })
  },
  // 用户授权后向后端请求auth, 上传用户信息
  loginAuth: function (detail) {
    const data = {}
    data.appId = appId || ''
    data.encryptedData = detail.encryptedData || ''
    data.iv = detail.iv || ''
    const reqData = {
      url: api.base.loginAuth,
      data: data,
      method: 'POST',
      dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    }
    return request(reqData)
  },
  downloadFile (url) {
    return Taro.downloadFile({url: url})
  },
  // Immigrated from StyleTransfer MiniApp
  timeout: function (interval, toReject) {
    // isReject为true时reject
    // 默认resolve
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (toReject) {
          reject('timeout fail !')
        } else {
          resolve('timeout success !')
        }
      }, interval)
    })
  }
}
export const core = {
  segment: function (remoteImgUrl, segmentType?:number) {
    let postData:segmentData = {
      clientType: 'qq-mini-program',
      timestamp: Date.now().toString(),
      imageUrl: remoteImgUrl,
    }
    if (segmentType !== undefined) {
      postData.segmentType = segmentType
    }
    return request({
      url: api.core.segment,
      method: 'POST',
      header: {'content-type': 'application/x-www-form-urlencoded'},
      data: postData,
    })
  },
  column (data?:object) {
    return request({
      url: api.core.column,
      method: 'GET',
      data: data,
    })
  },
  theme: function (themeId) {
    return request({
      url: api.core.theme,
      method: 'GET',
      data: {},
      params: {
        themeId
      }
    })
  },
  recommend: function () {
    // 获取推荐主题信息
    return request({
      url: api.core.recommend,
      method: 'GET',
      data: {
        clientType: 'qq-mini-program'
      },
    })
  },
  reportFormId: function (formId) {
    const postData = {
      clientType: 'qq-mini-program',
      timestamp: Date.now().toString(),
      formId: formId
    }
    return request({
      url: api.core.reportFormId,
      method: 'POST',
      header: {'content-type': 'application/x-www-form-urlencoded'},
      data: postData,
    })
  },
  segmentDemo: function (rawImgUrl, resImgUrl, time = 100) {
    console.log('分割图片：', rawImgUrl)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          result: resImgUrl
        })
      }, time)
    })
  },
  separateLocalImg:  async function (localImgPath:string = '', options:separateOptionsData = {}) {
    // 上传本地图片并分割图片
    // options = { type, loading, showLoading, hideLoading, }
    // 判断是否在缓存里
    let keyType = ''  // all表示人 head表示头 -1表示全部
    switch (options.type) {
      case -1:
        keyType = 'all'
        break
      case 0:
        keyType = 'body'
        break
      case 1:
        keyType = 'head'
        break
      default:
        keyType = 'all'
    }
    const cacheKey = `local_${localImgPath}_separate_type_${keyType}`
    if (cacheSegment.get(cacheKey)) {
      console.log('cacheSegment', cacheKey, cacheSegment.get(cacheKey))
      return cacheSegment.get(cacheKey)
    }
    // 先上传到静态服务器
    let remoteImageUrl = ''
    // 判断是否有远程图片地址
    const cacheRemoteUrlKey = `${localImgPath}_remoteUrl`
    if (cacheImg.get(cacheRemoteUrlKey)) {
      remoteImageUrl = cacheImg.get(cacheRemoteUrlKey)
    } else {
      try {
        if (options.loading) {
          typeof options.showLoading === 'function' && options.showLoading()
        }
        const {picurl} = await base.upload(localImgPath, 'png')
        remoteImageUrl = cacheImg.set(cacheRemoteUrlKey, picurl)
      } catch (err) {
        console.log('上传图片失败', err)
      }
    }
    if (typeof options.beforeSeparate === 'function') {
      options.beforeSeparate(remoteImageUrl)
    }
     // 最后进行人景分离
    let separateData
    try {
      if (options.loading) {
        typeof options.showLoading === 'function' && options.showLoading()
      }
      if (options.type === 0 || options.type === 1) {
        separateData = await core.segment(remoteImageUrl, options.type)
      } else {
        separateData = await core.segment(remoteImageUrl)
      }
      if (options.loading) {
        typeof options.hideLoading === 'function' && options.hideLoading()
      }
    } catch (err) {
      console.log('人景分离失败', err)
      if (options.loading) {
        typeof options.hideLoading === 'function' && options.hideLoading()
      }
      Taro.showToast({
        title: '分离照片失败',
        icon: 'fail',
        duration: 3000
      })
      return
    }
    // 存储分割缓存
    return cacheSegment.set(cacheKey, {
      ...separateData.result
    })
  },
  filterConvertVideo: function (videoParams:string = '') {
    let postData = {
      clientType: 'qq-mini-program',
      timestamp: Date.now().toString(),
      videoConfig: videoParams
    }
    return request({
      url: api.core.filterConvertVideo,
      method: 'POST',
      header: {'content-type': 'application/x-www-form-urlencoded'},
      data: postData,
    })
  }
}
















//  风格迁移
export const styleTransfer = {
  demo: function (option) {
    const {query = {}, data = {}} = option || {}
      // url = getUrl(url,params)
      // return http.httpGet(url)
    const map = ['MA==', 'MQo=', 'Mg==', 'Mw==', 'NA==', 'NQ==', 'Ng==', 'Nw==', 'OA==', 'OQ==']
    const queryData = Object.assign({
      time: 1,
      t: 'css',
      c: map[3],
      i: 3
    }, query)
    const url = tool.formatQueryUrl('https://www.madcoder.cn/tests/sleep.php', queryData)
    const reqData = {
      url,
      method: 'POST',
      data: data,
      responseType: 'text'
    }
    return request(reqData)
  },



  segment: function (remoteImgUrl, styleId, originalColors) {
    // remoteImgUrl 远程静态服务器图片地址
    // styleId 渲染风格Id
    // originalColors 原色 ,不传默认为风格色
    const reqData = {
      method: 'POST',
      // url: `${getHost()}/image/render/segment`,
      url: api.style.segment,
      header: {'content-type': 'application/x-www-form-urlencoded'},
      data: {
        clientType: 'qq-mini-program',
        timestamp: Date.parse(new Date().toString()),
        imageUrl: remoteImgUrl,
        styleId,
        originalColors
      }
    }
    if (originalColors) {
      reqData.data.originalColors = 'N'
    }
    return request(reqData)
  },
  allSegment: function (remoteImgUrl, styleId) {
    // 风格和原色两种渲染
    let colorSegment = this.segment(remoteImgUrl, styleId)
    let rawSegment = this.segment(remoteImgUrl, styleId, true)
    return Promise.all([colorSegment, rawSegment])
  },
  allSegmentTimeout: function (remoteImgUrl, styleId, interval) {
    let allSegment = this.allSegment(remoteImgUrl, styleId)
    let timeout = base.timeout(interval, true)
    return Promise.race([allSegment, timeout])
  },



  tagList: function () {
    // 获取风格标签列表
    const reqData = {
      method: 'GET',
      url: api.style.featureTagOrder,
      dataType: 'json',
      data: {
        clientType: 'qq-mini-program'
      }
    }
    return request(reqData)
  },
  styleList: function () {
    const reqData = {
      method: 'GET',
      url: api.style.featureDetail,
      dataType: 'json',
      data: {
        renderType: 'transfer-image',
        clientType: 'qq-mini-program'
      }
    }
    return request(reqData)
  }
}



export const browser = {
  psWorkList: function (activityID, page) {
    const reqData = {
      method: 'GET',
      url: api.browser.psWorkList,
      header: {"Accept": "*/*"},
      data: {
        activityId: activityID,
        page: page,
      }
    }
    return request(reqData)
  },
}




export default {
  base,
  core,
  styleTransfer,
  browser,
}
