import React from 'react'
import {TextInput, View} from 'react-native'
import {StatusBar} from "expo-status-bar";
import create from 'zustand'
import {setUserToken} from "Globals/TokenStore";
import {UserLoginMessage} from "Messages/UserLoginMessage";
import {styles} from "Utils/Styles";
import QRCode from "react-native-qrcode-svg";
import {ButtonTemplate, ButtonToSendMessage} from "../Utils/PageUtils/PageButtonUtil";
import {TextClock} from "../Utils/PageUtils/PageClockUtil";

const image = { uri: "https://zh-hans.reactjs.org/logo-og.png" };

// import LoginIcon from '@mui/icons-material/Login';

const loginStore= create(() => ({
    userName:"",
    password:""
}))

export const setUserName= (userName:string) => loginStore.setState({ userName })
export const setPassword= (password:string) => loginStore.setState({ password })
export const clearInfo= ()=> loginStore.setState(({userName: "", password: ""}))

export function LoginPage({ navigation }: any){
    const {userName,password}=loginStore()
    return <View style={styles.container}>
        {/*<ImageBackground source={image} style={styles.backgroundImage}></ImageBackground>*/}

        <TextClock/>
        <TextInput style={styles.text} placeholder={"用户名"} value={userName} onChangeText={(newText)=>{setUserName(newText)}}/>
        <TextInput style={styles.text} placeholder={"密码"}  value={password} onChangeText={(newText)=>setPassword(newText)} secureTextEntry={true}/>
        <ButtonToSendMessage
            icon = 'login'
            toSendMessage ={new UserLoginMessage(userName, password)}
            ifSuccess = {(replyJson: any)=>{
                //alert(replyJson.message);
                setUserToken(replyJson.message)
                setUserName("")
                setPassword("")
                //alert("登陆成功！")
                navigation.navigate('Trace');
            }}
            text = '登录'
        />
        {/*<LoginIcon fontSize="large" > </LoginIcon>*/}
        <ButtonTemplate
            onPress = {()=> {
                clearInfo()
                navigation.navigate('Register')
            }}
            text = '注册'
        />
        <ButtonTemplate
            onPress = {()=> {
                clearInfo()
                navigation.navigate('ScanQRCode')
            }}
            text = '扫码示例'
        />
        <ButtonTemplate
            onPress = {()=> {
                clearInfo()
                navigation.navigate('QRCode')
            }}
            text = '二维码示例'
        />
        <ButtonTemplate
            onPress = {()=>navigation.navigate('Admin')}
            text = '管理员'
        />

        <StatusBar style="auto" />
    </View>
}