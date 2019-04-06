// host域名管理
import {ENV} from './config'
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
  }
}

// 获取域名
function getHost (type = 'miniapi', ENV = 'dev') {
  return host[type][ENV]
}
export const api = {
  base: {
    uploadToken: `${getHost('miniapi', ENV)}/upload/uploadPolicy`,
    upload: `${getHost('miniapi', ENV)}/upload`,
    auth: `${getHost('miniapi', ENV)}/user/auth/wechat/mini`,
  },
  core: {
    segment: `${getHost('miniapi', ENV)}/segment/instance/original`,
    column: `${getHost('miniapi', ENV)}/bg/column/theme/list`,
    theme: `${getHost('miniapi', ENV)}/bg/:themeId/themeData`,
    recommend: `${getHost('miniapi', ENV)}/scene/recommend`,
    filterConvertVideo: `${getHost('miniapi', ENV)}/video/merge`,
  }
}
export default {
  name: 'api-config',
  api,
}