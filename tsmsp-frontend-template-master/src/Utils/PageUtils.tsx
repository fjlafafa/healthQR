import React from 'react'
import {Button} from 'react-native-paper';
import {APIUrl} from "../Globals/GlobalVariables";
import {setUserToken} from "../Globals/TokenStore";
import {Text} from "react-native";
import {styles} from "./Styles";

export class ButtonTemplate extends React.Component<any> {
    static defaultProps = {
        icon: null,
        onPress: ()=>{},//Usually we can use ifSuccess as inPress even if we are not sending message
        mode: 'elevated',
        text: null,
        children: null,
    }

    render() {
        return <Button
            icon={this.props.icon}
            mode={this.props.mode}
            onPress={() => this.props.onPress()}>
            <Text style={styles.text}>{this.props.text}</Text>
            {this.props.children}
        </Button>
    }
}
/**参数说明：
 * ifSuccess, ifFail接受含一个参数（回复message）的函数，实际用不到的话写_:any就行
 * onPress可以在其他命令执行前运行，一般用不到，按钮不发送消息时可以用ifSuccess达到相同效果，为了统一避免使用
 * children是react默认传递的参数，无需赋值使用
 * 鲁棒性可能不足，如果页面卡住可以考虑下是这里什么参数名字或类型错误*/
export class ButtonToSendMessage extends React.Component<any> {
    static defaultProps = {
        checkBeforeSendMessage: ()=>{return true},
        checkElse: ()=>{},
        ifSuccess: (replyJson: any)=>{alert(replyJson.message)},
        ifFail: (replyJson: any)=>{alert(replyJson.message)},
        toSendMessage: null,
        icon: null,
        onPress: ()=>{},//Usually we can use ifSuccess as inPress even if we are not sending message
        mode: 'elevated',
        text: null,
        children: null,
    }

    render() {
        return <ButtonTemplate
            icon={this.props.icon}
            mode={this.props.mode}
            text={this.props.text}
            onPress={() => {
                this.props.onPress()
                if(this.props.checkBeforeSendMessage()) {
                    if (this.props.toSendMessage === null) {
                        this.props.ifSuccess({message: null})
                    } else {
                        fetch(APIUrl, {
                            method: "POST",
                            headers: {"Content-Type": "text/plain"},
                            body: JSON.stringify(this.props.toSendMessage)
                        }).then((response) => response.json()).then((replyJson) => {
                            console.log(replyJson)
                            if (replyJson.status === 0) {
                                this.props.ifSuccess(replyJson)
                            } else {
                                this.props.ifFail(replyJson)
                            }
                        }).catch((e) => console.log(e))
                    }
                } else {
                    this.props.checkElse()
                }
            }}>
            {this.props.children}
        </ButtonTemplate>
    }
}