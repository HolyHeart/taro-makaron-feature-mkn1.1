import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Form, Button, Image, Video } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { add, minus, asyncAdd } from '@/model/actions/counter'
import Title from '@/components/Title'
import CustomIcon from '@/components/Icon'
import RecommendList from '@/components/RecommendList'
import Session from '@/services/session'
import service from '@/services/service'
import './index.less'
const demo = 'http://hiphotos.baidu.com/news/crop%3D48%2C0%2C532%2C357%3Bq%3D80%3B/sign=e160db01df1373f0e17035df993b73d7/a71ea8d3fd1f4134a72946042b1f95cad1c85ea9.jpg'
type PageStateProps = {
  counter: {
    num: number
  }
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Share {
  props: IProps;
}

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))
class Share extends Component {
  config: Config = {
    navigationBarTitleText: '马卡龙玩图'
  }

  state = {
    shareSourceType: 'video', // 'video' 'image'
    shareSource: 'https://static01.versa-ai.com/upload/201bae375f8b/18e62d91-fc04-46c6-8f21-7224b53eb4b7.mp4',
    videoPoster: '',
    width: 690,
    height: 920,
    recommendList: []
  }
  componentDidMount () { 
    this._initPage()
  }
  componentWillReceiveProps (nextProps) {
    // console.log(this.props, nextProps)
  }
  componentWillUnmount () { }
  componentDidShow () { }
  componentDidHide () { }

  _initPage = async () => {
    await Session.set()
    this.getRecommendList()
  }
  getRecommendList = async () => {
    const recommendData = await service.core.recommend()
    console.log('recommendData', recommendData.result.result)
    this.setState({
      recommendList: (recommendData.result && recommendData.result.result) || []
    })
  }

  pageToHome = () => {
    Taro.redirectTo({
      url: '/pages/home/index'
    })
  }
  formSubmit = (e) => {
    console.log('formSubmit', e)
  }
  handleGetUserInfo = (e) => {
    console.log('handleGetUserInfo', e)
  }

  render () {
    const {shareSourceType, shareSource, videoPoster, width, height, recommendList} = this.state
    return (
      <View className='page-share'>
        <Title
          leftStyleObj={{left: Taro.pxTransform(12)}}
          renderLeft={
            <CustomIcon type="home" theme="dark" onClick={this.pageToHome}/>
          }
          color='#333'
        >马卡龙玩图</Title>
        <View className='main-section'>
          {shareSourceType === 'image' && 
            <View className='pic-wrap'>
              <View class="share-bg"></View>
              <View class="share-img">
                <Image src={demo} style='width: 100%; height: 100%' mode='scaleToFill'/>      
              </View>
            </View>
          }
          {shareSourceType === 'video' && 
            <View className='video-wrap'>
              <Video
                className="video"
                style={{width: Taro.pxTransform(width), height:Taro.pxTransform(height - 2)}}
                loop
                autoplay
                src={shareSource}
                poster={demo}
                objectFit='cover'
                controls
              ></Video>            
            </View>
          }          
        </View>
        <View className='sub-section'>
          <Form onSubmit={this.formSubmit} reportSubmit>
            <Button
              className="button animation-btn" 
              hoverClass="btnhover"
              openType="getUserInfo" 
              onGetUserInfo={this.handleGetUserInfo}
              formType='submit'>限时用同款</Button>
          </Form>    
          <View className='recommend-wrap'>
            <View className='recommend-title'>你还可以玩：</View>
            <RecommendList list={recommendList} />
          </View>      
        </View>        
      </View>
    )
  }
}

export default Share as ComponentClass<PageOwnProps, PageState>
{/* <View className=''></View> */}