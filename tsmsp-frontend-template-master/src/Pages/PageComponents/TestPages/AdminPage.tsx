import {StatusBar} from 'expo-status-bar'
import {ScrollView, View} from "react-native";
import React, {useEffect, useState} from 'react'
import {setUserToken, TokenStore} from '../../../Globals/TokenStore'
import {ButtonTemplate, ButtonToSendMessage} from '../../../Utils/PageUtils/ButtonUtil'
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
import {Permission} from "Types/UserMeta/Permission";

//This is just a page for test
export function AdminPage({navigation}: any) {
    return <ScreenTemplate>
        <ScrollTemplate>


            <ButtonTemplate
                onPress={() => navigation.navigate('AdminBrother')}
                text='返回副测试'/>

            <ButtonToSendMessage
                toSendMessage={new UserRegisterMessage('', '', '')}
                text='注册空用户'
                ifSuccess={(reply: string) => {
                    setUserToken(reply)
                    navigation.navigate('User.Overview', {})
                }}/>
            <ButtonTemplate
                onPress={()=>navigation.navigate('User.Overview')}
                text={'免登录进入用户'}
                />
            <ButtonTemplate
                onPress={()=>navigation.navigate('Admin.Overview')}
                text={'免登录进入管理员'}/>
            <ButtonTemplate
                onPress={()=>navigation.navigate('ThirdParty.Overview')}
                text={'免登录进入第三方'}/>
            <ButtonTemplate
                onPress={() => navigation.navigate('Login')}
                text='返回登录界面'/>


            <StatusBar style='auto'/>
        </ScrollTemplate>
    </ScreenTemplate>
}