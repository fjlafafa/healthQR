import React from 'react'
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native'
import {StatusBar} from "expo-status-bar";
import create from 'zustand'
import {TokenStore} from "Globals/TokenStore";
import {UserUpdatePasswordMessage} from "Messages/UserUpdatePasswordMessage";
import {APIUrl} from "Globals/GlobalVariables";
import {styles} from "Pages/LoginPage"

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#ffffff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
// });

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
        <Pressable
            onPress={() => {
                    if (password.localeCompare(confirmed_password) == 0) {
                        // alert("Attempting to modify password")
                        fetch(APIUrl, {
                            method: "POST",
                            headers: {"Content-Type":"text/plain"},
                            body: JSON.stringify(new UserUpdatePasswordMessage(token, password))
                        }).then((response) => response.json()).then((replyJson) => {
                            console.log(replyJson)
                            if (replyJson.status === 0) {
                                alert("用户" + replyJson.message + "的密码已修改")
                                navigation.navigate('Trace')
                            }
                            else {
                                alert(replyJson.message)
                            }
                        }).catch((e) => console.log(e))
                    }
                    else {
                        alert("两次输入密码不一致！请重新输入！")
                    }
            }}
            style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
            })}>
            <Text style={styles.text}> 提交修改 </Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Trace')}>
            <Text style={styles.text}>返回主页</Text>
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