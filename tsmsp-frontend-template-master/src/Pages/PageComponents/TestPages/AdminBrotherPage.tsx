import {StatusBar} from 'expo-status-bar'
import React, {useState} from 'react'
import {setUserToken, TokenStore} from 'Globals/TokenStore'
import {ButtonTemplate} from 'Utils/PageUtils/ButtonUtil'
import {ScreenTemplate, ScrollTemplate} from 'Utils/PageUtils/PageContainerUtil'
import {TextInputTemplate} from "Utils/PageUtils/TextInputUtil";

export function AdminBrotherPage({navigation}: any) {
    //似乎每次返回navigation根节点，会清空过去的渲染栈
    const {token} = TokenStore()
    const [nothing, update] = useState(0)
    return <ScreenTemplate>
        <ScrollTemplate>
            <ButtonTemplate
                onPress={() => navigation.navigate('Admin')}
                text='返回主测试'/>

            <StatusBar style='auto'/>
        </ScrollTemplate>
    </ScreenTemplate>
}