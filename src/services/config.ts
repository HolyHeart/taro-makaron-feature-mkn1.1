// 配置文件
export const ENV:string = 'dev'  // 'dev' 测试
// export const ENV = 'prod'  // 'prod' 生产
export const appId:string = 'wxcfe56965f4d986f0'
export const appConfig:object = {
  image_oss_postfix: '?x-oss-process=image/resize,h_748,w_560',
  themeId: ENV === 'prod' ? '159718980238381056' : '189443144248250368' // 默认主题id
}
export default {
  ENV,
  appId: appId,
  appConfig: appConfig
}

// 测服 杂志风 189443144248250368 猪年 189061533203746816