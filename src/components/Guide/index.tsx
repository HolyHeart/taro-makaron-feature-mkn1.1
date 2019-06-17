import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
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
    this.setState({
      open: false
    },()=>{
      Taro.setStorageSync('firstView','no')
    })
  }

  render() {
    const {open} = this.state
    return (
      <View className={`guide-wrap ${open ? '' : 'hidden'}`} onClick={this.handleClick}>
        <View className="modal"></View>
        <View className="content" style={{zIndex:1111}}>
            <Image src={guideImg} style={{width:'275px',height:'330px'}} />
        </View>        
      </View>
    )
  }
}

export default Guide as ComponentClass<ComponentOwnProps, ComponentState>