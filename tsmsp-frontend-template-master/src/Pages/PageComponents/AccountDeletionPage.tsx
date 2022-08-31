import React from 'react'
import {StatusBar} from 'expo-status-bar'
import {clearUserToken, TokenStore} from 'Globals/TokenStore'
import {UserDeleteAccountMessage} from 'Impl/Messages/UserDeleteAccountMessage'
import {ButtonTemplate, ButtonToSendMessage} from 'Utils/PageUtils/ButtonUtil'
import {TSMSPReply} from 'Impl/Replies/TSMSPReply'
import {ScreenTemplate} from 'Utils/PageUtils/PageContainerUtil'
import {PagesID} from "../PagesStack";

export function AccountDeletionPage({ navigation }: any){
    const {token} = TokenStore()
    return <ScreenTemplate>
        <ButtonToSendMessage
            toSendMessage = {new UserDeleteAccountMessage(token)}
            ifSuccess = {(replyJson:TSMSPReply)=>{
                alert('用户\'' + replyJson.message + '\'注销成功！')
                navigation.navigate('Login',{})
                clearUserToken()
            }}
            text = '确认注销'/>
        <ButtonTemplate
            onPress={() => navigation.navigate(PagesID.Overview,{})}
            text = '返回主界面'/>

        <StatusBar style='auto' />
    </ScreenTemplate>
}