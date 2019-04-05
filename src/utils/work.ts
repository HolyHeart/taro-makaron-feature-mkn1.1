// 通用的业务代码
import Taro from '@tarojs/taro'
import { cacheImg } from '@/services/cache'
import service from '@/services/service'
const pageToHome = () => {
  Taro.redirectTo({
    url: '/pages/home/index'
  }) 
}
const getDomRect = (id:string, callback?:(rect:object)=>void) => {
  Taro.createSelectorQuery().select('#' + id).boundingClientRect(function(rect){
    // rect.id      // 节点的ID
    // rect.dataset // 节点的dataset
    // rect.left    // 节点的左边界坐标
    // rect.right   // 节点的右边界坐标
    // rect.top     // 节点的上边界坐标
    // rect.bottom  // 节点的下边界坐标
    // rect.width   // 节点的宽度
    // rect.height  // 节点的高度
    typeof callback === 'function' && callback(rect)
  }).exec()
}
const getSceneInfoById = (id:string, list:Array<any> = [], key:string) => {
  return list.filter(v => {
    return v[key] === id
  })[0]
}
const getCoverInfoById = (id:string, list:Array<any> = [], key:string) => {
  return list.filter(v => {
    return v[key] === id
  })[0]
}
const formatRawCoverList = (list:Array<any> = []) => {
  return list.map(v => {
    const cover_model = {
      id: '',
      remoteUrl: '',
      originHeight: 0,
      originWidth: 0,
      autoHeight: 0,
      autoScale: 0,
      autoWidth: 0,
      width: 0,
      height: 0,      
      x: 0,
      y: 0,
      rotate: 0,
      zIndex: 0,
      fixed: false,
      isActive: false,
      visible: false,
      deleted: false
    }
    cover_model.remoteUrl = v.imageUrl
    cover_model.id = v.id
    cover_model.zIndex = v.zIndex || 0
    cover_model.fixed = v.fixed || false
    cover_model.isActive = v.isActive || false
    cover_model.visible = true
    cover_model.deleted = false
    return cover_model
  })
}
// 下载照片并存储到本地
const downloadRemoteImage = async (remoteUrl = '') => {
  // 判断是否在缓存里
  const cacheKey = `remoteUrl_${remoteUrl}_localPath`
  let localImagePath = ''
  if (cacheImg.get(cacheKey)) {    
    return cacheImg.get(cacheKey)
  } else {
    try {
      const result = await service.base.downloadFile(remoteUrl)
      localImagePath = result.tempFilePath
    } catch (err) {
      console.log('下载图片失败', err)
    }
  }
  console.log('downloadRemoteImage', cacheKey, localImagePath)
  return cacheImg.set(cacheKey, localImagePath)
}
const calcVideoSize = (maxWidth = 306, maxHeight = 408, width, height) => {
  const frame_ratio = maxWidth / maxHeight
  const video_ratio = width / height
  if ( frame_ratio < video_ratio ) {
    width = maxWidth
    height = width / video_ratio
  } else {
    height = maxHeight
    width = height * video_ratio
  }
  return {
    width,
    height
  }
}

const work = {
  pageToHome,
  getDomRect,
  getSceneInfoById,
  getCoverInfoById,
  formatRawCoverList,
  downloadRemoteImage,
  calcVideoSize
}
export default work
