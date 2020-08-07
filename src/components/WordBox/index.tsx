import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Textarea, CoverView } from '@tarojs/components'
import globalData from "@/services/global_data"
import CustomIcon from '@/components/Icon'

import './index.less'

type ComponentStateProps = {}

type ComponentOwnProps = {
    uploadText: any
}

type ComponentState = {}

type IProps = ComponentStateProps & ComponentOwnProps

interface WordBox {
  props: IProps;
}

class WordBox extends Component {
  static defaultProps = {
    color: '#000',

  }
  state = {
    statusBarHeight: 20, // 状态栏高度
    titleBarHeight: 44,
  }
  componentWillMount () {}
  componentDidMount () {
    this.clacHeight()
  }
  clacHeight = () => {
    const systemInfo = Taro.getSystemInfoSync()
    const statusBarHeight = systemInfo.statusBarHeight || 20
    let totalTopHeight = 72
    if (/iphone x/i.test(systemInfo.model) || (/iphone/i.test(systemInfo.model) && /unknown/.test(systemInfo.model)) || /iphone\s11/i.test(systemInfo.model)) {
      totalTopHeight = 85
    } else if (systemInfo.model.indexOf('iPhone') !== -1) {
      totalTopHeight = 62
    }
    const titleBarHeight = totalTopHeight - statusBarHeight
    this.setState({
      statusBarHeight,
      titleBarHeight
    })
  }
  calcStyle = () => {
    const {statusBarHeight, titleBarHeight} = this.state
    const style = {
      paddingTop: statusBarHeight + 'px',
      height: titleBarHeight + 'px',
    }
    return style
  }
  submit(data){
      this.props.uploadText(data);
  }
  render() {
    return (
      <View className='textarea-wrap'>
          <Textarea disableDefaultPadding={true} onBlur={this.submit} focus={true}/>
      </View>
    )
  }
}

export default WordBox as ComponentClass<ComponentOwnProps, ComponentState>
