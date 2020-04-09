const cloud = require('wx-server-sdk')

cloud.init({
    // API 调用都保持和云函数当前所在环境一致
    env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async(event, context) => {
    const wxContext = cloud.getWXContext()

    await cloud.openapi.customerServiceMessage.send({
        touser: wxContext.OPENID,
        msgtype: 'link',
        link: {
            title: '制作同款，下载「马卡龙」APP',
            description: '一秒抠图，一键做同款，尽在马卡龙！',
            url: 'http://m.versa-ai.com/makaron/',
            thumb_url: 'https://static01.versa-ai.com/upload/9974cc144bd1/dee062ab-740f-4795-9ea5-346939ea08ba.png'
        },
    })

    return 'success'
}