import {clearUserToken, setUserToken, TokenStore} from "../../../../Globals/TokenStore";
import {} from "../../../../Utils/PageUtils/PageContainerUtil";
import {TextTemplate} from "../../../../Utils/PageUtils/TextUtil";
import {myscreen} from "../../../../Utils/SettingsAndConstants";
import {TextClock} from "../../../../Utils/PageUtils/ClockUtil";
import {ButtonTemplate, ButtonToSendMessage} from "../../../../Utils/PageUtils/ButtonUtil";
import {AdminDropDataBasesMessage} from "Messages/TestMessages/AdminDropDataBasesMessage";
import {AdminTestMessage} from "Messages/TestMessages/AdminTestMessage";
import {UserRegisterMessage} from "../../../../Impl/Messages/UserMessages/UserRegisterMessage";
import {TSMSPReply} from "../../../../Impl/TSMSPReply";
import {StatusBar} from "expo-status-bar";
import React from "react";
import {ScreenTemplate} from '../../../../Utils/PageUtils/PageContainerUtil'

export function AccountPage({navigation}: any) {
    const goBack=()=>navigation.navigate('User.Overview')
    return <ScreenTemplate goBack={goBack}>
        <ButtonTemplate
            onPress={() => {
                navigation.navigate('User.AccountDeletion')
            }}
            text='注销账户'/>
        <ButtonTemplate
            onPress={() => {
                navigation.navigate('User.Password')
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