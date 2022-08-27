import React from 'react'
import {FlatList, Text, TextInput, View} from 'react-native'
import {StatusBar} from "expo-status-bar";
import create from 'zustand'
import {clearUserToken, TokenStore} from "Globals/TokenStore";
import {UserUpdateTraceMessage} from "Messages/UserUpdateTraceMessage";
import {UserGetTraceMessage} from "Messages/UserGetTraceMessage";
import {styles} from "Utils/Styles";
import {ButtonTemplate, ButtonToSendMessage} from "../Utils/PageUtils/PageButtonUtil";

const registerStore= create(() => ({
    newTrace: "",
    newTraceId: "",
    traceHistory:[["暂无踪迹"]]
}))

export const setNewTrace= (newTrace:string) => registerStore.setState({ newTrace })
export const setNewTraceId= (newTraceId:string) => registerStore.setState({ newTraceId })
export const setTraceHistory = (traceHistory:string[][]) => registerStore.setState({traceHistory})

export function TracePage({ navigation }: any){
    const report_type : string = "Self uploaded"
    const {token} = TokenStore()
    const {newTrace, newTraceId, traceHistory}=registerStore()
    return <View style={styles.container}>

        <Text style={styles.text} > 欢迎来到主界面(*￣︶￣)</Text>
        <TextInput style={styles.text} placeholder={"访问地点代码"} value={newTraceId} onChangeText={(newText)=>setNewTraceId(newText)}/>
        <TextInput style={styles.text} placeholder={"新轨迹地点名称"} value={newTrace} onChangeText={(newText)=>setNewTrace(newText)}/>

        <ButtonToSendMessage
            icon = 'upload'
            toSendMessage = {new UserUpdateTraceMessage(token, +newTraceId, newTrace, report_type)}
            text = '上传新轨迹'
        />
        <ButtonToSendMessage
            toSendMessage = {new UserGetTraceMessage(
                token,
                (new Date().getTime() - 86400000),
                new Date().getTime())}
            ifSuccess = {(replyJson:any)=> {
                let TraceList: string[][] = JSON.parse(replyJson.message) as string[][];
                setTraceHistory(TraceList)
            }}
            text = '获取我的历史轨迹'
        />
        <ButtonTemplate onPress={() => navigation.navigate('DeleteTrace')}
            text ='删除记录'/>

        <ButtonTemplate onPress={() => {
            navigation.navigate('Root');
            clearUserToken();
        }}
            text ='退出登录'/>

        <ButtonTemplate onPress={() => navigation.navigate('DeleteAccount')}
            text ='注销账户'/>

        <ButtonTemplate onPress={() => navigation.navigate('Password')}
            text ='修改密码'/>

        <FlatList
            data={traceHistory}
            renderItem={({item, index}) =>
                item[0] === "暂无踪迹" ?
                <Text>暂无踪迹或尚未查询</Text> :
                    <Text>{index}. {item[2]}到访{item[0]}内{item[1]}</Text>
        } keyExtractor={(item : any, index : number) => index.toString()}/>

        <StatusBar style="auto" />
    </View>
}