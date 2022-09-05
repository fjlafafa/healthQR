import React from 'react'
import {StatusBar} from 'expo-status-bar'
import {clearUserToken, TokenStore} from 'Globals/TokenStore'
import {UserDeleteAccountMessage} from 'Messages/UserMessages/UserDeleteAccountMessage'
import {ButtonToSendMessage} from 'Utils/PageUtils/ButtonUtil'
import {ScreenTemplate} from 'Utils/PageUtils/PageContainerUtil'
import {Token} from "Types/UserMeta/Token";

export function AccountDeletionPage({navigation}: any) {
    const {token} = TokenStore()
    const goBack = () => navigation.navigate('User.Account')
    return <ScreenTemplate goBack={goBack}>
        <ButtonToSendMessage
            toSendMessage={new UserDeleteAccountMessage(new Token(token))}
            ifSuccess={(reply: string) => {
                alert('用户注销成功！')
                navigation.navigate('Login')
                clearUserToken()
            }}
            text='确认注销'/>

        <StatusBar style='auto'/>
    </ScreenTemplate>
}