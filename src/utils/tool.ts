import Taro from '@tarojs/taro'

/**
 * @description encodeToURIString 把一个对象类型转化为问号参数类型的字符串
 * @param {object} data 要解析的对象
 * @param {boolean} isUIR 是否转化为URIComponent，默认转化，只有当值为false时，不转化
 * @return {string} 问号参数类型的字符串
 */
function encodeToURIString(data, isUIR?:boolean) {
  // 默认参数isUIR不为false，值皆为true
  if (isUIR !== false) {
    isUIR = true
  }
  const ary = []
  // url编码
  function encodeString(str, isUIR) {
    return isUIR ? encodeURIComponent(str) : str
  }
  if (Object.prototype.toString.call(data) === '[object Object]') {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (Array.isArray(data[key])) {
          data[key].forEach(function(v) {
            ary.push(key + '=' + encodeString(v, isUIR))
          })
        } else {
          ary.push(key + '=' + encodeString(data[key], isUIR))
        }
      }
    }
  }
  return ary.join('&')
}
/**
 * @description paddStringToUrl 将对象转化为问号参数形式添加在url地址的后面，会进行URI编码处理
 * @param {string} url 原url地址
 * @return {string} 返回拼接好的新url地址
 */
function paddStringToUrl(url) {
  const hasSearch = /\?/.test(url)
  return url + (hasSearch ? '&' : '?')
}
function formatQueryUrl(path = '', query = {}) {
  let url = ''
  if (Object.keys(query).length > 0) {
    url = paddStringToUrl(path) + encodeToURIString(query)
  } else {
    url = path
  }
  return url
}
/**
 * @description 深拷贝
 * @param {*} obj 目标对象
 * @return {*} 返回的深拷贝对象
 */
function deepClone (obj) {
  if (!obj || typeof obj !== 'object') {
    return obj
  }
  let objArray = Array.isArray(obj) ? [] : {}
  if (obj && typeof obj === 'object') {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        // 如果obj的属性是对象，递归操作
        if (obj[key] && typeof obj[key] === 'object') {
          objArray[key] = deepClone(obj[key])
        } else {
          objArray[key] = obj[key]
        }
      }
    }
  }
  return objArray
}
// 角度计算
const getLen = function(v) {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}
const dot = function (v1, v2) {
  return v1.x * v2.x + v1.y * v2.y;
}
const getAngle = function (v1, v2) {
  let mr = getLen(v1) * getLen(v2);
  if (mr === 0) return 0;
  let r = dot(v1, v2) / mr;
  if (r > 1) r = 1;
  return Math.acos(r);
}
const cross = function (v1, v2) {
  return v1.x * v2.y - v2.x * v1.y;
}
const getRotateAngle = function (v1, v2) {
  let angle = getAngle(v1, v2);
  if (cross(v1, v2) > 0) {
    angle *= -1;
  }
  return angle * 180 / Math.PI;
}
// 计算中心点坐标
const calcCenterPosition = (offsetX, offsetY, width, height) => {
  return {
    x: offsetX + 0.5 * width,
    y: offsetY + 0.5 * height
  }
}
// 计算资源类型
const calcSourceType = (src:string) => {
  let type = 'image'
  if (/\.(png|svg|jpg|gif|jpeg)$/i.test(src)) {
    type = 'image'
  } else if (/\.(mp4|avi|mpeg)$/i.test(src)) {
    type = 'video'
  }
  return type
}
// 计算视频储存
const calcVideoSize = function (maxWidth = 612, maxHeight = 816, width, height) {
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


const tool = {
  formatQueryUrl,
  deepClone,
  uuid: function () { // 生产uuid
    const s:Array<any> = []
    const hexDigits = '0123456789abcdef'
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = '-'
    const uuid = s.join('')
    return uuid
  },
  getDeviceId: function () {
    if (!Taro.getStorageSync('deviceId')) {
      Taro.setStorageSync('deviceId', this.uuid())
    }
    return Taro.getStorageSync('deviceId')
  },
  createImgName: function (length = 32) {
    var s:Array<any> = []
    var hexDigits = '0123456789abcdef'
    for (var i = 0; i < length; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    return s.join('')
  },
  isEmpty: function (obj) {
    // 判断字符是否为空的方法
    if (typeof obj === 'undefined' || obj === null || obj === '') {
      return true
    }
    return false
  },
  isRepeat: function (arr) {
    var hash = {}
    for (var i in arr) {
      if (hash[arr[i]]) {
        return true
      }
      hash[arr[i]] = true
    }
    return false
  },
  JSON_parse: function (str) {
    try {
      if (typeof str==='string'){
        return JSON.parse(str)
      }else{
        return str
      }
    } catch (err) {
      console.log('解析JSON出错', err)
      return {}
    }
  },
  padStart: function (targetStr, targetLength, padString) {
    targetLength = targetLength >> 0 // truncate if number or convert non-number to 0;
    padString = String((typeof padString !== 'undefined' ? padString : ' '))
    if (targetStr.length > targetLength) {
      return String(targetStr)
    }
    else {
      targetLength = targetLength - targetStr.length
      if (targetLength > padString.length) {
        padString += padString.repeat(targetLength / padString.length) //append to original to ensure we are longer than needed
      }
      return padString.slice(0, targetLength) + String(targetStr)
    }
  },
  getRotateAngle,
  calcCenterPosition,
  calcSourceType,
  calcVideoSize
}

export default tool
