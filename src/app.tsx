import './utils/ald-stat'
import './utils/dsp_sdk'
import './utils/xhtad_sdk.min'
import '@tarojs/async-await'
import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import Index from './pages/index'
import Session from '@/services/session'

import configStore from './model/store'

import './app.less'
import {appId} from "@/services/config";

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()
class _App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/index',
      //'pages/home/index',
      //'pages/demoZengYJ/index',
      // 'pages/browser/index',
      // 'pages/filter/index',
      //'pages/editor/index',
      // 'pages/segment/index',
      // 'pages/dynamic/index',
      // 'pages/error/index',
      // 'pages/crop/index',
      // 'pages/waiting/index',
      // 'pages/share/index',
      // 'pages/style/index',
      // 'pages/index',
      // 'pages/psChallenge/index',
      // 'pages/teleport/index',
      // 'pages/myBackground/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'wechat',
      navigationStyle: 'custom',
      navigationBarTextStyle: "black"
    },
    navigateToMiniProgramAppIdList:[
      'wx37543a814ef773a5',
      'wxe1faaac6a4477320',
      'wx21630a5d4651096a'
    ]
  }

  async componentDidMount() {
    try {
      const { openId } = await Session.getOpId()
      if (openId) {
        Taro.setStorageSync('openId',openId)
        wx.dsp.setOpenid(openId)
      }
    } catch (error) {

    }
  }

  componentDidShow() { }

  componentDidHide() {
  }
  async componentWillUnmount() {
    try {
      const { openId } = await Session.getOpId()
      if (openId) {
        wx.dsp.setOpenid(openId)
      }
    } catch (error) {

    }

  }
  componentCatchError() { }

  componentDidCatchError() { }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<_App />, document.getElementById('app'))
