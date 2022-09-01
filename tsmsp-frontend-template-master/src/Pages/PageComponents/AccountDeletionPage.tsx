import React from 'react'
import {StatusBar} from 'expo-status-bar'
import {clearUserToken, TokenStore} from 'Globals/TokenStore'
import {UserDeleteAccountMessage} from '../../Impl/Messages/UserMessages/UserDeleteAccountMessage'
import {ButtonTemplate, ButtonToSendMessage} from 'Utils/PageUtils/ButtonUtil'
import {TSMSPReply} from '../../Impl/TSMSPReply'
import {ScreenTemplate} from 'Utils/PageUtils/PageContainerUtil'

export function AccountDeletionPage({ navigation }: any){
    const {token} = TokenStore()
    return <ScreenTemplate>
        <ButtonToSendMessage
            toSendMessage = {new UserDeleteAccountMessage(token)}
            ifSuccess = {(reply:string)=>{
                alert('用户\'' + reply + '\'注销成功！')
                navigation.navigate('Login',{})
                clearUserToken()
            }}
            text = '确认注销'/>
        <ButtonTemplate
            onPress={() => navigation.navigate('Overview',{})}
            text = '返回主界面'/>

        <StatusBar style='auto' />
    </ScreenTemplate>
}