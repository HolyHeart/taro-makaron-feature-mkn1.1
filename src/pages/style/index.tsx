// added by Shichao.Ma
// 灵魂画手移植程序的Style页面
// 关于风格色：只是风格色按钮被隐藏，关于风格色的逻辑都被保存

import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Button, Image, ScrollView } from '@tarojs/components'
import './index.less'
import Title from '@/components/Title'
import CustomIcon from '@/components/Icon'
import segmantIcon from '@/assets/images/segment-icon.png'
import unsegmantIcon from '@/assets/images/unsegment-icon.png'
//import colorIcon from '@/assets/images/color-icon.png'
//import rawcolorIcon from '@/assets/images/rawcolor-icon.png'
import randomBg from '@/assets/images/random-bg.png'
import randomIcon from '@/assets/images/random-icon.png'
import { styleTransfer, base } from '@/services/service'
import Loading from '@/components/Loading'
import globalData from "@/services/global_data"
import { reject } from 'dist/npm/promise-polyfill/lib';
import tool from '@/utils/tool'

import AuthModal from '@/components/AuthModal'


type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

 interface Style {
  props: IProps;
}

class Style extends Component {
  config: Config = {
    navigationBarTitleText: '懒人抠图',
    disableScroll: true,
    enablePullDownRefresh:false
  }

  state = {
    saved: false, // 是否显示结果
    hasSegmentButton: false, // 是否呈现人像分割按钮，根据处理图片中是否包括人像来断定
    colorType: false, // 是否为原色，初始值为否
    segmentType: false, // 是否人像分离，初始值为不分离
    renderStatus: 'init', // 渲染结果 'success' 'fail' 'init' 'loading'
    styleShuffle: '随机风格', // 随机按钮文字，点击前为'随机风格'，点击后为风格名字
    styleShuffleBg: randomBg,
    imgUrl: '', // 用于展示的图片
    imgOrigin: '', // 原始图片
    imgUrlRender: '', // 未实现人像分离的图片
    imgUrlTarget: '', // 实现人像分离的图片
    imgUrlRenderOriColor: '', // 未实现人像分离的原色图片
    imgUrlTargetOriColor: '', // 实现人像分离的原色图片
    styleList:[],
    currentID: '',
    loading: false,
    isIpx:false
  }

  // Constructor
  constructor(props) {
    super(props);

  }

  app = Taro.getApp()
  
  onShareAppMessage (res) {
    this.app.aldstat.sendEvent('风格渲染编辑页分享', '风格渲染编辑页分享')
    // this.app.aldstat.sendEvent('生成页分享', {'场景名': this.state.currentScene.sceneName, '场景Id': this.state.currentScene.sceneId})
    // const {currentScene, result = {}} = this.state
    // const {shareImage = {}} = result
    const shareContent = globalData.themeData && globalData.themeData.shareContent
    const shareImageUrl = `${this.state.imgUrl}?x-oss-process=image/resize,m_pad,h_420,w_525`
    const data = {
      shareSource: this.state.imgUrl,
      themeId: globalData.themeId ,
    }
    const path = tool.formatQueryUrl('/pages/index', data)
    const {userInfo = {}} = globalData
    const title = `@${userInfo.nickName}：${shareContent}`

    return {
      title: title,
      path: path,
      imageUrl: shareImageUrl,
      success: () => {
        console.log('分享成功')
      },
    }
  }

  // 显示与隐藏Loading
  showLoading = () => {
    this.setState({
      loading: true
    })
  }
  hideLoading = () => {
    this.setState({
      loading: false
    })
  }
  componentDidMount(){
    this.getStyleList()
    this.initImage()
    this.isIpx()
  }
  // Functions
  isIpx(){
    Taro.getSystemInfo({
      success: (res)=> {
        if(res.model.search('iPhone X') != -1){
          this.setState({
            isIpx:true
          })
        }else{
          this.setState({
            isIpx:false
          })
        }
      }
    })
  }

  // 人像分离按钮
  segmentTypeToggle = async () => {
    this.showLoading()
    console.log('按下人像分离按钮')
    this.setState({
      segmentType: !this.state.segmentType
    })
    if (this.state.segmentType) {
      this.app.aldstat.sendEvent('风格渲染编辑页人景分离', '风格渲染编辑页人景分离')
      console.log('合并')
      this.setState({
        imgUrl: this.state.imgUrlRender,
      })
    } else {
      this.app.aldstat.sendEvent('风格渲染编辑页人景-分离-', '风格渲染编辑页人景-分离-')
      console.log('分离')
      this.setState({
        imgUrl: this.state.imgUrlTarget,
      })
    }
    this.hideLoading()
  }

  // 风格色按钮
  colorTypeToggle () {
    console.log('按下风格色按钮')
    this.setState({
      colorType: !this.state.colorType,
    })
    this.changeStyle(this.state.currentID,!this.state.colorType,this)
    console.log('风格色切换成功')
  }

