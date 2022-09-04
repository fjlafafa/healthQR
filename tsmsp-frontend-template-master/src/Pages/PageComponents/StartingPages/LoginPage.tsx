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
import {RealName} from "Types/UserMeta/RealName";
import {Password} from "Types/UserMeta/Password";

//const image = { uri: 'https://zh-hans.reactjs.org/logo-og.png' }

// import LoginIcon from '@mui/icons-material/Login'

const loginStore= create(() => ({
    userName:'',
    password:''
}))

const setUserName= (userName:string) => loginStore.setState({ userName })
const setPassword= (password:string) => loginStore.setState({ password })
const clearLoginInfo= ()=> loginStore.setState(({userName: '', password: ''}))

export function LoginPage({ navigation }: any){
    const {userName,password}=loginStore()
    const [permission,setPermission]=useState(Permission.normal)
    return (<ScreenTemplate atRoot={true}>
        <TextInputTemplate label={'Permission'} value={permission.toString()} onChangeText={(newText: string)=>setPermission(newText as Permission)}/>
        <TextInputTemplate label='真实姓名' value={userName} onChangeText={(newText: string)=>setUserName(newText)}/>
        <TextInputTemplate label='密码'  value={password} onChangeText={(newText: string)=>setPassword(newText)} secureTextEntry={true}/>
        <ButtonToSendMessage
            icon = 'login'
            toSendMessage ={new UserLoginMessage(new RealName(userName), new Password(password))}
            ifSuccess = {(reply:string)=>{
                setUserToken(reply)
                if (permission===Permission.normal) {
                    navigation.navigate('User.Overview')
                    clearLoginInfo()
                } else if (permission===Permission.admin) {
                    navigation.navigate('Admin.Overview')
                    clearLoginInfo()
                } else if (permission===Permission.nucleic) {
                    navigation.navigate('ThirdParty.Overview')
                    clearLoginInfo()
            }}}
            text = '登录'
        />
        {/*<LoginIcon fontSize='large' > </LoginIcon>*/}
        <ButtonTemplate
            onPress = {()=> {
                navigation.navigate('Register')
                clearLoginInfo()
            }}
            text = '注册'
        />

        {
            //管理员界面唯一入口
            AllowAdmin?
            <ButtonTemplate
                onPress={
                () => {
                    navigation.navigate('Admin')
                    clearLoginInfo()
                }
            }
                text='测试员入口'
            /> :null
        }

        <StatusBar style='auto' />
    </ScreenTemplate>)
}