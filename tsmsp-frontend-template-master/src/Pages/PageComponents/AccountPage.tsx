import {clearUserToken, setUserToken, TokenStore} from "../../Globals/TokenStore";
import {} from "../../Utils/PageUtils/PageContainerUtil";
import {TextTemplate} from "../../Utils/PageUtils/TextUtil";
import {myscreen} from "../../Utils/Styles";
import {TextClock} from "../../Utils/PageUtils/ClockUtil";
import {ButtonTemplate, ButtonToSendMessage} from "../../Utils/PageUtils/ButtonUtil";
import {AdminDropDataBasesMessage} from "../../Impl/Messages/AdminDropDataBasesMessage";
import {AdminTestMessage} from "../../Impl/Messages/AdminTestMessage";
import {UserRegisterMessage} from "../../Impl/Messages/UserRegisterMessage";
import {TSMSPReply} from "../../Impl/Replies/TSMSPReply";
import {StatusBar} from "expo-status-bar";
import React from "react";
import {ScreenTemplate} from 'Utils/PageUtils/PageContainerUtil'

export function AccountPage({navigation}: any) {
    const {token} = TokenStore()
    return <ScreenTemplate>
        <ButtonTemplate
            onPress={() => {
                navigation.navigate('DeleteAccount', {})
            }}
            text='注销账户'/>
        <ButtonTemplate
            onPress={() => {
                navigation.navigate('Password', {})
            }}
            text='修改密码'/>
        <ButtonTemplate
            onPress={() => {
                navigation.navigate('Login')
                clearUserToken()
            }}
            text='退出登录'/>

        <StatusBar style='auto'/>
    </ScreenTemplate>
}