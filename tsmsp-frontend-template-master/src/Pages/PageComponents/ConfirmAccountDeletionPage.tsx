import React from 'react'
import {View} from 'react-native'
import {StatusBar} from "expo-status-bar";
import {clearUserToken, TokenStore} from "../../Globals/TokenStore";
import {UserDeleteAccountMessage} from "../../Impl/Messages/UserDeleteAccountMessage"
import {styles} from "../../Utils/Styles";
import {ButtonTemplate, ButtonToSendMessage} from "../../Utils/PageUtils/PageButtonUtil";
import {TSMSPReply} from "../../Impl/TSMSPReply";

export function DeleteAccountPage({ navigation }: any){
    const {token} = TokenStore()
    return <View style={styles.container}>
        <ButtonToSendMessage
            toSendMessage = {new UserDeleteAccountMessage(token)}
            ifSuccess = {(replyJson:TSMSPReply)=>{
                alert("用户\"" + replyJson.message + "\"注销成功！");
                navigation.navigate('Root');
                clearUserToken();
            }}
            text = '确认注销'/>
        <ButtonTemplate
            onPress={() => navigation.navigate('Trace')}
            text = '返回主界面'/>

        <StatusBar style="auto" />
    </View>
}