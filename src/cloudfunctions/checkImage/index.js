const cloud = require('wx-server-sdk')

cloud.init({
    // API 调用都保持和云函数当前所在环境一致
    env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
    const result = await cloud.openapi.security.imgSecCheck.send({
        media: {
            contentType: event.contentType,
            value: event.value
        }
    })
    return result
}