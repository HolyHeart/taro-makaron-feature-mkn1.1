import Taro, { Component } from "@tarojs/taro";
import { View ,Button, Image} from "@tarojs/components";
import work from '@/utils/work'
import AuthModal from '@/components/AuthModal'
import userImage from '@/assets/images/logo@2x.png'
import image_code from '@/assets/images/code.png'
import './index.less'
type ComponentStateProps = {}
type ComponentOwnProps = {
    content ?: string,
    confirmText ?: string,
    cancelText ?: string,
    isshow ?: boolean,
    renderButton?: any,
    saveTitle ?: string,
    savePoint ?: boolean
    type ?: string
}
type IProps = ComponentStateProps & ComponentOwnProps

interface ShareDialog {
    props: IProps;
  }
class ShareDialog extends Component {
    state = {
      savePoint: false,
      type: 'image'
    }
    static defaultProps = {
      content : '',
      confirmText: '',
      cancelText: '',
      isshow:false,
      saveTitle:'图片已保存到手机相册',
      savePoint: false,
      type: 'image'
    }
    showDia(){
      this.setState({
        isshow: true
      })
    }
    hideDia(){
      this.setState({
        isshow: false
      })
    }
    handelCancel(){
      this.props.isshow = false                                                                                                                 
    }

    setResultModalStatus = (flag = false) => {
      const { result } = this.state
      result.show = flag
      this.setState({
        result: {
          ...result
        }
      })
    }

    handelConfirm(){
      // 保存图片到相册
      if (this.state.type === this.props.type) {
        work.saveSourceToPhotosAlbum({
          location: 'local',
          sourceUrl: this.props.content,
          sourceType: 'image',
          onSuccess: () => {
            Taro.showToast({
              title: '保存成功!',
              icon: 'success',
              duration: 2000
            })
            this.setState({
              savePoint: true
            })
            this.props.savePoint = true
          },
          onAuthFail: () => {
            Taro.authModal({
              open: true
            })
          },
          onFail: () => {
            Taro.showToast({
              title: '保存失败!',
              icon: 'success',
              duration: 2000
            })
          }
        })
      } else {
        work.saveSourceToPhotosAlbum({
          location: 'remote',
          sourceUrl: this.props.content,
          sourceType: 'video',
          onSuccess: () => {
            Taro.hideLoading()           
            Taro.showToast({
              title: '保存成功!',
              icon: 'success',
              duration: 2000
            })
            this.props.savePoint = true
          },
          onAuthFail: () => {
            Taro.authModal({
              open: true
            })
          },
          onFail: () => {
            Taro.hideLoading()
            Taro.showToast({
              title: '保存失败!',
              icon: 'success',
              duration: 2000
            })
          }
        })
      }
    }
    render() {
        return (
          <View className="wx_dialog_container">           
            <View className="wx-mask"></View>
            <View className="wx-dialog">
              {this.props.savePoint === true ? <View className="wx-dialog-save">{this.props.saveTitle}</View> : <View className="wx-dialog-save"></View>}
                <View className="wx-dialog-content">
                  <View className="bgImage">
                    <Image src={this.props.content} className="bgImage" mode="aspectFill" onClick={this.handelConfirm}/>
                  </View>
                  <View className="userInfo">
                    <Image className="userimage" src={userImage} />
                    <View className="username">
                      <View className="userwork">@叶小明的作品</View>
                      {
                        this.props.type === 'image' ? <View className="seetwo">长按识别二维码查看</View> : <View className="seetwo">长按识别二维码播放视频</View>
                      }
                    </View>
                    <View className="two">
                      <Image className="twoCode" src={image_code} />
                      <View className="logo">Makaron</View>
                    </View>
                  </View>
                <AuthModal />
              </View>
              {this.props.renderButton}
            </View>
          </View>
        );
    }
}

export default ShareDialog;
