import React from 'react'
import {Button} from 'react-native-paper'
import {APIUrl} from 'Globals/GlobalVariables'
import {Text, View} from 'react-native'
import {INNER_WIDTH, settingsAndConstants} from '../SettingsAndConstants'
import {TSMSPReply} from '../../Impl/TSMSPReply'
import {TextTemplate} from './TextUtil'
import {SendData} from 'Utils/SendDataUtil'
import {TSMSPMessage} from "../../Impl/Messages/TSMSPMessage";

const setting = {
    button:
        {
            width: INNER_WIDTH,
            height: 40
        },
    text:
        {
            //由于显示问题，暂时禁止使用大字体
            fontSize: 15,
            fontFamily: 'Arial'
        },
    view:{
        height: 60,
        justifyContent:'center',
        alignItems:'center',
    }
}
export class ButtonTemplate extends React.Component<any> {
    static defaultProps = {
        icon: null,
        onPress: ()=>{},//Usually we can use ifSuccess as inPress even if we are not sending message
        mode: 'elevated',
        text: null,
        children: null,
    }

    render() {
        //@ts-ignore
        return (<View style={setting.view}>
            <Button style={setting.button}
            icon={this.props.icon}
            mode={this.props.mode}
            onPress={() => this.props.onPress()}>
            <Text style={setting.text}>{this.props.text}</Text>
            {this.props.children}
        </Button></View>)
    }
}
/**参数说明：
 *
 * ifSuccess, ifFail接受含一个参数（回复message）的函数，实际用不到的话写_:any就行
 *
 * onPress可以在其他命令执行前运行，一般用不到，按钮不发送消息时可以用ifSuccess达到相同效果，为了统一避免使用
 *
 * children是react默认传递的参数，无需赋值使用
 *
 * 鲁棒性可能不足，如果页面卡住可以考虑下是这里什么参数名字或类型错误*/
export class ButtonToSendMessage extends React.Component<any> {
    static defaultProps = {
        checkBeforeSendMessage: ()=>{return true},
        checkElse: ()=>{},
        toSendMessage: null,
        onPress: ()=>{},//Usually we can use ifSuccess as inPress even if we are not sending message
    }

    render() {
        return <ButtonTemplate
            icon={this.props.icon}
            text={this.props.text}
            onPress={() => {
                this.props.onPress()
                if(this.props.checkBeforeSendMessage()) {
                    if (this.props.toSendMessage === null) {
                        this.props.ifSuccess({message: null})
                    } else {
                        SendData(
                            this.props.toSendMessage,
                            this.props.ifSuccess,
                            this.props.ifFail)
                    }
                } else {
                    this.props.checkElse()
                }
            }}>
            {this.props.children}
        </ButtonTemplate>
    }
}