import {StatusBar} from 'expo-status-bar'
import {ScrollView, View} from "react-native";
import React from 'react'
import {setUserToken, TokenStore} from 'Globals/TokenStore'
import {ButtonTemplate, ButtonToSendMessage} from 'Utils/PageUtils/ButtonUtil'
import {AdminDropDataBasesMessage} from '../../Impl/Messages/AdminMessages/AdminDropDataBasesMessage'
import {AdminTestMessage} from '../../Impl/Messages/AdminMessages/AdminTestMessage'
import {ScreenTemplate, ScrollTemplate} from 'Utils/PageUtils/PageContainerUtil'
import {UserRegisterMessage} from '../../Impl/Messages/UserMessages/UserRegisterMessage'
import {TSMSPReply} from '../../Impl/TSMSPReply'
import {TextTemplate} from '../../Utils/PageUtils/TextUtil'
import {myscreen, mywindow} from '../../Utils/Styles'
import {TextClock} from '../../Utils/PageUtils/ClockUtil'
import {PagesID} from "../PagesID";
import {Place} from "../../Types/Place";
import {Trace} from "../../Types/Trace";
import {UserIdentity} from "../../Types/UserIdentity";
import {UserInformation} from "../../Types/UserInformation";
import {UserToken} from "../../Types/UserToken";

//This is just a page for test
export function AdminPage({navigation}: any) {
    const {token} = TokenStore()
    return <ScreenTemplate>
        <ScrollTemplate>
            <View style={{height: 0}}/>
            <TextTemplate>{'screen: '+myscreen.height}</TextTemplate>
            <TextTemplate>{'window: '+mywindow.height}</TextTemplate>
            <TextClock/>
            <TextTemplate>{new Date().toLocaleTimeString()}</TextTemplate>
            <ButtonToSendMessage
                toSendMessage={new AdminDropDataBasesMessage(token)}
                text='确认清空数据库'/>
            <ButtonToSendMessage
                toSendMessage={new AdminTestMessage('1')}
                ifSuccess={(replyMessage:string)=>{alert((JSON.parse(replyMessage) as Place).riskLevel)}}
                text='确认发送测试数据1'/>
            <ButtonToSendMessage
                ifSuccess={(replyMessage:string)=>{alert((JSON.parse(replyMessage) as Trace).time.millis)}}
                toSendMessage={new AdminTestMessage('2')}
                //ifSuccess={(replyMessage:string)=>{alert((JSON.parse(replyMessage) as Trace).time.date.toLocaleTimeString())}}
                text='确认发送测试数据2'/>
            <ButtonToSendMessage
                ifSuccess={(replyMessage:string)=>{alert((JSON.parse(replyMessage) as Trace).time.millis)}}
                toSendMessage={new AdminTestMessage('2')}
                //ifSuccess={(replyMessage:string)=>{alert((JSON.parse(replyMessage) as Trace).time.date.toLocaleTimeString())}}
                text='确认发送测试数据2'/>
            <ButtonToSendMessage
                toSendMessage={new AdminTestMessage('3')}
                ifSuccess={(replyMessage:string)=>{alert((JSON.parse(replyMessage) as UserIdentity).password.token)}}
                text='确认发送测试数据3'/>
            <ButtonToSendMessage
                toSendMessage={new AdminTestMessage('4')}
                ifSuccess={(replyMessage:string)=>{alert((JSON.parse(replyMessage) as UserInformation).recentNucleicTestTime.millis)}}
                text='确认发送测试数据4'/>
            <ButtonToSendMessage
                toSendMessage={new AdminTestMessage('5')}
                ifSuccess={(replyMessage:string)=>{alert((JSON.parse(replyMessage) as UserToken).token.token)}}
                text='确认发送测试数据5'/>
            <ButtonTemplate
            onPress={() => {
                navigation.navigate(PagesID.UpdateVaccine,{})
            }}
            text = '核酸疫苗服务'/>
            <ButtonToSendMessage
                toSendMessage={new UserRegisterMessage('', '', '')}
                text='注册空用户'
                ifSuccess={(replyMessage:string) => {
                    setUserToken(replyMessage)
                    navigation.navigate(PagesID.Overview, {})
                }}/>
            <ButtonTemplate
                onPress={() => navigation.navigate(PagesID.Login)}
                text='返回登录界面'/>

            <StatusBar style='auto'/>
        </ScrollTemplate>
    </ScreenTemplate>
}