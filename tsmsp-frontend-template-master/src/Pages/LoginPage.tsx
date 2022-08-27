import React from 'react'
import {Pressable, ImageBackground, Text, TextInput, View} from 'react-native'
import {StatusBar} from "expo-status-bar";
import create from 'zustand'
import {setUserToken} from "Globals/TokenStore";
import {UserLoginMessage} from "Messages/UserLoginMessage";
import {APIUrl} from "Globals/GlobalVariables";
import {styles} from "Utils/Styles";
import QRCode from "react-native-qrcode-svg";
import { Button } from 'react-native-paper';
const image = { uri: "https://zh-hans.reactjs.org/logo-og.png" };
import {ButtonToSendMessage} from "Utils/PageUtils";

// import LoginIcon from '@mui/icons-material/Login';

const loginStore= create(() => ({
    userName:"",
    password:""
}))

export const setUserName= (userName:string) => loginStore.setState({ userName })
export const setPassword= (password:string) => loginStore.setState({ password })

export function LoginPage({ navigation }: any){
    const {userName,password}=loginStore()
    return <View style={styles.container}>
        {/*<ImageBackground source={image} style={styles.backgroundImage}></ImageBackground>*/}

        <TextInput style={styles.text} placeholder={"用户名"} value={userName} onChangeText={(newText)=>{setUserName(newText)}}/>
        <TextInput style={styles.text} placeholder={"密码"}  value={password} onChangeText={(newText)=>setPassword(newText)} secureTextEntry={true}/>
        <ButtonToSendMessage
            icon = 'login'
            toSendMessage ={new UserLoginMessage(userName, password)}
            ifSuccess = {(replyJson:any)=>{
                alert('success')
                setUserToken(replyJson.message);
                navigation.navigate('Trace');}}
            text = '登录'
        />
        {/*<LoginIcon fontSize="large" > </LoginIcon>*/}
        <ButtonToSendMessage
            ifSuccess = {(_:any)=>navigation.navigate('Register')}
            text = '注册'
        />
        <ButtonToSendMessage
            ifSuccess = {(_:any)=>navigation.navigate('ScanQRCode')}
            text = '扫码示例'
        />
        <ButtonToSendMessage
            ifSuccess = {(_:any)=>navigation.navigate('QRCode')}
            text = '二维码示例'
        />

        {/*<Pressable*/}
        {/*    onPress={() => navigation.navigate('NotFound')}*/}
        {/*    style={({ pressed }) => ({*/}
        {/*        opacity: pressed ? 0.5 : 1,*/}
        {/*    })}>*/}
        {/*    <Text> 按我跳转 </Text>*/}
        {/*</Pressable>*/}
        <StatusBar style="auto" />
    </View>
}