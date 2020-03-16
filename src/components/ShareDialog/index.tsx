import Taro, { Component } from "@tarojs/taro";
import { View ,Button} from "@tarojs/components";
import './index.less'
type ComponentStateProps = {}
type ComponentOwnProps = {
    content ?: string,
    confirmText ?: string,
    cancelText ?: string,
    isshow ?: boolean,
    renderButton?: any,
    saveTitle ?: string
}
type IProps = ComponentStateProps & ComponentOwnProps

interface ShareDialog {
    props: IProps;
  }
class ShareDialog extends Component {
    static defaultProps = {
        content : '',
        confirmText: '',
        cancelText: '',
        isshow:false,
        saveTitle:'图片已保存到手机相册'
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
    handelConfirm(){

    }
    render() {
        return (
            <View className="wx_dialog_container">           
                <View className="wx-mask"></View>
                <View className="wx-dialog">
                    <View className="wx-dialog-save">{this.props.saveTitle}</View>
                    <View className="wx-dialog-content">{this.props.content}</View>
                    {this.props.renderButton}
                </View>
            </View>
        );
    }
}

export default ShareDialog;
