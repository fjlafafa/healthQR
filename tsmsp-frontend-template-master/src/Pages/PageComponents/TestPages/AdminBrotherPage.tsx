import {StatusBar} from 'expo-status-bar'
import React, {useEffect, useState} from 'react'
import {setUserToken, TokenStore} from '../../../Globals/TokenStore'
import {ButtonTemplate, ButtonToSendMessage} from '../../../Utils/PageUtils/ButtonUtil'
import {ScreenTemplate, ScrollTemplate} from '../../../Utils/PageUtils/PageContainerUtil'
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