import React, {useState} from 'react'
import {StatusBar} from 'expo-status-bar'
import create from 'zustand'
import {setUserToken} from '../../../Globals/TokenStore'
import {UserLoginMessage} from '../../../Impl/Messages/UserMessages/UserLoginMessage'
import {ButtonTemplate, ButtonToSendMessage} from '../../../Utils/PageUtils/ButtonUtil'
import {AllowAdmin} from '../../../Globals/GlobalVariables'
import {TextInputTemplate} from '../../../Utils/PageUtils/TextInputUtil'
import {ScreenTemplate} from '../../../Utils/PageUtils/PageContainerUtil'
import {Permission} from "../../../Types/UserMeta/Permission";
import {SendData} from "Utils/SendDataUtil";
import {UserCheckPermissionMessage} from "Messages/UserMessages/UserCheckPermissionMessage";
import {RealName} from "Types/UserMeta/RealName";
import {Password} from "Types/UserMeta/Password";
import {Token} from "Types/UserMeta/Token";

//const image = { uri: 'https://zh-hans.reactjs.org/logo-og.png' }

// import LoginIcon from '@mui/icons-material/Login'

const loginStore= create(() => ({
    userName:'',
    password:''
}))

const setUserName= (userName:string) => loginStore.setState({ userName })
const setPassword= (password:string) => loginStore.setState({ password })
const clearLoginInfo= ()=> loginStore.setState(({userName: '', password: ''}))

export function LoginPage({navigation}: any) {
    const {userName, password} = loginStore()
    return (<ScreenTemplate atRoot={true}>
        <TextInputTemplate label='真实姓名' value={userName} onChangeText={(newText: string) => setUserName(newText)}/>
        <TextInputTemplate label='密码' value={password} onChangeText={(newText: string) => setPassword(newText)}
                           secureTextEntry={true}/>
        <ButtonToSendMessage
            icon = 'login'
            toSendMessage ={new UserLoginMessage(new RealName(userName), new Password(password))}
            ifSuccess = {(reply:string)=>{
                setUserToken(reply)
                SendData(new UserCheckPermissionMessage(new Token(reply)), (reply: Permission) => {

                    if (reply === Permission.normal) {
                        navigation.navigate('User.Overview')
                    } else if (reply === Permission.admin) {
                        navigation.navigate('Admin.Overview')
                    } else if (reply === Permission.nucleic) {
                        navigation.navigate('ThirdParty.Overview')
                    }
                    clearLoginInfo()
                })
            }}
            text='登录'
        />
        {/*<LoginIcon fontSize='large' > </LoginIcon>*/}
        <ButtonTemplate
            onPress={() => {
                navigation.navigate('Register')
                clearLoginInfo()
            }}
            text='注册'
        />

        {
            //管理员界面唯一入口
            AllowAdmin ?
                <ButtonTemplate
                    onPress={
                        () => {
                            navigation.navigate('Admin')
                            clearLoginInfo()
                        }
                    }
                    text='测试员入口'
                /> : null
        }

        <StatusBar style='auto'/>
    </ScreenTemplate>)
}