  // 返回键按钮
  pageToHome = () => {
    this.app.aldstat.sendEvent('风格渲染完成页换张试试', '风格渲染完成页换张试试')
    Taro.navigateBack({ delta: 1 })
  }

  // 保存键按钮
  save () {
    this.app.aldstat.sendEvent('风格渲染编辑页保存', '风格渲染编辑页保存')
    console.log('按下保存键')
    Taro.downloadFile({
      url: this.state.imgUrl,
    }).then(res=>{
      if (res.statusCode === 200){
        Taro.authorize({
          scope: "scope.writePhotosAlbum",
        }).then(res1 => {
          Taro.saveImageToPhotosAlbum({
            filePath: res.tempFilePath
          }).then(res2=>{
            console.log(res2)
            this.setState({
              saved: !this.state.saved
            })
          })
        }, err => {
          Taro.getSetting().then(authSetting => {
            if (authSetting['scope.writePhotosAlbum']) {
            } else {
              Taro.showModal({
                title: '保存图片需要授权',
                content: '保存图片需要授权\n可以授权吗？',
                confirmText: "允许",
                cancelText: "拒绝",
              }).then(res => {
                if (res.confirm) {
                  Taro.authModal({
                    open: true
                  })
                }
              })
            }
          })
        })
      }
    })
  }

  // 返回键按钮
  returnAfterSave () {
    console.log('按下返回键')
    this.setState({
      saved: !this.state.saved
    })
  }

  // 引入标签列表
  // TODO 暂时无用
  async getTagList() {
    try {
      const tagList = await styleTransfer.tagList()
      console.log('Hey bro, check out this tag list')
      console.log(tagList.result)
      return tagList.result.featureTagVoList
    } catch (err) {
      console.log('Oops, failed to get tag list', err)
    }
  }

  // 引入风格列表
  async getStyleList ()  {
    console.log('get')
    this.state.styleList = globalData.themeData.styleInfoList
    // try {
    //   const styleList = await styleTransfer.styleList()
    //   styleList.result.result.forEach(element => {
    //     this.state.styleList.push(element)
    //   });
    // } catch (err) {
    //   console.log('Oops, failed to get style list', err)
    // }
  }

  // 随机选择风格
  shuffleStyle () {
    var min = 0
    var max = this.state.styleList.length-1
    var ran = this.getRandomNum(min, max)
    var theStyle = this.state.styleList[ran]
    var id = theStyle.styleId
    this.changeStyle (id, this.state.colorType, this)
    this.setState({
      styleShuffle: theStyle.name,
      styleShuffleBg: theStyle.stylePicUrl
    })
  }

  // 生成随机数
  getRandomNum (min, max) {
    var range = max - min
    var rand = Math.random()
    var index = min + Math.round(rand * range)
    // 写了个递归来实现不会随机到重复的风格
    if (this.state.styleList[index].styleId === this.state.currentID) {
      console.log('Oops，随机到了同一个风格，那就再随机一次~')
      return this.getRandomNum (min, max)
    } else {
      return (index)
    }
  }

  // 更换图片风格
  changeStyle = async (id, colorType, e) => {
    this.showLoading()
    console.log(id + '号风格按钮被按下')
    this.setState({
      currentID: id
    })
    try {
      const processedPic = await styleTransfer.segment(this.state.imgOrigin, id, 'N')
      console.log(processedPic)
      if (this.state.segmentType) {
        this.setState({
          imgUrlRender: processedPic.result.result.renderUrl,
          imgUrlTarget: processedPic.result.result.targetUrl,
          imgUrl: processedPic.result.result.targetUrl,
          currentID: id,
          renderStatus:'success'
        })
      } else {
        this.setState({
          imgUrlRender: processedPic.result.result.renderUrl,
          imgUrlTarget: processedPic.result.result.targetUrl,
          imgUrl: processedPic.result.result.renderUrl,
          currentID: id,
          renderStatus:'success'
        })
      }

      // 如果初次渲染失败，后面的尝试识别人物成功的话依然会显示人景分离按钮
      if (processedPic.result.result.renderUrl !== processedPic.result.result.targetUrl){
        this.setState({
          hasSegmentButton: true
        })
      }
      this.hideLoading()
    } catch (error) {
      this.setState({
        renderStatus:'fail'
      })
      this.hideLoading()
    }
  }

  // 主动选择其他风格后清除随机框内的内容
  clearShuffleBlock (id, colorType, e) {
    this.setState({
      styleShuffle: '随机风格',
      styleShuffleBg: randomBg
    })
    this.changeStyle(id, colorType, e)
  }

