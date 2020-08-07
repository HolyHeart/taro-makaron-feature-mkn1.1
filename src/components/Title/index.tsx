import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Text, CoverView } from '@tarojs/components'
import globalData from "@/services/global_data"
import CustomIcon from '@/components/Icon'

import './index.less'

type ComponentStateProps = {}

type ComponentOwnProps = {
  showBack: any,
  children: any,
  color?: string,
  leftStyleObj?: object,
  isScrollToTop?:boolean,
  backHandler?: any
}

type ComponentState = {}

type IProps = ComponentStateProps & ComponentOwnProps

interface Title {
  props: IProps;
}

class Title extends Component {
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
  render() {
    const { color, leftStyleObj,isScrollToTop } = this.props
    const {statusBarHeight, titleBarHeight} = this.state
    return (
      <CoverView className='title-wrap' style={{backgroundColor:isScrollToTop?'rgba(255,255,255,0)':'rgba(255,255,255,1)',...this.calcStyle()}}>
        <CoverView className="left" style={{top:`${statusBarHeight+titleBarHeight/2}px`,...leftStyleObj}}>
        <CoverView>
            {this.props.showBack && <CustomIcon type="back" theme="dark" onClick={this.props.backHandler} />}
        </CoverView>
        </CoverView>
        <CoverView style={{color}}>{this.props.children}</CoverView>
      </CoverView>
    )
  }
}

export default Title as ComponentClass<ComponentOwnProps, ComponentState>
