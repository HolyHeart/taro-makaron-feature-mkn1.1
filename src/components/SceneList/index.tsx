import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'

import './index.less'
import SceneItem from './SceneItem'
import CustomItem from './CustomItem'
type ComponentStateProps = {}

type ComponentOwnProps = {
  onClick?: (item:object) => void,
  onCustomClick?: (options?:object) => void,
  customable: boolean,
  list: Array<object>,
  currentScene: object,
  styleObj: object
}

type ComponentState = {}

type IProps = ComponentStateProps & ComponentOwnProps

interface SceneList {
  props: IProps;
}

class SceneList extends Component {

  static defaultProps = {
    customable: false,
    list: [],
    currentScene: {}
  }

  componentWillReceiveProps (nextProps) {
    // console.log(this.props, nextProps)
  }

  handleClick = (item) => {
    const { onClick} = this.props
    typeof onClick === 'function' && onClick(item)
  }

  handleClickCustom = () => {
    const { onCustomClick} = this.props
    typeof onCustomClick === 'function' && onCustomClick()
  }

  render() {
    const { list, customable, currentScene, styleObj } = this.props
    return (
      <View className="scene-list" style={styleObj}>
        <ScrollView 
          className="scroll"
          scrollX
        > {customable && 
            <CustomItem 
              onClick={this.handleClickCustom} 
              active={!currentScene.sceneId}
              thumbnailUrl={currentScene.type === 'custom' && currentScene.thumbnailUrl}
            />
          }
          {list.map((item, index) => {
            return <SceneItem 
                active={currentScene.sceneId === item.sceneId}
                key={index} 
                thumbnailUrl={item.thumbnailUrl}
                bgUrl={item.bgUrl}
                sceneName={item.sceneName}
                hasIcon={item.hasIcon}
                iconType={item.supportMusic ? 'gif-music' : 'gif-music'}
                onClick={this.handleClick.bind(this, item)}
              />
          })}
        </ScrollView>
      </View>
    )
  }
}

export default SceneList as ComponentClass<ComponentOwnProps, ComponentState>