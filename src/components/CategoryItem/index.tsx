import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Button, Image, Form } from '@tarojs/components'

import './index.less'
import loading from '../../assets/images/pic_loading.png'

type ComponentStateProps = {}

type ComponentOwnProps = {
  onGetUserInfo: (data:any) => void,
  onClick?: () => void,
  onFormSubmit?: (e?:any) => void,
  url: string,
  column: number
}

type ComponentState = {}

type IProps = ComponentStateProps & ComponentOwnProps

interface CategotyItem {
  props: IProps;
}

class CategotyItem extends Component {
  static defaultProps = {
    url: loading,
    column: 2
  }
  componentWillReceiveProps (nextProps) {
    // console.log(this.props, nextProps)
  }
  handleGgetUserInfo = (data) => {
    const { onGetUserInfo } = this.props
    onGetUserInfo(data)
  }
  handleFormSubmit = (e) => {
    const { onFormSubmit } = this.props
    typeof onFormSubmit === 'function' && onFormSubmit(e)
  }
  render() {
    const { onClick, url, column } = this.props
    return (
      <View className={`category-box ${column === 2 ? 'two' : 'one'}`} onClick={onClick}>
        <Form onSubmit={this.handleFormSubmit} reportSubmit>
          <Button
            className="category-box-button"
            hoverClass="btn-hover"
            openType="getUserInfo"
            onGetUserInfo={this.handleGgetUserInfo}
            formType="submit">
            <Image
              className="category-box-image"
              src={url}
              mode="scaleToFill"/>
          </Button>
        </Form>
      </View>
    )
  }
}

export default CategotyItem as ComponentClass<ComponentOwnProps, ComponentState>
