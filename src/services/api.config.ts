// host域名管理
import { ENV } from './config'
const host = {
  openapi: {
    dev: 'https://openapi.dev.versa-ai.com',
    prod: 'https://openapi.versa-ai.com'
  },
  miniapi: {
    dev: 'https://mini-programdev.api.versa-ai.com',
    prod: 'https://mini-program.api.versa-ai.com'
  },
  upload: {
    dev: 'https://versa-static.oss-cn-shanghai.aliyuncs.com',
    prod: 'https://versa-static.oss-cn-shanghai.aliyuncs.com'
  },
  download: {
    dev: 'https://static01.versa-ai.com',
    prod: 'https://static01.versa-ai.com'
  },
  qq_miniapi: {
    dev: 'https://qq-mini-program-dev.api.versa-ai.com',
    prod: 'https://qq-mini-program.api.versa-ai.com'
  }
}

// 获取域名
function getHost(type = 'miniapi', ENV = 'dev') {
  return host[type][ENV]
}
export const api = {
  base: {
    uploadToken: `${getHost('miniapi', ENV)}/upload/uploadPolicy`,
    upload: `${getHost('miniapi', ENV)}/upload`,
    auth: `${getHost('miniapi', ENV)}/user/auth/wechat/mini`,
    loginAuth: `${getHost('miniapi', ENV)}/user/auth/miniProgram`,
    getOpid:`${getHost('miniapi', ENV)}/user/auth/wechat/mini/base`,
    subScribe:`${getHost('miniapi', ENV)}/user/miniProgram/auth/template`
  },
  core: {
    segment: `${getHost('miniapi', ENV)}/segment/instance/original`,
    column: `${getHost('miniapi', ENV)}/bg/column/theme/list`,
    theme: `${getHost('miniapi', ENV)}/bg/:themeId/themeData`,
    recommend: `${getHost('miniapi', ENV)}/scene/recommend`,
    filterConvertVideo: `${getHost('miniapi', ENV)}/video/merge`,
    reportFormId: `${getHost('miniapi', ENV)}/user/miniProgram/report`,
    checkImage:`${getHost('miniapi', ENV)}/upload/media/check`
  },
  // Style Transfer
  style: {
    segment: `${getHost('miniapi', ENV)}/image/render/segment`,
    featureTagOrder: `${getHost('miniapi', ENV)}/feature/featureTagOrder`,
    featureDetail: `${getHost('miniapi', ENV)}/feature/featureDetail`,
  },
  browser: {
    psWorkList: `${getHost('miniapi', ENV)}/activity/works/top/likes`,
    postNewWork:`${getHost('miniapi',ENV)}/community/works`,
    getWorkList :`${getHost('miniapi', ENV)}/activity/works/rank/likes`
  },
  home: {
    getCateGoryAndScenes :`${getHost('miniapi', ENV)}/miniProgram/category`,
  },
  teleport: {
    getResultImage:`${getHost('miniapi', ENV)}/miniProgram/getResultImage`,
  },
  share: {
    getrecommendList :`${getHost('miniapi', ENV)}/community/feed/recommend/works`,
    getHotList :`${getHost('miniapi', ENV)}/community/works/hot/templates`,
    getQrCode :`${getHost('miniapi', ENV)}/wechat/mini/works/qrcode`,
    addLikeWork:`${getHost('miniapi', ENV)}/community/work/like`,
    deleteLike:`${getHost('miniapi', ENV)}/community/work/like`,
    singleWorkList:`${getHost('miniapi', ENV)}/community/works`,
  },
  mkn: {
    getTemplate: `${getHost('miniapi', ENV)}/template/`
  }
}
export default {
  name: 'api-config',
  api,
}
