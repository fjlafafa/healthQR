import React from 'react'
import Text from 'react-native-paper'
import {StatusBar} from 'expo-status-bar'
import create from 'zustand'
import {setUserToken} from '../../../Globals/TokenStore'
import {UserLoginMessage} from '../../../Impl/Messages/UserMessages/UserLoginMessage'
import {ButtonTemplate, ButtonToSendMessage} from '../../../Utils/PageUtils/ButtonUtil'
import {TextClock} from '../../../Utils/PageUtils/ClockUtil'
import {AllowAdmin} from '../../../Globals/GlobalVariables'
import {TSMSPReply} from '../../../Impl/TSMSPReply'
import {TextInputTemplate} from '../../../Utils/PageUtils/TextInputUtil'
import {ScreenTemplate} from '../../../Utils/PageUtils/PageContainerUtil'

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
    return (<ScreenTemplate atRoot={true}>
        <TextInputTemplate label='真实姓名' value={userName} onChangeText={(newText: string)=>setUserName(newText)}/>
        <TextInputTemplate label='密码'  value={password} onChangeText={(newText: string)=>setPassword(newText)} secureTextEntry={true}/>
        <ButtonToSendMessage
            icon = 'login'
            toSendMessage ={new UserLoginMessage(userName, password)}
            ifSuccess = {(reply:string)=>{
                setUserToken(reply)
                navigation.navigate('User.Overview',{})
                clearLoginInfo()
            }}
            text = '登录'
        />
        {/*<LoginIcon fontSize='large' > </LoginIcon>*/}
        <ButtonTemplate
            onPress = {()=> {
                navigation.navigate('Register',{})
                clearLoginInfo()
            }}
            text = '注册'
        />

        <ButtonTemplate
            onPress = {()=> {
                navigation.navigate('Admin.GeneratePlaceQR',{})
                clearLoginInfo()
            }}
            text = '生成地点二维码'
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
                text='管理员'
            /> :null
        }

        <StatusBar style='auto' />
    </ScreenTemplate>)
}