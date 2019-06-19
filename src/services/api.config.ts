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
    uploadToken: `${getHost('qq_miniapi', ENV)}/upload/uploadPolicy`,
    upload: `${getHost('qq_miniapi', ENV)}/upload`,
    auth: `${getHost('qq_miniapi', ENV)}/user/auth/wechat/mini`,
    loginAuth: `${getHost('qq_miniapi', ENV)}/user/auth/miniProgram`,
  },
  core: {
    segment: `${getHost('qq_miniapi', ENV)}/segment/instance/original`,
    column: `${getHost('qq_miniapi', ENV)}/bg/column/theme/list`,
    theme: `${getHost('qq_miniapi', ENV)}/bg/:themeId/themeData`,
    recommend: `${getHost('qq_miniapi', ENV)}/scene/recommend`,
    filterConvertVideo: `${getHost('qq_miniapi', ENV)}/video/merge`,
    reportFormId: `${getHost('miniapi', ENV)}/user/miniProgram/report`,
  }
}
export default {
  name: 'api-config',
  api,
}
