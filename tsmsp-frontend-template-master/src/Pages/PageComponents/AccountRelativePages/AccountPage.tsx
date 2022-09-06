import {clearUserToken} from "Globals/TokenStore";
import {ScreenTemplate} from "Utils/PageUtils/PageContainerUtil";
import {ButtonTemplate} from "Utils/PageUtils/ButtonUtil";
import {StatusBar} from "expo-status-bar";
import React from "react";
import {clearUserRole} from "Globals/RoleStore";

export function AccountPage({navigation}: any) {
    const goBack = () => navigation.navigate('User.Overview')
    return <ScreenTemplate goBack={goBack}>
        <ButtonTemplate
            icon = 'account-remove'
            onPress={() => {
                navigation.navigate('User.AccountDeletion')
            }}
            text='注销账户'/>
        <ButtonTemplate
            icon = 'account-key'
            onPress={() => {
                navigation.navigate('User.Password')
            }}
            text='修改密码'/>
        <ButtonTemplate
            icon = 'logout'
            onPress={() => {
                navigation.navigate('Login')
                clearUserToken()
                clearUserRole()
            }}
            text='退出登录'/>

        <StatusBar style='auto'/>
    </ScreenTemplate>
}