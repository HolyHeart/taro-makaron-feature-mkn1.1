// 通用的业务代码
import Taro from '@tarojs/taro'
import { cacheImg } from '@/services/cache'
import service from '@/services/service'
interface saveSourceOptions {  
  location: string,
  sourceUrl: any,
  sourceType: string,
  onSuccess?: () => void,
  onAuthFail?: () => void,
  onFail?: () => void,
}
interface chooseImageOptions {
  onSuccess?: (path?:any) => void,
  onTap?: (index?:any) => void,
}
const pageToHome = () => {
  Taro.redirectTo({
    url: '/pages/home/index'
  }) 
}
const pageToError = () => {
  Taro.redirectTo({
    url: '/pages/error/index'
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
const getSceneList = function (sceneList:Array<object> = []) {
  const result = []
  sceneList.forEach(v => {
    const {sceneType, bgUrl, sceneId, sceneName, shareContent, thumbnailUrl, sceneConfig, segmentType, segmentZIndex, bgZIndex} = v
    let supportMusic = false
    let hasIcon = false
    if (sceneConfig) {
      const {music = {}} = JSON.parse(sceneConfig)
      supportMusic = music.fileUrl ? true : false      
    } 
    if (sceneType === 2 || sceneType === 1 ) {
      hasIcon = true
    }
    result.push({
      sceneType,
      bgUrl, 
      sceneId, 
      sceneName, 
      shareContent, 
      thumbnailUrl, 
      sceneConfig, 
      segmentType, 
      segmentZIndex, 
      bgZIndex, 
      supportMusic,
      hasIcon})
  })
  return result
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
      deleted: false,
      deleteable: true
    }
    cover_model.remoteUrl = v.imageUrl
    cover_model.id = v.id
    cover_model.zIndex = v.zIndex || 0
    cover_model.fixed = v.fixed || false
    cover_model.isActive = v.isActive || false
    cover_model.visible = true
    cover_model.deleted = false
    cover_model.deleteable = true
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
// 将本地或远程资源存储到相册
const saveSourceToPhotosAlbum = async (options:saveSourceOptions) => {  
  options.location = options.location || 'local'
  options.sourceType = options.location || 'image'
  let localUrl
  if (options.location === 'remote') {
    try {          
      localUrl = await downloadRemoteImage(options.sourceUrl)
    } catch (err) {
      console.log('下载资源失败', err)
      return
    }
  } else {
    localUrl = options.sourceUrl
  }  
  // 保存到相册
  try {
    if (options.sourceType === 'video') {
      await Taro.saveVideoToPhotosAlbum({filePath: localUrl})  
    } else {
      await Taro.saveImageToPhotosAlbum({filePath: localUrl})  
    }  
  //  console.log('保存成功')   
   typeof options.onSuccess === 'function' && options.onSuccess()
  } catch (err) {
    Taro.getSetting({
      success (setting) {
        const {authSetting} = setting
        if (!authSetting['scope.writePhotosAlbum']) { 
          typeof options.onAuthFail === 'function' && options.onAuthFail()
        }
      },
      fail () {
        typeof options.onFail === 'function' && options.onFail()
      }
    })                
  }
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
const chooseImage = async ({onTap, onSuccess}:chooseImageOptions) => {
  Taro.showActionSheet({
    itemList: [
      '拍摄人像照',
      '从相册选择带有人像的照片',
    ],
    success: function ({tapIndex}) {
      typeof onTap === 'function' && onTap(tapIndex)
      if (tapIndex === 0) {
        Taro.authorize({
          scope: "scope.camera",
        }).then(res => {
          Taro.chooseImage({
            count: 1,
            sourceType: ['camera'],
            sizeType: ['compressed '],
          }).then(({tempFilePaths: [path]}) => {
            typeof onSuccess === 'function' && onSuccess(path)
          })
        }, err => {
          Taro.getSetting().then(authSetting => {
            if (authSetting['scope.camera']) {
            } else {
              Taro.showModal({
                title: '拍摄图片需要授权',
                content: '拍摄图片需要授权\n可以授权吗？',
                confirmText: "允许",
                cancelText: "拒绝",                      
              }).then(res => {     
                if (res.confirm) {
                  Taro.authModal({
                    open: true
                  })
                }
              })
            }                
          })
        })
      } else if (tapIndex === 1) {
        Taro.chooseImage({
          count: 1,
          sourceType: ['album'],
        }).then(({tempFilePaths: [path]}) => {
          typeof onSuccess === 'function' && onSuccess(path)
        })
      }		
    }
  }).catch(err => console.log(err))
}

const work = {
  pageToHome,
  pageToError,
  getDomRect,
  getSceneList,
  getSceneInfoById,
  getCoverInfoById,
  formatRawCoverList,
  downloadRemoteImage,
  saveSourceToPhotosAlbum,
  calcVideoSize,
  chooseImage
}
export default work