  // 初始化，上传本地图片到云端，讲图片渲染成43号阿波利奈尔风格，并判断是否可以进行人像分割
  initImage = async () => {
    this.showLoading()
    // 让图片渲染加载期间先展示原图
    this.setState({
      imgUrl: globalData.cropedImagePath
    })
    console.log('11')
    const remoteImgUrl = await base.upload(globalData.cropedImagePath)
    this.setState({
      imgOrigin: remoteImgUrl.url,
    })
    //console.log(remoteImgUrl.url)
    //console.log('croped image', globalData.cropedImagePath)
    try {
      const processedPic = await styleTransfer.segment(remoteImgUrl.url, globalData.themeData.styleInfoList[0].styleId, 'N')
      const renderUrl = processedPic.result.result.renderUrl
      this.setState({
        imgUrl: renderUrl,
        imgOrigin: remoteImgUrl.url,
        imgUrlRender: renderUrl,
        imgUrlTarget: processedPic.result.result.targetUrl,
        currentID: globalData.themeData.styleInfoList[0].styleId,
      })
    // 判断是否可以人像分离
      if (renderUrl !== processedPic.result.result.targetUrl){
        this.setState({
          hasSegmentButton: true
        })
      }
      this.hideLoading()
    } catch (error) {
      this.setState({
        renderStatus:'fail'
      })
      this.hideLoading()
    }

  }

  render () {
    const { saved, colorType, segmentType, hasSegmentButton, renderStatus, styleShuffle, styleList, imgUrl} = this.state

    let content
    let segBtn
    let colorBtn
    let bottomBtns
    let iPXblank

    if (this.state.isIpx) {
      iPXblank=(
        <View style='margin-top:50rpx'></View>
      )
    }

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
    } else {
      segBtn = (
        <View style='margin-top: 30rpx; margin-bottom: 25rpx'></View>
      )
    }

    // if (!colorType) {
    //   colorBtn = (
    //     <View className='type-button' style='margin-left: 20rpx' onClick={this.colorTypeToggle}>
    //       <View className='icon-wrap'>
    //         <Image src={colorIcon} style='width:48rpx; height:48rpx'></Image>
    //       </View>
    //       <View className='title-wrap'>
    //         风格色
    //       </View>
    //     </View>
    //   )
    // } else if (colorType) {
    //   colorBtn = (
    //     <View className='type-button bg' style='margin-left: 20rpx' onClick={this.colorTypeToggle}>
    //       <View className='icon-wrap'>
    //         <Image src={rawcolorIcon} style='width:48rpx; height:48rpx'></Image>
    //       </View>
    //       <View className='title-wrap'>
    //         原色
    //       </View>
    //     </View>
    //   )
    // }

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
          <View className='result-wrap' style='margin-top:30rpx'>
            {/* <Image className='icon' src={savedTitle}></Image> */}
            <Text className='text'>保存成功</Text>
          </View>
          <View className='back-wrap'>
            {/* <Button className='button black' onClick={this.returnAfterSave}>返回</Button> */}
            <Button className='button red' onClick={this.pageToHome}>换张试试</Button>
          </View>
        </View>
      )
    } else if (!saved) {
      // 如果图片未被保存，显示内容为【编辑界面】
      content = (
        <View className='main'>
          <View className='style-bg'>
          </View>
          {/* 人景分离及风格色按钮组 */}
          <View className='type-wrap' style='margin-top:4%'>
            {segBtn}
            {colorBtn}
          </View>
          {/* 风格选择区域 */}
          <View className='style-wrap' style='margin-top:4%'>
            <ScrollView className='scroll' scrollX={true}>
              <View className='random-component' onClick={this.shuffleStyle}>
                {/* 随机按钮 */}
                <Image src={this.state.styleShuffleBg} className='bg' style="width:100%;height:100%"></Image>
                <Image src={randomIcon} className='icon'></Image>
                <View className='title'>
                  <Text>{styleShuffle}</Text>
                </View>
              </View>
              {/* 风格列表 */}
              {styleList.map(item=>{
                return <View className='random-component' style='margin-left:20rpx' onClick={this.clearShuffleBlock.bind(this, item.styleId, this.state.colorType)}>
                  <Image src={item.stylePicUrl} className='bg' style="width:100%;height:100%"></Image>
                  <View className='title-bg'>
                    <Text>{item.name}</Text>
                    {this.state.currentID === item.styleId ?<Text class="iconRed"></Text>:''}
                  </View>
                </View>
                })
              }
            </ScrollView>
          </View>
          {/* 保存及分享按钮组及出错提示 */}
          <View style='margin-top:4%'>
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
          }>懒人抠图</Title>
        {iPXblank}
        <View style='margin-top:3%'>
        </View>

        {/* 加入loading */}
        <Loading visible={this.state.loading} />

        <View className='page-style'>
          {/* 图片部分 */}
          <View className='header'>
            <View className='image-wrap'>
              <Image className='origin-image' src={imgUrl}></Image>
            </View>
          </View>
          {/* 操作部分 */}
          {content}
        </View>
        <AuthModal />
      </View>
    )
  }
}

export default Style as ComponentClass<PageOwnProps, PageState>
