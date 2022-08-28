import {TokenStore} from "../../Globals/TokenStore";
import {View} from "react-native";
import {styles} from "../../Utils/Styles";
import {ButtonTemplate, ButtonToSendMessage} from "../../Utils/PageUtils/PageButtonUtil";
import {StatusBar} from "expo-status-bar";
import React from "react";
import {AdminDropDataBasesMessage} from "../../Impl/Messages/AdminDropDataBasesMessage";

export function AdminPage({ navigation }: any){
    const {token} = TokenStore()
    return <View style={styles.container}>
        <ButtonToSendMessage
            toSendMessage = {new AdminDropDataBasesMessage(token)}
            text = '确认清空数据库'/>
        <ButtonTemplate
            onPress={() => navigation.navigate('Root')}
            text = '返回登录界面'/>

        <StatusBar style="auto" />
    </View>
}