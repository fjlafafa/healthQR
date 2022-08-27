import React from 'react'
import {FlatList, Pressable, Text, TextInput, View} from 'react-native'
import {StatusBar} from "expo-status-bar";
import create from 'zustand'
import {TokenStore} from "Globals/TokenStore";
import {UserDeleteTraceMessage} from "Messages/UserDeleteTraceMessage"
import {APIUrl} from "Globals/GlobalVariables";
import {styles} from "Utils/Styles";
import {ButtonToSendMessage} from "../Utils/PageUtils";

const registerStore= create(() => ({
    newTrace: "",
    traceHistory:["暂无踪迹"]
}))

export const setNewTrace= (newTrace:string) => registerStore.setState({ newTrace })
export const setTraceHistory = (traceHistory:string[]) => registerStore.setState({traceHistory})

export function DeleteTracePage({ navigation }: any){
    const {token} = TokenStore()
    const {newTrace, traceHistory}=registerStore()
    return <View style={styles.container}>
        <TextInput style={styles.text} placeholder={"删除轨迹地点名称"} value={newTrace} onChangeText={(newText)=>setNewTrace(newText)}/>

        <ButtonToSendMessage
            toSendMessage = {new UserDeleteTraceMessage(token, newTrace)}
            ifSuccess = {(replyJson:any)=>alert("轨迹\"" + replyJson.message + "\"删除成功！")}
            text = '删除记录'
        />

        <ButtonToSendMessage
            onPress={() => navigation.navigate('Root')}
            text = '返回登录页'/>

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