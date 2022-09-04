import React from 'react'
import {StatusBar} from 'expo-status-bar'
import {clearUserToken, TokenStore} from '../../../../Globals/TokenStore'
import {UserDeleteAccountMessage} from '../../../../Impl/Messages/UserMessages/UserDeleteAccountMessage'
import {ButtonTemplate, ButtonToSendMessage} from '../../../../Utils/PageUtils/ButtonUtil'
import {TSMSPReply} from '../../../../Impl/TSMSPReply'
import {ScreenTemplate} from '../../../../Utils/PageUtils/PageContainerUtil'

export function AccountDeletionPage({ navigation }: any){
    const {token} = TokenStore()
    const goBack=()=>navigation.navigate('User.Account')
    return <ScreenTemplate goBack={goBack}>
        <ButtonToSendMessage
            toSendMessage = {new UserDeleteAccountMessage(token)}
            ifSuccess = {(reply:string)=>{
                alert('用户注销成功！')
                navigation.navigate('Login')
                clearUserToken()
            }}
            text = '确认注销'/>

        <StatusBar style='auto' />
    </ScreenTemplate>
}