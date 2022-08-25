import React from 'react'
import {Pressable, ImageBackground,StyleSheet, Text, TextInput, View, Button} from 'react-native'
import {StatusBar} from "expo-status-bar";
import create from 'zustand'
import {setUserToken} from "Globals/TokenStore";
import {UserLoginMessage} from "Messages/UserLoginMessage";
import {APIUrl} from "Globals/GlobalVariables";
import QRCode from "react-native-qrcode-svg";
const image = { uri: "https://zh-hans.reactjs.org/logo-og.png" };

import LoginIcon from '@mui/icons-material/Login';
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },

    backgroundImage:{
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },

    text:{
        fontSize: 30,
        fontFamily: "Arial"
    }


});

const loginStore= create(() => ({
    userName:"",
    password:""
}))

export const setUserName= (userName:string) => loginStore.setState({ userName })
export const setPassword= (password:string) => loginStore.setState({ password })

export function LoginPage({ navigation }: any){
    const {userName,password}=loginStore()
    return <View style={styles.container}>
        <ImageBackground source={image} style={styles.backgroundImage}>
        </ImageBackground>

            <TextInput style={styles.text} placeholder={"用户名"} value={userName} onChangeText={(newText)=>{setUserName(newText)}}/>
            <TextInput style={styles.text} placeholder={"密码"}  value={password} onChangeText={(newText)=>setPassword(newText)} secureTextEntry={true}/>
            <table>
                <tr>
                    <th><Button
                        title = '登录'
                        onPress={() => {
                            console.log("试图使用用户名"+userName+",密码"+password + "登录！")
                            fetch(APIUrl, {
                                method: "POST",
                                headers: {"Content-Type":"text/plain"},
                                body: JSON.stringify(new UserLoginMessage(userName, password))
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
                        }}>
                    </Button>
                    </th>

                    <th><LoginIcon fontSize="large" > </LoginIcon></th>
                </tr>
            </table>

            <table>
                <tr>
                    <Button title="切换至注册界面" onPress = {() => navigation.navigate('Register')}>
                    </Button>
                </tr>
                <tr>
                    <Button title='切换至扫码示例界面'onPress={() => navigation.navigate('ScanQRCode')}>
                    </Button>
                </tr>
                <tr>
                    <Button title='切换至二维码示例界面' onPress={() => navigation.navigate('QRCode')}>
                    </Button>
                </tr>

            </table>

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