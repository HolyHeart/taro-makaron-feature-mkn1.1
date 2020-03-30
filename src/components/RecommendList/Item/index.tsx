import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Form, Button, Image } from '@tarojs/components'

import './index.less'
type ComponentStateProps = {}

type ComponentOwnProps = {
  onClick?: () => void,
  onGetUserInfo?: (item:object) => void,
  onFormSubmit?: (item:object) => void,
  data: object,
}

type ComponentState = {}

type IProps = ComponentStateProps & ComponentOwnProps

interface Item {
  props: IProps;
}

class Item extends Component {
  static defaultProps = {
    data: {},
    onGetUserInfo: () => {},
    onFormSubmit: () => {},
  }  
  formSubmit = (e) => {
    const { onFormSubmit} = this.props
    typeof onFormSubmit === 'function' && onFormSubmit(e)
  }
  handleGetUserInfo = (e) => {
    const { onGetUserInfo} = this.props
    typeof onGetUserInfo === 'function' && onGetUserInfo(e)
  }
  render() {
    const { onClick, data } = this.props
    return (
      <View className="recommend-item" onClick={onClick}>
        <Form onSubmit={this.formSubmit} reportSubmit>
            <Button
              className="recommend-button" 
              hoverClass="btn-hover"
              openType="getUserInfo" 
              onGetUserInfo={this.handleGetUserInfo}
              formType='submit'>
                {
                  data.worksType === 'pic' ? 
                  <Image 
                  className='recommend-image' 
                  src={data.renderPictureInfo.url} 
                  style='width: 100%; height: 100%' 
                  mode='aspectFit'
                />
                  :
                  <Image 
                  className='recommend-image' 
                  src={data.renderPictureInfo.firstFrame} 
                  style='width: 100%; height: 100%' 
                  mode='aspectFill'
                />
                }
                   
              </Button>
          </Form>
      </View>   
    )
  }
}

export default Item as ComponentClass<ComponentOwnProps, ComponentState>