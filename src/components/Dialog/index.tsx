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
}
type IProps = ComponentStateProps & ComponentOwnProps

interface Dialog {
    props: IProps;
  }
class Dialog extends Component {
    static defaultProps = {
        content : '',
        confirmText: '',
        cancelText: '',
        isshow:false
        
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
        console.log(this.props.isshow)
        
    }
    handelConfirm(){

    }
    render() {
        return (
            <View className="wx_dialog_container">
               
                
                    <View className="wx-mask"></View>
                    <View className="wx-dialog">
                        {/* <Image className="wx-dialog-title" src={titleImg} style="width:20%;height:20%"/> */}
                        <View className="wx-dialog-title" style={{}}></View>
                        <View className="wx-dialog-content">{this.props.content}</View>
                        {this.props.renderButton}
                    </View>
                
                
            </View>
        );
    }
}

export default Dialog;
