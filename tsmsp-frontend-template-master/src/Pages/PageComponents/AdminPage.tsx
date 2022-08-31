import {StatusBar} from 'expo-status-bar'
import {ScrollView, View} from "react-native";
import React from 'react'
import {setUserToken, TokenStore} from 'Globals/TokenStore'
import {ButtonTemplate, ButtonToSendMessage} from 'Utils/PageUtils/ButtonUtil'
import {AdminDropDataBasesMessage} from 'Impl/Messages/AdminDropDataBasesMessage'
import {AdminTestMessage} from 'Impl/Messages/AdminTestMessage'
import {ScreenTemplate, ScrollTemplate} from 'Utils/PageUtils/PageContainerUtil'
import {UserRegisterMessage} from '../../Impl/Messages/UserRegisterMessage'
import {TSMSPReply} from '../../Impl/Replies/TSMSPReply'
import {TextTemplate} from '../../Utils/PageUtils/TextUtil'
import {myscreen, mywindow} from '../../Utils/Styles'
import {TextClock} from '../../Utils/PageUtils/ClockUtil'
import {PagesID} from "../PagesID";
import {AdminTestReply} from "../../Impl/Replies/AdminTestReply";
import {Place} from "../../Types/Place";

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
                toSendMessage={new AdminTestMessage(token)}
                ifSuccess={(replymessage: Place)=>{alert(replymessage.city.name)}}
                text='确认发送测试数据'/>
            <ButtonToSendMessage
                toSendMessage={new UserRegisterMessage('', '', '')}
                text='注册空用户'
                ifSuccess={(replyJson: TSMSPReply) => {
                    setUserToken(replyJson.message)
                    navigation.navigate(PagesID.Overview, {})
                }}/>
            <ButtonTemplate
                onPress={() => navigation.navigate(PagesID.Login)}
                text='返回登录界面'/>

            <StatusBar style='auto'/>
        </ScrollTemplate>
    </ScreenTemplate>
}