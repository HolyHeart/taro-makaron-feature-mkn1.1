// http服务
import Taro from '@tarojs/taro'
import { commonRequest, request } from './http'
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
  subScribe :function(data){
    return request({
      url: `${api.base.subScribe}`,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      data: data
    })
  },
  uploadToken: function () {
    return request({
      url: api.base.uploadToken,
      method: 'GET',
      dataType: 'json',
      data: {
        clientType: 'mini-program',
        fileType: 'image',
        filename: 'image.jpeg'
      }
    })
  },
  async getUploadToken() {
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
  async upload(localFilePath, type?: string) {
    // 上传图片
    let imageType = type || 'png'
    const token = await base.getUploadToken()
    const imgName = tool.createImgName(16)
    const prefix = token.prefix // 'upload/prod/image/'
    token.params.key = `${prefix}${imgName}.${imageType}`
    let { data } = await Taro.uploadFile({
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
  auth(data) {
    return commonRequest({
      url: api.base.auth,
      method: 'POST',
      data: data
    })
  },
  getOpId(data){
    return commonRequest({
      url: api.base.getOpid,
      method: 'GET',
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
  downloadFile(url) {
    return Taro.downloadFile({ url: url })
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
  segment: function (remoteImgUrl, segmentType?: number) {
    let postData: segmentData = {
      clientType: 'mini-program',
      timestamp: Date.now().toString(),
      imageUrl: remoteImgUrl,
    }
    if (segmentType !== undefined) {
      postData.segmentType = segmentType
    }
    return request({
      url: api.core.segment,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: postData,
    })
  },
  column(data?: object) {
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
  checkImage:function(imageUrl){
    return request({
      url: api.core.checkImage,
      method: 'GET',
      data: {
        imageUrl:imageUrl
      },

    })
  },
  recommend: function () {
    // 获取推荐主题信息
    return request({
      url: api.core.recommend,
      method: 'GET',
      data: {
        clientType: 'mini-program'
      },
    })
  },
  reportFormId: function (formId) {
    const postData = {
      clientType: 'mini-program',
      timestamp: Date.now().toString(),
      formId: formId
    }
    return request({
      url: api.core.reportFormId,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
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
  separateLocalImg: async function (localImgPath: string = '', options: separateOptionsData = {}) {
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
        const { picurl } = await base.upload(localImgPath, 'png')
        remoteImageUrl = cacheImg.set(cacheRemoteUrlKey, picurl)
      } catch (err) {
        console.log('上传图片失败', err)
      }
    }
    if (typeof options.beforeSeparate === 'function') {
      options.beforeSeparate(remoteImageUrl)
    }
    const checkResult = await core.checkImage(remoteImageUrl)
    if(checkResult.status==='success'){
       if(checkResult.result.result.suggestion==='block'){
         return {
           result:{}
         }
       }
    }
    console.log(checkResult)
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
  filterConvertVideo: function (videoParams: string = '') {
    let postData = {
      clientType: 'mini-program',
      timestamp: Date.now().toString(),
      videoConfig: videoParams
    }
    return request({
      url: api.core.filterConvertVideo,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: postData,
    })
  }
}
















//  风格迁移
export const styleTransfer = {
  demo: function (option) {
    const { query = {}, data = {} } = option || {}
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
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        clientType: 'mini-program',
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
        clientType: 'mini-program'
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
        clientType: 'mini-program'
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
      header: { "Accept": "*/*" },
      data: {
        activityId: activityID,
        page: page,
      }
    }
    return request(reqData)
  },
  getWorkList: function (activityID, page) {
    const reqData = {
      method: 'GET',
      url: api.browser.getWorkList,
      header: { "Accept": "*/*" },
      data: {
        activityId: activityID,
        from: page,
      }
    }
    return request(reqData)
  },
  /**
   *
   * @param originPicture 原图
   * @param renderPicture  渲染图
   * @param worksType  作品类型 pic  video
   * @param worksDesc 发布作品说的话
   * @param status 20 公开作品
   * @param activityIds  挑战id
   * @param renderSessionId 唯一id
   * @param userToken
   */
  postNewWork: function (originPicture, renderPicture, worksType = 'pic', worksDesc = '这图我能p', status = 20, activityIds, renderSessionId, userToken, uid) {
    const reqData = {
      method: 'POST',
      // url: `${getHost()}/image/render/segment`,
      url: api.browser.postNewWork,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        originPicture: originPicture,
        renderPicture: renderPicture,
        worksType,
        worksDesc,
        status,
        activityIds,
        renderSessionId,
        userToken, uid
      }
    }
    return request(reqData)
  }
}


export const home = {

 /**
  * 新版本首页
  * @param miniProgramType 0:qq小程序，1:微信
  */
  getCateGoryAndScenes: function (miniProgramType:Number =0) {
    const reqData = {
      method: 'GET',
      url: api.home.getCateGoryAndScenes,
      header: { "Accept": "*/*" },
      data: {
        miniProgramType: miniProgramType,
      }
    }
    return request(reqData)
  },
  getWorkList: function (activityID, page) {
    const reqData = {
      method: 'GET',
      url: api.browser.getWorkList,
      header: { "Accept": "*/*" },
      data: {
        activityId: activityID,
        from: page,
      }
    }
    return request(reqData)
  },
  /**
   *
   * @param originPicture 原图
   * @param renderPicture  渲染图
   * @param worksType  作品类型 pic  video
   * @param worksDesc 发布作品说的话
   * @param status 20 公开作品
   * @param activityIds  挑战id
   * @param renderSessionId 唯一id
   * @param userToken
   */
  postNewWork: function (originPicture, renderPicture, worksType = 'pic', worksDesc = '这图我能p', status = 20, activityIds, renderSessionId, userToken, uid) {
    const reqData = {
      method: 'POST',
      // url: `${getHost()}/image/render/segment`,
      url: api.browser.postNewWork,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        originPicture: originPicture,
        renderPicture: renderPicture,
        worksType,
        worksDesc,
        status,
        activityIds,
        renderSessionId,
        userToken, uid
      }
    }
    return request(reqData)
  }
}

// 传送门接口
export const teleport = {
  getResultImage: function (sessionId, sceneId) {
    const reqData = {
      method: 'GET',
      url: api.teleport.getResultImage,
      header: {"Accept": "*/*"},
      data: {
        sessionId: sessionId,
        sceneId: sceneId,
      }
    }
    return request(reqData)
  }
}

//分享页热门作品
export const share = {
  getrecommendList: function (size) {
    const reqData = {
      method: 'GET',
      url: api.share.getrecommendList,
      header: { "Accept": "*/*" },
      data: {
        size: size
      }
    }
    return request(reqData)
  },

  getHotList: function (templateCode) {
    const reqData = {
      method: 'GET',
      url: api.share.getHotList,
      header: { "Accept": "*/*" },
      data: {
        templateCode: templateCode
      }
    }
    return request(reqData)
  },

  getQrCode: function (page, width, worksId) {
    const reqData = {
      method: 'GET',
      url: api.share.getQrCode,
      header: { "Accept": "*/*" },
      data: {
        page: page,
        width: width,
        worksId: worksId
      }
    }
    return request(reqData)
  },

  addLikeWork: function (worksId, uid, token) {
    const reqData = {
      method: 'POST',
      url: api.share.addLikeWork + '?worksId=' + worksId,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        worksId: worksId,
        uid: uid,
        token: token
      }
    }
    return request(reqData)
  },

  deleteLike: function (worksId) {
    const reqData = {
      method: 'DELETE',
      url: `${api.share.deleteLike}`,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        worksId: worksId
      }
    }
    return request(reqData)
  },

  singleWorkList: function (worksId) {
    const reqData = {
      method: 'GET',
      url: api.share.singleWorkList,
      header: { "Accept": "*/*" },
      data: {
        worksId: worksId
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
  teleport,
  share
}
