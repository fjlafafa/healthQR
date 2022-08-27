import React from 'react'
import {FlatList, Pressable, Text, TextInput, View} from 'react-native'
import {StatusBar} from "expo-status-bar";
import create from 'zustand'
import {TokenStore} from "Globals/TokenStore";
import {UserUpdateTraceMessage} from "Messages/UserUpdateTraceMessage";
import {UserGetTraceMessage} from "Messages/UserGetTraceMessage";
import {APIUrl} from "Globals/GlobalVariables";
import { Button } from 'react-native-paper';
import {styles} from "Utils/Styles";
import {ButtonToSendMessage} from "../Utils/PageUtils";

const registerStore= create(() => ({
    newTrace: "",
    traceHistory:["暂无踪迹"]
}))

export const setNewTrace= (newTrace:string) => registerStore.setState({ newTrace })
export const setTraceHistory = (traceHistory:string[]) => registerStore.setState({traceHistory})

export function TracePage({ navigation }: any){
    const {token} = TokenStore()
    const {newTrace, traceHistory}=registerStore()
    return <View style={styles.container}>

        <Text style={{ fontSize: 30, fontFamily: "Arial" }} >欢迎来到主界面(*￣︶￣)</Text>
        <TextInput style={{ fontSize: 30, fontFamily: "Arial" }} placeholder={"新轨迹地点名称"} value={newTrace} onChangeText={(newText)=>setNewTrace(newText)}/>

        <ButtonToSendMessage
            icon = 'upload'
            toSendMessage = {new UserUpdateTraceMessage(token, newTrace)}
            text = '上传新轨迹'
        />
        <Button
            mode = 'elevated'
            onPress={() => {
                    fetch(APIUrl, {
                        method: "POST",
                        headers: {"Content-Type":"text/plain"},
                        body: JSON.stringify(new UserGetTraceMessage(token, new Date().getTime() - 86400000, new Date().getTime()))
                    }).then((response) => response.json()).then((replyJson) => {
                        console.log(replyJson)
                        if (replyJson.status === 0) {
                            setTraceHistory(JSON.parse(replyJson.message) as string[])
                        }
                        else {
                            alert(replyJson.message)
                        }
                    }).catch((e) => console.log(e))}}>
            <Text style={styles.text}>获取我的历史轨迹</Text>
        </Button>


        <Button onPress={() => navigation.navigate('DeleteTrace')}>
            <Text style={styles.text}>删除记录</Text>
        </Button>

        <Button onPress={() => navigation.navigate('Root')}>
            <Text style={styles.text}>退出登录</Text>
        </Button>

        <Button onPress={() => navigation.navigate('DeleteAccount')}>
            <Text style={styles.text}>注销账户</Text>
        </Button>

        <Button onPress={() => navigation.navigate('Password')}>
            <Text style={styles.text}>修改密码</Text>
        </Button>

        <FlatList data={traceHistory} renderItem={({item}) => <Text>{item}</Text>} keyExtractor={(item : any, index : number) => index.toString()}/>
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