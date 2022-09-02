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
import {myscreen, mywindow} from '../../../Utils/Styles'
import {TextClock} from '../../../Utils/PageUtils/ClockUtil'
import {Place} from "../../../Types/Place";
import {Trace} from "../../../Types/Trace";
import {UserIdentity} from "../../../Types/UserIdentity";
import {UserInformation} from "../../../Types/UserInformation";
import {UserToken} from "../../../Types/UserToken";
import {useFocusEffect} from "@react-navigation/native";
import {TextInputTemplate} from "../../../Utils/PageUtils/TextInputUtil";

export function AdminBrotherPage({navigation}: any) {
    //似乎每次返回navigation根节点，会清空过去的渲染栈
    const {token} = TokenStore()
    const [nothing,update]=useState(0)
    return <ScreenTemplate>
        <ScrollTemplate>
            <TextInputTemplate placeholder={'真实姓名'} value={token} onChangeText={(newText: string)=>setUserToken(newText)}/>


            <ButtonTemplate
                onPress={() => navigation.navigate('Admin')}
                text='返回主测试'/>

            <StatusBar style='auto'/>
        </ScrollTemplate>
    </ScreenTemplate>
}