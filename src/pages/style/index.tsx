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
import { styleTransfer, base } from '@/services/service'





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
    navigationBarTitleText: '马卡龙玩图',
    disableScroll: true,
    enablePullDownRefresh:false
  }

  state = {
    choosedImage: '',
    saved: false, // 是否显示结果
    hasSegmentButton: true, // 是否呈现人像分割按钮，根据处理图片中是否包括人像来断定
    colorType: false, // 原色or风格色
    segmentType: true, // 是否人像分离
    renderStatus: 'init', // 渲染结果 'success' 'fail' 'init' 'loading'
    styleShuffle: '智能风格推荐', // 随机按钮文字，点击前为'随机风格'，点击后为风格名字

    imgUrl: testImg,

    styleList:[],
 
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

  // Functions
  // 人像分离按钮
  // TODO 
  segmentTypeToggle () {
    console.log('按下人像分离按钮')
    this.setState({
      segmentType: !this.state.segmentType
    })
  }

  // 风格色按钮
  // TODO 
  colorTypeToggle () {
    console.log('按下风格色按钮')
    this.setState({
      colorType: !this.state.colorType
    })
  }

  // 返回键按钮
  pageToHome = () => {
    Taro.navigateBack({ delta: 1 })
  }

  // 保存键按钮
  save () {
    console.log('按下保存键')
    this.setState({
      saved: !this.state.saved
    })
  }

  // 引入标签列表
  async getTagList() {
    try {
      const tagList = await styleTransfer.tagList()
      console.log('Hey bro, check out this tag list')
      console.log(tagList.result)
      // TODO
      return tagList.result.featureTagVoList
    } catch (err) {
      console.log('Oops, failed to get tag list', err)
    }
  }

  // 引入风格列表
  getStyleList = async () =>  {
    this.state.styleList = []
    try {
      const styleList = await styleTransfer.styleList()
      styleList.result.result.forEach(element => {
        this.state.styleList.push(element)
      });
    } catch (err) {
      console.log('Oops, failed to get style list', err)
    }
  }

  // 跟换图片风格
  changeStyle = async (id, e) => {
    console.log(id + '号风格按钮被按下')
    const remoteImgUrl = await base.upload(testImg)
    console.log(remoteImgUrl)
    const processedPic = await styleTransfer.segment(remoteImgUrl.url, id, this.state.colorType)
    console.log(processedPic)

    this.setState({
      imgUrl: processedPic.result.result.renderUrl
    })

  }

  // TODO 初始化，上传本地图片到云端
  initImage = async () => {
    const remoteImgUrl = await base.upload(testImg)
    this.state.imgUrl = remoteImgUrl.url
  }

  render () {
    const { saved, colorType, segmentType, hasSegmentButton, renderStatus, styleShuffle, styleList, imgUrl} = this.state

    let content
    let segBtn
    let colorBtn
    let bottomBtns


    // 初始化部分
    // TODO
    this.getStyleList()
    this.initImage()



    // 判断是否需要”人景分离“按钮
    if (hasSegmentButton) {
      if (segmentType) {
        segBtn = (
          <View className='type-button bg' onClick={this.segmentTypeToggle}>
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
          <View className='type-button' onClick={this.segmentTypeToggle}>
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
        <View className='type-button' style='margin-left: 20rpx' onClick={this.colorTypeToggle}>
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
        <View className='type-button bg' style='margin-left: 20rpx' onClick={this.colorTypeToggle}>
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
          <Button id='save' className='button black' onClick={this.save}>保存至相册</Button>
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
            <Button className='button black' onClick={this.pageToHome}>返回</Button>
            <Button className='button red' style='margin-left: 20rpx' onClick={this.pageToHome}>换张试试</Button>
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
              {/* 风格列表 */}
              {styleList.map(item=>{
                console.log(item)
                return <View className='random-component' style='margin-left:20rpx'>
                  <Image src={item.stylePicUrl} className='bg' style="width:100%;height:100%" onClick={this.changeStyle.bind(this, item.detailId)}></Image>
                  <View className='title-bg'>
                    <Text>{item.name}</Text>
                  </View>
                </View>
                })
              }
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
             <Image className='origin-image' src={imgUrl}></Image>

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