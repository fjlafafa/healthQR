import React from 'react'
import {Pressable, Text, TextInput, View} from 'react-native'
import {StatusBar} from "expo-status-bar";
import create from 'zustand'
import {setUserToken} from "Globals/TokenStore";
import {UserRegisterMessage} from "Messages/UserRegisterMessage";
import {APIUrl} from "Globals/GlobalVariables";
import {styles} from "../Utils/Styles";

const registerStore= create(() => ({
    userName:"",
    password:"",
    realName:"",
}))

export const setUserName= (userName:string) => registerStore.setState({ userName })
export const setPassword= (password:string) => registerStore.setState({ password })
export const setRealName= (realName:string) => registerStore.setState({ realName })

export function RegisterPage({ navigation }: any){
    const {userName,password, realName}=registerStore()
    return <View style={styles.container}>
        <TextInput style={styles.text} placeholder={"用户名"} value={userName} onChangeText={(newText)=>setUserName(newText)}/>
        <TextInput style={styles.text} placeholder={"密码"}  value={password} onChangeText={(newText)=>setPassword(newText)} secureTextEntry={true}/>
        <TextInput style={styles.text} placeholder={"真实姓名"}  value={realName} onChangeText={(newText)=>setRealName(newText)}/>
        <Pressable
            onPress={() => {
                console.log("试图使用用户名"+userName+",密码"+password + ",真实姓名"+realName + "登录！")
                fetch(APIUrl, {
                    method: "POST",
                    headers: {"Content-Type":"text/plain"},
                    body: JSON.stringify(new UserRegisterMessage(userName, password, realName))
                }).then((response) => response.json()).then((replyJson) => {
                    console.log(replyJson)
                    if (replyJson.status === 0) {
                        setUserToken(replyJson.message)
                        navigation.navigate('Trace')
                    }
                    else {
                        alert(replyJson.message)
                    }
                })
                    .catch((e) => console.log(e))
            }}
            style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
            })}>
            <Text style={styles.text}> 注册 </Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Root')}>
            <Text style={styles.text}>切换至登录界面</Text>
        </Pressable>
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