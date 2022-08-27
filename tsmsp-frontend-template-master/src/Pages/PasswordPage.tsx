import React from 'react'
import {TextInput, View} from 'react-native'
import {StatusBar} from "expo-status-bar";
import create from 'zustand'
import {TokenStore} from "Globals/TokenStore";
import {UserUpdatePasswordMessage} from "Messages/UserUpdatePasswordMessage";
import {styles} from "Utils/Styles"
import {ButtonTemplate, ButtonToSendMessage} from "../Utils/PageUtils/PageButtonUtil";

const passwordStore= create(() => ({
    password:"",
    confirmed_password:""
}))

export const setPassword= (password:string) => passwordStore.setState({ password })
export const setConfirmedPassword= (confirmed_password:string) => passwordStore.setState({ confirmed_password })

export function PasswordPage({ navigation }: any){
    const {token} = TokenStore()
    const {password, confirmed_password}=passwordStore()
    return <View style={styles.container}>
        <TextInput style={styles.text} placeholder={"密码"}  value={password} onChangeText={(newText)=>setPassword(newText)} secureTextEntry={true}/>
        <TextInput style={styles.text} placeholder={"确认密码"}  value={confirmed_password} onChangeText={(newText)=>setConfirmedPassword(newText)} secureTextEntry={true}/>
        <ButtonToSendMessage
            checkBeforeSendMessage = {()=>(password.localeCompare(confirmed_password)==0)}
            checkElse = {()=>{
                alert("两次输入密码不一致！请重新输入！")
                setConfirmedPassword("")
            }}
            toSendMessage ={new UserUpdatePasswordMessage(token, password)}
            ifSuccess = {(replyJson: any)=> {
                alert("用户" + replyJson.message + "的密码已修改");
                setPassword("")
                setConfirmedPassword("")
                navigation.navigate('Trace');
            }}
            text = '提交修改'
        />
        <ButtonTemplate
            onPress = {() => navigation.navigate('Trace')}
            text = '返回主页'
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