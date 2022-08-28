import React from 'react'
import {TextInput, View} from 'react-native'
import {StatusBar} from "expo-status-bar";
import create from 'zustand'
import {setUserToken} from "../../Globals/TokenStore";
import {UserLoginMessage} from "../../Impl/Messages/UserLoginMessage";
import {styles} from "../../Utils/Styles";
import QRCode from "react-native-qrcode-svg";
import {ButtonTemplate, ButtonToSendMessage} from "../../Utils/PageUtils/PageButtonUtil";
import {TextClock} from "../../Utils/PageUtils/PageClockUtil";
import {AllowAdmin} from "../../Globals/GlobalVariables";
import {TSMSPReply} from "../../Impl/TSMSPReply";

const image = { uri: "https://zh-hans.reactjs.org/logo-og.png" };

// import LoginIcon from '@mui/icons-material/Login';

const loginStore= create(() => ({
    userName:"",
    password:""
}))

const setUserName= (userName:string) => loginStore.setState({ userName })
const setPassword= (password:string) => loginStore.setState({ password })
const clearLoginInfo= ()=> loginStore.setState(({userName: "", password: ""}))

export function LoginPage({ navigation }: any){
    const {userName,password}=loginStore()
    return <View style={styles.container}>
        {/*<ImageBackground source={image} style={styles.backgroundImage}></ImageBackground>*/}

        <TextClock/>
        <TextInput style={styles.text} placeholder={"用户名"} value={userName} onChangeText={(newText)=>setUserName(newText)}/>
        <TextInput style={styles.text} placeholder={"密码"}  value={password} onChangeText={(newText)=>setPassword(newText)} secureTextEntry={true}/>
        <ButtonToSendMessage
            icon = 'login'
            toSendMessage ={new UserLoginMessage(userName, password)}
            ifSuccess = {(replyJson:TSMSPReply)=>{
                setUserToken(replyJson.message)
                navigation.navigate('Trace');
                clearLoginInfo()
            }}
            text = '登录'
        />
        {/*<LoginIcon fontSize="large" > </LoginIcon>*/}
        <ButtonTemplate
            onPress = {()=> {
                navigation.navigate('Register')
                clearLoginInfo()
            }}
            text = '注册'
        />
        <ButtonTemplate
            onPress = {()=> {
                navigation.navigate('ScanQRCode')
                clearLoginInfo()
            }}
            text = '扫码示例'
        />
        <ButtonTemplate
            onPress = {()=> {
                navigation.navigate('QRCode')
                clearLoginInfo()
            }}
            text = '二维码示例'
        />
        {
            //管理员界面唯一入口
            AllowAdmin?
            <ButtonTemplate
                onPress={
                () => {
                    navigation.navigate('Admin');
                    clearLoginInfo();
                }
            }
                text='管理员'
            /> :null
        }

        <StatusBar style="auto" />
    </View>
}