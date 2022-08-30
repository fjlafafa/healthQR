import {StatusBar} from "expo-status-bar";
import React from "react";
import {setUserToken, TokenStore} from "Globals/TokenStore";
import {ButtonTemplate, ButtonToSendMessage} from "Utils/PageUtils/ButtonUtil";
import {AdminDropDataBasesMessage} from "Impl/Messages/AdminDropDataBasesMessage";
import {AdminTestMessage} from "Impl/Messages/AdminTestMessage";
import {PageContainerTemplate} from "Utils/PageUtils/PageContainerUtil";
import {UserRegisterMessage} from "../../Impl/Messages/UserRegisterMessage";
import {TSMSPReply} from "../../Impl/Replies/TSMSPReply";

export function AdminPage({ navigation }: any){
    const {token} = TokenStore()
    return <PageContainerTemplate>
        <ButtonToSendMessage
            toSendMessage = {new AdminDropDataBasesMessage(token)}
            text = '确认清空数据库'/>
        <ButtonToSendMessage
            toSendMessage = {new AdminTestMessage(token)}
            text = '确认发送测试数据'/>
        <ButtonToSendMessage
            toSendMessage ={new UserRegisterMessage("","","")}
            text = '注册空用户'
            ifSuccess = {(replyJson: TSMSPReply)=>{
                setUserToken(replyJson.message);
                navigation.navigate('Trace',{});}}/>
        <ButtonTemplate
            onPress={() => navigation.navigate('Root')}
            text = '返回登录界面'/>

        <StatusBar style="auto" />
    </PageContainerTemplate>
}