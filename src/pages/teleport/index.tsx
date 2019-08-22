import { ComponentClass } from 'react'
import Taro, { Component, Config} from '@tarojs/taro'
import { View, Button, Image, Form } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { getSystemInfo } from '@/model/actions/global'
import work from '@/utils/work'
import Title from '@/components/Title'
import CustomIcon from '@/components/Icon'
import globalData from '@/services/global_data'
import { teleport, core } from '@/services/service'
import bg4TP from '@/assets/images/bg4TP@2x.jpg'
import refreshIcon from '@/assets/images/refresh@2x.png'
import AuthModal from '@/components/AuthModal'

import './index.less'

import Loading from '@/components/Loading'

import session from '@/services/session'
import tool from '@/utils/tool';




// const mock_path = 'https://static01.versa-ai.com/upload/783272fc1375/999deac02e85f3ea.png'
// const mock_segment_url = 'https://static01.versa-ai.com/images/process/segment/2019/01/14/b4cf047a-17a5-11e9-817f-00163e001583.png'

type PageStateProps = {
  global: {
    system: object
  }
}

type PageDispatchProps = {
  getSystemInfo: (data:object) => void
}

type PageOwnProps = {}

type PageState = {
  foreground: {
    remoteUrl: string,
    zIndex: number,
    width: number,
    height: number,
    x: number,
    y: number,
    rotate: number,
    originWidth: number,
    originHeight: number,
    autoWidth: number,
    autoHeight: number,
    autoScale: number,
    fixed: boolean,
    visible: boolean
  },
  coverList: Array<object>
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Teleport {
  props: IProps;
}

@connect(({ global }) => ({
  global
}), (dispatch) => ({
  getSystemInfo (data) {
    dispatch(getSystemInfo(data))
  }
}))
class Teleport extends Component {
  sceneId = ''
  config: Config = {
    navigationBarTitleText: '懒人抠图',
    disableScroll: true,
    enablePullDownRefresh:false
  }
  state = {
    screenHeight: 0,
    screenWidth: 0,
    titleHeight: 0,
    loading: false,
    imgUrl: '',
    userName: '',
    showError: false
  }

  app = Taro.getApp()


  componentWillMount () {
    // 解析域名
    this.sceneId = this.$router.params.scene
    // 获取手机基本信息
    const systemInfo = Taro.getSystemInfoSync()
    this.setState({
      screenHeight: systemInfo.screenHeight,
      screenWidth: systemInfo.screenWidth,
    })
    this.showLoading()
    this.getTheImage()
    this.ifGetUserInfo()
  }

  async componentDidMount () {
    await session.set()
    if (globalData.totalTopHeight) {
      this.setState({
        titleHeight: globalData.totalTopHeight
      })
    } else {
      this.setState({
        titleHeight: 65
      })
    }
  }

  componentWillReceiveProps (nextProps) { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }


  // 判断是否已经授权
  ifGetUserInfo () {
    var that = this
    Taro.getUserInfo({
      success (res) {
        that.setState({
          userName: res.userInfo.nickName
        })
      }
    })
  }

  // 分享页面
  onShareAppMessage (res) {
    this.ifGetUserInfo()
    let title = '我的时空之旅已经启动，快来看看我在哪里吧~'
    if (this.state.userName) {
      title = this.state.userName + ': ' + title
    }
    const data = {
      shareSource: this.state.imgUrl
    }
    const path = tool.formatQueryUrl('/pages/index', data)
    return {
      title: title,
      path: path,
      imageUrl: this.state.imgUrl,
      success: () => {
        console.log('分享成功')
      },
    }
  }

  // 懒人抠图首页
  pageToHome = () => {
    Taro.navigateTo({
      url: '/pages/home/index'
    })
  }

  // 显示加载模块
  showLoading = () => {
    this.setState({
      loading: true,
      showError: false
    })
  }

  // 隐藏加载模块
  hideLoading = () => {
    this.setState({
      loading: false,
      showError: true
    })
  }

  // 保存照片到本地
  saveTheImage = () => {

    this.showLoading()

    work.saveSourceToPhotosAlbum({
      location: 'remote',
      sourceUrl: this.state.imgUrl,
      sourceType: 'image',
      onSuccess: () => {
        Taro.showToast({
          title: '保存成功!',
          icon: 'success',
          duration: 2000
        })
        this.hideLoading()
      },
      onAuthFail: () => {
        Taro.authModal({
          open: true
        })
        this.hideLoading()
      },
      onFail: () => {
        Taro.showToast({
          title: '保存失败!',
          icon: 'success',
          duration: 2000
        })
        this.hideLoading()
      }
    })
  }



  // 上传Form ID
  handleFormSubmit = (e) => {

    Taro.getSetting({
      success (res) {
        if (res.authSetting['scope.userInfo']) {
          console.log('有授权，上传FormId')
          const { detail: { formId } } = e
          if (formId) {
            console.log('🔥FormId🔥', formId)
            core.reportFormId(formId)
          }
        }
      }
    }).catch((e) => {})
  }

  // 刷新页面
  refreshThePic = () => {
    console.log('🔥刷新页面🔥')
    this.getTheImage()
  }

  // 获取照片
  getTheImage = async () => {
    try {
      this.showLoading()
      var resultImg = await teleport.getResultImage(session.get(), this.sceneId)
      console.log('拉取结果', resultImg)
      this.setState({
        imgUrl: resultImg.result.imageUrl
      })
      // 如果已拉到图片，直接结束loading
      if (resultImg.result.imageUrl) {
        this.hideLoading()
      }
      // 不然的话loading 2.5s 之后再此拉图片
      setTimeout(() => {
        this.getTheImageAgain()
        this.hideLoading()
      }, 2500)

    } catch (err) {
      console.log('Oops, there is an error: ', err)
    }
  }

  // 等待时间结束后再次尝试获取照片
  getTheImageAgain = async () => {
    console.log('再此尝试读取图片')
    try {
      var resultImg = await teleport.getResultImage(session.get(), this.sceneId)
      console.log('再次拉取结果', resultImg)
      this.setState({
        imgUrl: resultImg.result.imageUrl
      })
    } catch (err) {
      console.log('Oops, there is an error: ', err)
    }
  }

  render () {
    const {loading} = this.state
    return (
      <View className='page-editor'>
        <Image className='page-bg' src={bg4TP} mode="scaleToFill" style={{height: this.state.screenHeight + 'px', width: this.state.screenWidth + 'px'}} />
        <Title
          color="#333"
          isScrollToTop
          leftStyleObj={{left: Taro.pxTransform(8)}}
          renderLeft={
            <CustomIcon type="home" theme="dark" onClick={this.pageToHome}/>
          }
        >懒人抠图</Title>

        <Loading visible={loading} />
        <AuthModal />

        <View className="pic-area" style={{height: this.state.screenHeight - this.state.titleHeight - 150 + 'px', marginTop: this.state.titleHeight + 'px', lineHeight: this.state.screenHeight - this.state.titleHeight - 150 + 'px'}}>
          {!this.state.imgUrl && this.state.showError ? <View className="error-outer-block" style={{height: this.state.screenWidth * 0.3 + 'px', width: this.state.screenWidth * 0.3 + 'px'}} hoverClass="error-hover"><Image className="error-block" src={refreshIcon} onClick={this.refreshThePic} mode='widthFix'/></View>
          :<Image className="pic-block" src={this.state.imgUrl} mode='widthFix'/>}
        </View>


        {this.state.imgUrl ? 
          <Form className="btn-wrap" onSubmit={this.handleFormSubmit} reportSubmit>
            <Button className="custom-button pink btn-1" hoverClass="btn-hover" openType="getUserInfo" onClick={this.saveTheImage} formType="submit">保存至相册</Button>
            <Button className="custom-button dark btn-2" hoverClass="btn-hover" openType="share" formType="submit">分享给好友</Button>
          </Form>
          :<View/>}

      </View>
    )
  }
}

export default Teleport as unknown as ComponentClass<PageOwnProps, PageState>
