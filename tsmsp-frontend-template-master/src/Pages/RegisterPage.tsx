import React from 'react'
import {TextInput, View} from 'react-native'
import {StatusBar} from "expo-status-bar";
import create from 'zustand'
import {setUserToken} from "Globals/TokenStore";
import {UserRegisterMessage} from "Messages/UserRegisterMessage";
import {styles} from "../Utils/Styles";
import {ButtonTemplate, ButtonToSendMessage} from "../Utils/PageUtils/PageButtonUtil";

const registerStore= create(() => ({
    userName:"",
    password:"",
    realName:"",
}))

export const setUserName= (userName:string) => registerStore.setState({ userName })
export const setPassword= (password:string) => registerStore.setState({ password })
export const setRealName= (realName:string) => registerStore.setState({ realName })
export const clearInfo= ()=> registerStore.setState(({userName: "", password: "", realName: ""}))

export function RegisterPage({ navigation }: any){
    const {userName,password, realName}=registerStore()
    return <View style={styles.container}>
        <TextInput style={styles.text} placeholder={"真实姓名"} value={userName} onChangeText={(newText)=>setUserName(newText)}/>
        <TextInput style={styles.text} placeholder={"密码"}  value={password} onChangeText={(newText)=>setPassword(newText)} secureTextEntry={true}/>
        <TextInput style={styles.text} placeholder={"身份证号"}  value={realName} onChangeText={(newText)=>setRealName(newText)}/>

        {/*console.log("试图使用用户名"+userName+",密码"+password + ",真实姓名"+realName + "注册！")*/}
        <ButtonToSendMessage
            toSendMessage ={new UserRegisterMessage(userName, password, realName)}
            text = '注册'
            ifSuccess = {(replyJson: any)=>{
                setUserToken(replyJson.message);
                navigation.navigate("Trace");
                clearInfo();
            }}
        />
        <ButtonTemplate
            onPress = {()=>navigation.navigate("Root")}
            text = '返回登录界面'/>
        <StatusBar style="auto" />
    </View>
}