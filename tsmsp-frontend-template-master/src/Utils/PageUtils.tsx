import React from 'react'
import {Button} from 'react-native-paper';
import {APIUrl} from "../Globals/GlobalVariables";
import {setUserToken} from "../Globals/TokenStore";
import {Text} from "react-native";
import {styles} from "./Styles";


export function ButtonToSendMessage({
                                        ifSuccess,
                                        message = null,
                                        icon = null,
                                        mode = 'elevated',
                                        text = null,
                                        children = null}:any) {
    return <Button
        icon = {icon}
        mode = {mode}
        onPress={() => {
            if(message == null) {
                ifSuccess()
            } else {
                fetch(APIUrl, {
                    method: "POST",
                    headers: {"Content-Type": "text/plain"},
                    body: JSON.stringify(message)
                }).then((response) => response.json()).then((replyJson) => {
                    console.log(replyJson)
                    if (replyJson.status === 0) {
                        setUserToken(replyJson.message)
                        ifSuccess()
                    } else {
                        alert(replyJson.message)
                    }
                })
                    .catch((e) => console.log(e))
            }
        }}>
        <Text style={styles.text}>{text}</Text>
        {children}
    </Button>
}