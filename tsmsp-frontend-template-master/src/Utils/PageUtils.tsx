import React from 'react'
import { Button } from 'react-native-paper';
import {APIUrl} from "../Globals/GlobalVariables";
import {UserLoginMessage} from "../Messages/UserLoginMessage";
import {setUserToken} from "../Globals/TokenStore";
import {Text} from "react-native";
import {styles} from "./Styles";

export class TestPageButton extends React.Component {
    constructor({props}: { props: any }) {
        super(props);
    }
    render() {
        return <Button
            icon = 'login'
            mode = 'elevated'
            onPress={() => {
                    fetch(APIUrl, {
                    method: "POST",
                    headers: {"Content-Type":"text/plain"},
                    body: JSON.stringify(this.props.message)
                }).then((response) => response.json()).then((replyJson) => {
                    console.log(replyJson)
                    if (replyJson.status === 0) {
                        setUserToken(replyJson.message)
                        this.props.navigation.navigate('Trace')
                    }
                    else {
                        alert(replyJson.message)
                    }
                })
                    .catch((e) => console.log(e))
            }}>
            <Text style={styles.text}>登录</Text>
        </Button>
    }
}