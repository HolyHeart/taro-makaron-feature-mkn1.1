import Taro, { Component } from "@tarojs/taro";
import { View ,Button, Image} from "@tarojs/components";
import work from '@/utils/work'
import AuthModal from '@/components/AuthModal'
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
}
type IProps = ComponentStateProps & ComponentOwnProps

interface ShareDialog {
    props: IProps;
  }
class ShareDialog extends Component {
  state = {
    result: {
      show: false,
      shareImage: {
        remoteUrl: '',
        localUrl: '',
      },
    },
  }
    static defaultProps = {
      content : '',
      confirmText: '',
      cancelText: '',
      isshow:false,
      saveTitle:'图片已保存到手机相册',
      savePoint: false
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
        },
        onAuthFail: () => {
          Taro.authModal({
            open: true
          })
          this.setResultModalStatus(false)
        },
        onFail: () => {
          Taro.showToast({
            title: '保存失败!',
            icon: 'success',
            duration: 2000
          })
        }
      })
    }
    render() {
        return (
          <View className="wx_dialog_container">           
            <View className="wx-mask"></View>
            <View className="wx-dialog">
              {this.props.savePoint === true ? <View className="wx-dialog-save">{this.props.saveTitle}</View> : <View className="wx-dialog-save"></View>}
                <View className="wx-dialog-content">
                  {console.log(7,this.props)}
                <Image src={this.props.content} style="width:100%; height:100%;" className="bgImage" mode="aspectFill" onClick={this.handelConfirm}/>
                <AuthModal />
              </View>
              {this.props.renderButton}
            </View>
          </View>
        );
    }
}

export default ShareDialog;
