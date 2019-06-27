// added by Shichao.Ma
// 灵魂画手移植程序的Style页面
// TODO 功能化按键

import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Button, Image, ScrollView } from '@tarojs/components'

import globalData from '@/services/global_data'

import './index.less'

import Title from '@/components/Title'
import CustomIcon from '@/components/Icon'

import testImg from '@/assets/images/Test.png'



import segmantIcon from '@/assets/images/segment-icon.png'
import unsegmantIcon from '@/assets/images/unsegment-icon.png'
import colorIcon from '@/assets/images/color-icon.png'
import rawcolorIcon from '@/assets/images/rawcolor-icon.png'
import randomBg from '@/assets/images/random-bg.png'
import randomIcon from '@/assets/images/random-icon.png'






type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {
  choosedImage: string
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Style {
  props: IProps;
}

class Style extends Component {
  config: Config = {
    navigationBarTitleText: '马卡龙玩图'
  }

  state = {
    choosedImage: '',
    // 是否显示结果
    saved: false,

    hasSegmentButton: true,
    colorType: false,
    segmentType: true,
    renderStatus: 'init', // 渲染结果 'success' 'fail' 'init' 'loading'

    styleShuffle: '随机风格', // 随机按钮文字，点击前为'随机风格'，点击后为风格名字
    



  }
  componentDidMount () {
    this.setState({
      choosedImage: globalData.choosedImage
    })
  }
  componentWillReceiveProps (nextProps) {
    // console.log(this.props, nextProps)
  }
  componentWillUnmount () { }
  componentDidShow () { }
  componentDidHide () { }



  pageToHome = () => {
    Taro.navigateBack({ delta: 1 })
  }












  render () {
    const { saved, colorType, segmentType, hasSegmentButton, renderStatus, styleShuffle } = this.state


    let content
    let segBtn
    let colorBtn
    let bottomBtns



    // 判断是否需要”人景分离“按钮
    if (hasSegmentButton) {
      if (segmentType) {
        segBtn = (
          <View className='type-button bg'>
            <View className='icon-wrap'>
              <Image mode='scaleToFill' src={unsegmantIcon} style='width:48rpx; height:48rpx'></Image>
            </View>
            <View className='title-wrap'>
              人景-分离-
            </View>
          </View>
        ) 
      } else if (!segmentType) {
        segBtn = (
          <View className='type-button'>
            <View className='icon-wrap'>
              <Image mode='scaleToFill' src={segmantIcon} style='width:48rpx; height:48rpx'></Image>
            </View>
            <View className='title-wrap'>
              人景分离
            </View>
          </View>
        ) 
      }
    } 



    if (colorType) {
      colorBtn = (
        <View className='type-button' style='margin-left: 20rpx'>
          <View className='icon-wrap'>
            <Image src={colorIcon} style='width:48rpx; height:48rpx'></Image>
          </View>
          <View className='title-wrap'>
            风格色
          </View>
        </View>
      )
    } else if (!colorType) {
      colorBtn = (
        <View className='type-button bg' style='margin-left: 20rpx'>
          <View className='icon-wrap'>
            <Image src={rawcolorIcon} style='width:48rpx; height:48rpx'></Image>
          </View>
          <View className='title-wrap'>
            原色
          </View>
        </View>
      )
    }


    if (renderStatus !== 'fail'){
      bottomBtns = (
        <View className ='share-wrap'>
          <Button id='save' className='button black'>保存至相册</Button>
          <Button id='share' className='button red' style='margin-left: 20rpx' openType='share'>分享</Button>
        </View>
      )
    } else if (renderStatus == 'fail') {
      bottomBtns = (
        <View className='tip-wrap'>
          <Text style='font-size:30rpx'>渲染出错啦，切换风格重试一下吧~</Text>
        </View>
      )
    }


    if (saved) {
      // 如果图片被保存，显示内容则为【保存界面】
      content = (
        <View className='footer'>
          <View className='result-wrap'>
            {/* <Image className='icon' src={savedTitle}></Image> */}
            <Text className='text'>保存成功</Text>  
          </View>
          <View className='back-wrap'>
            <Button className='button black'>返回</Button>
            <Button className='button red' style='margin-left: 20rpx'>换张试试</Button>
          </View>
        </View>
      )
    } else if (!saved) {
      // 如果图片未被保存，显示内容为【编辑界面】
      content = (
        <View className='main'>
          <View className='style-bg'>
            {/* TODO: Brush component */}
          </View>

          {/* 人景分离及风格色按钮组 */}
          <View className='type-wrap' style='margin-top:20rpx'>
            {segBtn} 
            {colorBtn}
          </View>

          {/* 风格选择区域 */}
          <View className='style-wrap' style='margin-top:30rpx'>
            <ScrollView className='scroll' scrollX={true}>
              <View className='random-component'>
                {/* 随机按钮 */}
                <Image src={randomBg} className='bg' style="width:100%;height:100%"></Image>
                <Image src={randomIcon} className='icon'></Image>
                <View className='title'>
                  <Text>{styleShuffle}</Text>
                </View>
              </View>


              


              <View className='random-component' style='background: #111111'>
              </View>
              <View className='random-component' style='background: #222222'>
              </View>
              <View className='random-component' style='background: #333333'>
              </View>
              <View className='random-component' style='background: #444444'>
              </View>
              <View className='random-component' style='background: #555555'>
              </View>
              <View className='random-component' style='background: #666666'>
              </View>
              <View className='random-component' style='background: #777777'>
              </View>
              <View className='random-component' style='background: #888888'>
              </View>



            </ScrollView>

          </View>


          {/* 保存及分享按钮组及出错提示 */}
          <View style='margin-top:35rpx'>
            {bottomBtns}
          </View>

        </View>
      )

    }







    return (
    
      <View>
        {/* 标题栏 */}
        <Title color="#333" leftStyleObj={{left: Taro.pxTransform(8)}}
          renderLeft={
            <CustomIcon type="back" theme="dark" onClick={this.pageToHome}/>
          }>马卡龙玩图</Title>

        <View className='page-style'>
          {/* 图片部分 */}
          <View className='header'>
            <View className='image-wrap'>
              {/* <Image className='origin-image' src='https://camo.githubusercontent.com/3e1b76e514b895760055987f164ce6c95935a3aa/687474703a2f2f73746f726167652e333630627579696d672e636f6d2f6d74642f686f6d652f6c6f676f2d3278313531333833373932363730372e706e67'></Image> */}
              <Image className='origin-image' src={testImg}></Image>

              {/* TODO */}

            </View>
          </View>

          {/* 操作部分 */}
          {content}



        </View>  
      </View>  


    

    )
  }
}

export default Style as ComponentClass<PageOwnProps, PageState>
