import React from 'react'
import {StatusBar} from 'expo-status-bar'
import create from 'zustand'
import {setUserToken} from 'Globals/TokenStore'
import {UserLoginMessage} from 'Messages/UserMessages/UserLoginMessage'
import {ButtonTemplate, ButtonToSendMessage} from 'Utils/PageUtils/ButtonUtil'
import {AllowAdmin} from 'Globals/GlobalVariables'
import {TextInputTemplate} from 'Utils/PageUtils/TextInputUtil'
import {ScreenTemplate} from 'Utils/PageUtils/PageContainerUtil'
import {Roles} from "Types/UserMeta/Roles";
import {SendData} from "Utils/SendDataUtil";
import {UserCheckRoleMessage} from "Messages/UserMessages/UserCheckRoleMessage";
import {RealName} from "Types/UserMeta/RealName";
import {IdentityNumber} from "Types/UserMeta/IdentityNumber";
import {Password} from "Types/UserMeta/Password";
import {Token} from "Types/UserMeta/Token";

//const image = { uri: 'https://zh-hans.reactjs.org/logo-og.png' }

// import LoginIcon from '@mui/icons-material/Login'

const loginStore = create(() => ({
    userName: '',
    password: ''
}))

const setUserName = (userName: string) => loginStore.setState({userName})
const setPassword = (password: string) => loginStore.setState({password})
const clearLoginInfo = () => loginStore.setState(({userName: '', password: ''}))

export function LoginPage({navigation}: any) {
    const {userName, password} = loginStore()
    return (<ScreenTemplate atRoot={true}>
        <TextInputTemplate label='身份证号' value={userName} onChangeText={(newText: string) => setUserName(newText)}/>
        <TextInputTemplate label='密码' value={password} onChangeText={(newText: string) => setPassword(newText)}
                           secureTextEntry={true}/>
        <ButtonToSendMessage
            icon='login'
            toSendMessage={new UserLoginMessage(new IdentityNumber(userName), new Password(password))}
            ifSuccess={(reply: string) => {
                setUserToken(reply)
                SendData(new UserCheckRoleMessage(new Token(reply)), (reply: Roles) => {

                    if (reply === Roles.normal) {
                        navigation.navigate('User.Overview')
                    } else {
                        navigation.navigate('SuperUser.InfoQRCodePage')
                    }
                    clearLoginInfo()
                })
            }}
            text='登录'
        />
        {/*<LoginIcon fontSize='large' > </LoginIcon>*/}
        <ButtonTemplate
            icon = 'account-multiple-plus'
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