import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Image } from '@tarojs/components'

import './index.less'
import Item from './Item'
type ComponentStateProps = {}

type ComponentOwnProps = {
  onClick?: (item:object) => void,
  onGetUserInfo?: (item:object) => void,
  onFormSubmit?: (item:object) => void,
  list: Array<object>,
  styleObj: object
}

type ComponentState = {}

type IProps = ComponentStateProps & ComponentOwnProps

interface RecommendList {
  props: IProps;
}

class RecommendList extends Component {

  static defaultProps = {
    list: [],
    currentScene: {},
    onGetUserInfo: () => {},
    onFormSubmit: () => {},
  }

  handleClick = (item) => {
    const { onClick} = this.props
    typeof onClick === 'function' && onClick(item)
  }

  render() {
    const { styleObj, list, onGetUserInfo, onFormSubmit } = this.props
    console.log('props',this.props)
    return (
      <View className="recommend" style={styleObj}>
        <ScrollView 
          className="scroll"
          scrollX
        >
          {list.map((item, index) => {
            return <Item 
                key={index}
                data={item}
                onGetUserInfo={onGetUserInfo}
                onFormSubmit={onFormSubmit}
                onClick={this.handleClick.bind(this, item)}
              />
          })}
        </ScrollView>
      </View>
    )
  }
}

export default RecommendList as ComponentClass<ComponentOwnProps, ComponentState>