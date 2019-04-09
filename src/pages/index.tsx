import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import tool from '@/utils/tool'

type PageStateProps = {
  counter: {
    num: number
  }
}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

class Index extends Component {

  config: Config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () { 
    console.log('index page willMount', this.$router.params)
    let {from = 'app', remoteURL = ''} = this.$router.params
    const data = {
      from,
      remoteURL
    }
    const path = tool.formatQueryUrl('/pages/share/index', data)
    Taro.redirectTo({url: path})
  }

  componentWillReceiveProps (nextProps) {
    // console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'></View>
    )
  }
}

export default Index as ComponentClass<PageOwnProps, PageState>
