import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Button, Image } from '@tarojs/components'

import globalData from '@/services/global_data'
import bg from '@/assets/images/BG@2x.png'
import './index.less'

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {
  choosedImage: string
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Error {
  props: IProps;
}

class Error extends Component {
  config: Config = {
    navigationBarTitleText: '懒人抠图'
  }

  state = {
    choosedImage: ''
  }
  componentDidMount () {
    this.setState({
      choosedImage: globalData.choosedImage
    })
  }
  componentWillReceiveProps (nextProps) {
    // console.log(this.props, nextProps)
  }
  componentWillUnmount () { }
  componentDidShow () { }
  componentDidHide () { }

  pageToHome = () => {
    Taro.redirectTo({
      url: '/pages/home/index'
    })
  }

  render () {
    const { choosedImage } = this.state
    return (
      <View className='page-error'>
        <Image className='bg' src={bg} mode='aspectFill' style='width:100%; height:100%'/>
        <View className='main'>
          <View class='pic-wrap'>
            <View class='error-image'>
              <Image style='width: 100%; height:100%' src={choosedImage} mode='aspectFill' />
            </View>
            <View class='error-tip'>
              <View>技术犯规惹, </View>
              <View>请选择一张带<Text class='red'>人像</Text>的照片</View>
            </View>
          </View>
          <Button className="custom-button pink" hoverClass="btn-hover" onClick={this.pageToHome}>再试一次</Button>
        </View>
      </View>
    )
  }
}

export default Error as ComponentClass<PageOwnProps, PageState>
