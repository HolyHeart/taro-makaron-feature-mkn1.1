import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import './index.less'
import guideImg from '@/assets/images/guide.gif'

type ComponentStateProps = {}

type ComponentOwnProps = {
  onClick: () => void
}

type ComponentState = {}

type IProps = ComponentStateProps & ComponentOwnProps

interface Guide {
  props: IProps;
}

class Guide extends Component {
  state = {
    open: false
  }
  componentDidShow () {
  }
  app = Taro.getApp()
  componentDidMount () {
    try {
      const  value = Taro.getStorageSync('firstView')
      console.log(value)
      if (value ==='yes' ||value ==='') {
        this.setState({
          open:true
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  componentDidHide () {
  }

  componentWillUnmount () {
  }

  handleClick = () => {
    console.log(this)
    this.app.aldstat.sendEvent('关闭引导', '关闭引导')
    setTimeout(() => {
      this.setState({
        open: false
      },()=>{
        Taro.setStorageSync('firstView','no')
      })
    }, 400);
  }

  render() {
    const {open} = this.state
    return (
      <View className={`guide-wrap ${open ? '' : 'hidden'}`} >
        <View className="modal"></View>
        <View className="content" style={{zIndex:1111}}>
            <Image src={guideImg} className="guide_gif" style={{width:'275px',height:'330px'}} />
            <Button className="fun-button pink" hoverClass="btn-hover" onClick={this.handleClick} openType="getUserInfo">立即体验</Button>
        </View>
      </View>
    )
  }
}

export default Guide as ComponentClass<ComponentOwnProps, ComponentState>
