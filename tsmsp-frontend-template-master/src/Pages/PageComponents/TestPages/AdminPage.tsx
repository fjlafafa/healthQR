import {StatusBar} from 'expo-status-bar'
import {ScrollView, View} from "react-native";
import React, {useEffect, useState} from 'react'
import {setUserToken, TokenStore} from '../../../Globals/TokenStore'
import {ButtonTemplate, ButtonToSendMessage} from '../../../Utils/PageUtils/ButtonUtil'
import {AdminDropDataBasesMessage} from '../../../Impl/Messages/AdminMessages/AdminDropDataBasesMessage'
import {AdminTestMessage} from '../../../Impl/Messages/AdminMessages/AdminTestMessage'
import {ScreenTemplate, ScrollTemplate} from '../../../Utils/PageUtils/PageContainerUtil'
import {UserRegisterMessage} from '../../../Impl/Messages/UserMessages/UserRegisterMessage'
import {TSMSPReply} from '../../../Impl/TSMSPReply'
import {TextTemplate} from '../../../Utils/PageUtils/TextUtil'
import {myscreen, mywindow} from '../../../Utils/SettingsAndConstants'
import {TextClock} from '../../../Utils/PageUtils/ClockUtil'
import {Place} from "../../../Types/Place";
import {Trace} from "../../../Types/Trace";
import {UserIdentity} from "../../../Types/UserIdentity";
import {UserInformation} from "../../../Types/UserInformation";
import {useFocusEffect} from "@react-navigation/native";
import {Token} from "Types/UserMeta/Token";
import {RealName} from "Types/UserMeta/RealName";
import {IdentityNumber} from "Types/UserMeta/IdentityNumber";
import {Password} from "Types/UserMeta/Password";

//This is just a page for test
var counter = 0
var fresh=false
export function AdminPage({navigation}: any) {
    const {token} = TokenStore()
    counter += 1

    const [nothing,update]=useState(new Date())
    useEffect(()=> {
        alert('set false')
        fresh = false
    },)
    useFocusEffect(React.useCallback(()=> {
        alert('set true')
        fresh = true
        update(new Date())
    }, []))
    return <ScreenTemplate>
        <ScrollTemplate>
            <ButtonTemplate/>
            <ButtonTemplate text={'count: '+counter} onPress={navigation.navigate('Admin')}/>
            {fresh?alert('fresh'):null}

            <ButtonTemplate text={'count: '+counter} onPress={()=>update(new Date())}/>


            <ButtonTemplate
                onPress={() => navigation.navigate('AdminBrother')}
                text='返回副测试'/>
            <View style={{height: 0}}/>
                <TextTemplate>{'screen: '+myscreen.height}</TextTemplate>
                <TextTemplate>{'window: '+mywindow.height}</TextTemplate>
                <TextClock/>
                <TextTemplate>{new Date().toLocaleTimeString()}</TextTemplate>
                <ButtonToSendMessage
                toSendMessage={new AdminDropDataBasesMessage(new Token(token))}
                text='确认清空数据库'/>
                <ButtonToSendMessage
                toSendMessage={new AdminTestMessage(new Token('1'))}
                ifSuccess={(replyMessage:string)=>{alert((JSON.parse(replyMessage) as Place).riskLevel)}}
                text='确认发送测试数据1'/>
                <ButtonToSendMessage
                ifSuccess={(replyMessage:string)=>{alert((JSON.parse(replyMessage) as Trace).time.millis)}}
                toSendMessage={new AdminTestMessage(new Token('2'))}
                //ifSuccess={(replyMessage:string)=>{alert((JSON.parse(replyMessage) as Trace).time.date.toLocaleTimeString())}}
                text='确认发送测试数据2'/>
                <ButtonToSendMessage
                ifSuccess={(replyMessage:string)=>{alert((JSON.parse(replyMessage) as Trace[])[0].visitPlaceId.id)}}
                toSendMessage={new AdminTestMessage(new Token('hcJEaRxNNSWREBDkIQsJhjpnMLsPgy'))}
                //ifSuccess={(replyMessage:string)=>{alert((JSON.parse(replyMessage) as Trace).time.date.toLocaleTimeString())}}
                text='确认发送测试数据token'/>
                <ButtonToSendMessage
                toSendMessage={new AdminTestMessage(new Token('3'))}
                ifSuccess={(replyMessage:string)=>{alert((JSON.parse(replyMessage) as UserIdentity).password.token)}}
                text='确认发送测试数据3'/>
                <ButtonToSendMessage
                toSendMessage={new AdminTestMessage(new Token('4'))}
                ifSuccess={(replyMessage:string)=>{alert((JSON.parse(replyMessage) as UserInformation).recentNucleicTestTime.millis)}}
                text='确认发送测试数据4'/>
                <ButtonTemplate
                onPress={() => {
                navigation.navigate('User.ModifyVaccine',{})
            }}
                text = '核酸疫苗服务'/>
                <ButtonToSendMessage
                toSendMessage={new UserRegisterMessage(new RealName(''), new Password(''),new IdentityNumber(''))}
                text='注册空用户'
                ifSuccess={(reply:string) => {
                setUserToken(reply)
                navigation.navigate('User.Overview', {})
            }}/>
            <ButtonTemplate
                onPress={() => navigation.navigate('Login')}
                text='返回登录界面'/>


            <StatusBar style='auto'/>
        </ScrollTemplate>
    </ScreenTemplate>
}