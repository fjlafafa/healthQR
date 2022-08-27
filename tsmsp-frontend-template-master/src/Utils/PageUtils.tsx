import React from 'react'
import {Button} from 'react-native-paper';
import {APIUrl} from "../Globals/GlobalVariables";
import {setUserToken} from "../Globals/TokenStore";
import {Text} from "react-native";
import {styles} from "./Styles";


export class ButtonToSendMessage extends React.Component<any> {
    static defaultProps = {
        checkBeforeSendMessage: ()=>{return true},
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
        return <Button
            icon={this.props.icon}
            mode={this.props.mode}
            onPress={() => {
                this.props.onPress()
                if(this.props.checkBeforeSendMessage()) {
                    if (this.props.message == null) {
                        this.props.ifSuccess(null)
                    } else {
                        fetch(APIUrl, {
                            method: "POST",
                            headers: {"Content-Type": "text/plain"},
                            body: JSON.stringify(this.props.message)
                        }).then((response) => response.json()).then((replyJson) => {
                            console.log(replyJson)
                            if (replyJson.status === 0) {
                                //setUserToken(replyJson.message)
                                this.props.ifSuccess(replyJson)
                            } else {
                                this.props.ifFail(replyJson)
                            }
                        }).catch((e) => console.log(e))
                    }
                }
            }}>
            <Text style={styles.text}>{this.props.text}</Text>
            {this.props.children}
        </Button>
    }
}