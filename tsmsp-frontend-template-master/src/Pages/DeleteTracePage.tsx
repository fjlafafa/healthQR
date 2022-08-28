import React from 'react'
import {FlatList, Text, TextInput, View} from 'react-native'
import {StatusBar} from "expo-status-bar";
import create from 'zustand'
import {TokenStore} from "Globals/TokenStore";
import {UserDeleteTraceMessage} from "Messages/UserDeleteTraceMessage"
import {styles} from "Utils/Styles";
import {ButtonTemplate, ButtonToSendMessage} from "../Utils/PageUtils/PageButtonUtil";

const registerStore= create(() => ({
    RemovedTrace: "",
    traceHistory:[["暂无踪迹/尚未查询"]]
}))

export const setRemovedTrace= (RemovedTrace:string) => registerStore.setState({ RemovedTrace })
export const setTraceHistory = (traceHistory:string[][]) => registerStore.setState({traceHistory})
export const clearInfo= ()=> registerStore.setState(({RemovedTrace: "", traceHistory: [["暂无踪迹/尚未查询"]]}))

export function DeleteTracePage({ navigation }: any){
    const {token} = TokenStore()
    const {RemovedTrace, traceHistory}=registerStore()
    return <View style={styles.container}>
        <TextInput style={styles.text} placeholder={"删除轨迹编号"} value={RemovedTrace} onChangeText={(newText)=>setRemovedTrace(newText)}/>

        <ButtonToSendMessage
            toSendMessage = {new UserDeleteTraceMessage(token, +RemovedTrace)}
            ifSuccess = {(replyJson:any)=>{
                alert("轨迹\"" + replyJson.message + "\"删除成功！")
                setRemovedTrace("")
            }}
            text = '删除记录'
        />

        <ButtonTemplate
            onPress={() => {
                clearInfo()
                navigation.navigate('Trace')
            }}
            text = '返回主界面'/>

        <FlatList
            data={traceHistory}
            renderItem={({item, index}) =>
                item[0] === "暂无踪迹/尚未查询" ?
                    <Text>暂无踪迹或尚未查询</Text> :
                    <Text>{index}. {item[2]}到访{item[0]}内{item[1]}</Text>
            } keyExtractor={(item : any, index : number) => index.toString()}/>

        <StatusBar style="auto" />
    </View>
}