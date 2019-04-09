import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Button, Image, Video } from '@tarojs/components'
import Title from '@/components/Title'
import CustomIcon from '@/components/Icon'
import work from '@/utils/work'

import './index.less'

type ComponentStateProps = {}

type ComponentOwnProps = {
  onClick?: () => void,
  type?: string,
  video?: object,
  image?: object,
  layer?: boolean,
  renderButton?: any
}

type ComponentState = {}

type IProps = ComponentStateProps & ComponentOwnProps

interface ResultModal {
  props: IProps;
}

class ResultModal extends Component {
  static defaultProps = {
    type: 'image',
    image: {
      url: ''
    },
    layer: false,   
    video: {
      url: '',
      width: 0,
      height: 0
    },
    onClick: () => {},
  }

  handleClick = () => {
   this.props.onClick && this.props.onClick()
  }
  pageToHome = () => {
    Taro.redirectTo({
      url: '/pages/home/index'
    })
  }
  render() {
    const { layer, image, video, type } = this.props
    return (
      <View className='result-wrap'>
        <View className="modal-mask"></View>
        <View className="modal-content">
          <Title
            color="#333"
            leftStyleObj={{left: Taro.pxTransform(15)}}
            renderLeft={
              <CustomIcon type="home" theme="dark" onClick={this.pageToHome}/>
            }
          >马卡龙玩图</Title>
          
          {type === 'image' &&             
            <View class="pic-wrap">
              {layer && <View class="layer"></View>}
              <Image class="pic" src={image.url} mode="aspectFill" />
            </View>
          }
          {type === 'video' && 
            <View class="video-wrap">
              <Video 
                className="video"
                style={{width: Taro.pxTransform(video.width), height: Taro.pxTransform(video.height)}}
                src={video.url}
                poster={video.url+'?x-oss-process=video/snapshot,t_0,f_png,w_0,h_0,m_fast'}
                controls
                autoplay
                loop
                objectFit='cover'
              ></Video>     
            </View> 
          } 
          {this.props.renderButton}
        </View>        
      </View>
    )
  }
}

export default ResultModal as ComponentClass<ComponentOwnProps, ComponentState>