import React from 'react'
import {StatusBar} from 'expo-status-bar'
import create from 'zustand'
import {TokenStore} from '../../../../Globals/TokenStore'
import {UserUpdatePasswordMessage} from '../../../../Impl/Messages/UserMessages/UserUpdatePasswordMessage'
import {ButtonTemplate, ButtonToSendMessage} from '../../../../Utils/PageUtils/ButtonUtil'
import {TSMSPReply} from '../../../../Impl/TSMSPReply'
import {TextInputTemplate} from '../../../../Utils/PageUtils/TextInputUtil'
import {ScreenTemplate} from "../../../../Utils/PageUtils/PageContainerUtil";

const passwordStore= create(() => ({
    password:'',
    confirmed_password:''
}))

export const setPassword= (password:string) => passwordStore.setState({ password })
export const setConfirmedPassword= (confirmed_password:string) => passwordStore.setState({ confirmed_password })
export const clearConfirmedPassword= ()=> passwordStore.setState(({confirmed_password: ''}))
export const clearInfo= ()=> passwordStore.setState(({password: '', confirmed_password: ''}))

export function PasswordPage({ navigation }: any){
    const {token} = TokenStore()
    const {password, confirmed_password}=passwordStore()
    return <ScreenTemplate>
        <TextInputTemplate placeholder={'密码'}  value={password} onChangeText={(newText:string)=>setPassword(newText)} secureTextEntry={true}/>
        <TextInputTemplate placeholder={'确认密码'}  value={confirmed_password} onChangeText={(newText:string)=>setConfirmedPassword(newText)} secureTextEntry={true}/>
        <ButtonToSendMessage
            checkBeforeSendMessage = {()=>(password.localeCompare(confirmed_password)==0)}
            checkElse = {()=>{
                alert('两次输入密码不一致！请重新输入！')
                clearConfirmedPassword()
            }}
            toSendMessage ={new UserUpdatePasswordMessage(token, password)}
            ifSuccess = {(reply:string)=> {
                alert('用户' + reply + '的密码已修改')
                clearInfo()
                navigation.navigate('Overview',{})
            }}
            text = '提交修改'
        />
        <ButtonTemplate
            onPress = {() => {
                clearInfo()
                navigation.navigate('Overview',{})
            }}
            text = '返回主页'
        />
        <StatusBar style='auto' />
    </ScreenTemplate>
}