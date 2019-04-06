import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Form, Button, Image } from '@tarojs/components'

import './index.less'
type ComponentStateProps = {}

type ComponentOwnProps = {
  onClick?: () => void,
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
  }  
  formSubmit = (e) => {
    console.log('formSubmit', e)
  }
  handleGetUserInfo = (e) => {
    console.log('handleGetUserInfo', e)
  }
  render() {
    const { onClick, data } = this.props
    return (
      <View className="recommend-item" onClick={onClick}>
        <Form onSubmit={this.formSubmit} reportSubmit>
            <Button
              className="recommend-button" 
              hoverClass="btnhover"
              openType="getUserInfo" 
              onGetUserInfo={this.handleGetUserInfo}
              formType='submit'>
                <Image 
                  className='recommend-image' 
                  src={data.recommendShowUrl} 
                  style='width: 100%; height: 100%' 
                  mode='scaleToFill'
                />   
              </Button>
          </Form>
      </View>   
    )
  }
}

export default Item as ComponentClass<ComponentOwnProps, ComponentState>