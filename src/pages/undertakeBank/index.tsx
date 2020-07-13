import {ComponentClass} from 'react'
import Taro, {Component, Config} from '@tarojs/taro'
import {WebView} from '@tarojs/components'
import {connect} from '@tarojs/redux'

import {getSystemInfo,setSceneList} from '@/model/actions/global'
import tool from '@/utils/tool'
import work from '@/utils/work'
import Title from '@/components/Title'
import CustomIcon from '@/components/Icon'
import Sticker from '@/components/Sticker'
import Loading from '@/components/Loading'
import globalData from '@/services/global_data'
import Session from '@/services/session'
import service from '@/services/service'
import {appConfig} from '@/services/config'
import {createCache} from '@/services/cache'
import './index.less'
import image_code from '@/assets/images/code.png'
import image_versa from '@/assets/images/versa.png'
import addTips from "@/assets/images/tips_addpic@2x.png";
// import Dialog from '@/components/Dialog'

import BankCard from '@/components/BankCard'
import * as THREE from '../../utils/libs/three.weapp'
import { renderExample1 as renderExample, change } from '@/utils/example.js'

type PageStateProps = {
  global: {
 
  }
}

type PageDispatchProps = {

}

type PageOwnProps = {}

type PageState = {

}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Bank {
  props: IProps;
}

class Bank extends Component {
 
  render() {
      return <WebView src='https://mp.weixin.qq.com/s/-BV5wtaJNPuXBqahG6PkyQ' />
  }
}

export default Bank as ComponentClass<PageOwnProps, PageState>
