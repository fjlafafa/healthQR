import {clearUserToken, setUserToken, TokenStore} from "../../Globals/TokenStore";
import {} from "../../Utils/PageUtils/PageContainerUtil";
import {TextTemplate} from "../../Utils/PageUtils/TextUtil";
import {myscreen} from "../../Utils/Styles";
import {TextClock} from "../../Utils/PageUtils/ClockUtil";
import {ButtonTemplate, ButtonToSendMessage} from "../../Utils/PageUtils/ButtonUtil";
import {AdminDropDataBasesMessage} from "../../Impl/Messages/AdminMessages/AdminDropDataBasesMessage";
import {AdminTestMessage} from "../../Impl/Messages/AdminMessages/AdminTestMessage";
import {UserRegisterMessage} from "../../Impl/Messages/UserMessages/UserRegisterMessage";
import {TSMSPReply} from "../../Impl/TSMSPReply";
import {StatusBar} from "expo-status-bar";
import React from "react";
import {ScreenTemplate} from 'Utils/PageUtils/PageContainerUtil'
import {PagesID} from "../PagesID";

export function AccountPage({navigation}: any) {
    return <ScreenTemplate>
        <ButtonTemplate
            onPress={() => {
                navigation.navigate(PagesID.DeleteAccount, {})
            }}
            text='注销账户'/>
        <ButtonTemplate
            onPress={() => {
                navigation.navigate(PagesID.Password, {})
            }}
            text='修改密码'/>
        <ButtonTemplate
            onPress={() => {
                navigation.navigate(PagesID.Login)
                clearUserToken()
            }}
            text='退出登录'/>
        <ButtonTemplate
            onPress={() => {
                navigation.navigate(PagesID.Overview)
            }}
            text='返回'/>

        <StatusBar style='auto'/>
    </ScreenTemplate>
}