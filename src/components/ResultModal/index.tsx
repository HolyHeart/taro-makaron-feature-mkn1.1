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
  image?: object
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
  render() {
    const { image, video, type } = this.props
    return (
      <View className='result-wrap'>
        <View className="modal-mask"></View>
        <View className="modal-content">
          <Title 
            top={20 + 10}
            color="#333"
            renderLeft={
              <CustomIcon type="back" theme="dark" onClick={work.pageToHome}/>
            }
          >马卡龙</Title>
          {type === 'image' && 
            <View class="pic-wrap">
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
          <View className="btn-wrap">
            <Button className="custom-button dark" hoverClass="btn-hover"  onClick={this.handleClick}>再玩一次</Button>            
          </View>
        </View>        
      </View>
    )
  }
}

export default ResultModal as ComponentClass<ComponentOwnProps, ComponentState>