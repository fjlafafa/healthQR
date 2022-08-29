import React from 'react'
import {Text} from 'react-native'
import {StatusBar} from "expo-status-bar";
import create from 'zustand'
import {clearUserToken, TokenStore} from "Globals/TokenStore";
import {UserUpdateTraceMessage} from "Impl/Messages/UserUpdateTraceMessage";
import {UserGetTraceMessage} from "Impl/Messages/UserGetTraceMessage";
import {ButtonTemplate, ButtonToSendMessage} from "Utils/PageUtils/PageButtonUtil";
import {TSMSPReply} from "Impl/TSMSPReply";
import {PageContainerTemplate} from "Utils/PageUtils/PageContainerUtil";
import {TextTemplate} from "Utils/PageUtils/TextUtil";
import {TextInputTemplate} from "Utils/PageUtils/TextInputUtil";
import {BoundedTraceList} from "Utils/PageUtils/ListUtil";

const registerStore= create(() => ({
    newTrace: "",
    newTraceId: "",
    traceHistory:[["暂无踪迹"]]
}))

const setNewTrace= (newTrace:string) => registerStore.setState({ newTrace })
const setNewTraceId= (newTraceId:string) => registerStore.setState({ newTraceId })
const setTraceHistory = (traceHistory:string[][]) => registerStore.setState({traceHistory})
const clearTraceInfo= () => registerStore.setState({
    newTrace: "",
    newTraceId: "",
    traceHistory: [["暂无踪迹"]]
})

export function TracePage({ navigation }: any){
    const report_type : string = "Self uploaded"
    const {token} = TokenStore()
    const {newTrace, newTraceId, traceHistory}=registerStore()
    return <PageContainerTemplate>

        <TextTemplate> ^^OvO^^欢迎来到主界面(*￣︶￣)</TextTemplate>
        <TextInputTemplate placeholder={"访问地点代码"} value={newTraceId} onChangeText={(newText: string)=>setNewTraceId(newText)}/>
        <TextInputTemplate placeholder={"新轨迹地点名称"} value={newTrace} onChangeText={(newText: string)=>setNewTrace(newText)}/>

        <ButtonTemplate
            onPress={() => {
                navigation.navigate('QRCode');
                clearTraceInfo();
            }}
            text ='我的健康码'
        />
        <ButtonTemplate
            onPress = {()=> {
                navigation.navigate('ScanQRCode')
                clearTraceInfo();
            }}
            text = '地点扫码'
        />

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
            ifSuccess = {(replyJson:TSMSPReply)=> {
                let TraceList: string[][] = JSON.parse(replyJson.message) as string[][];
                setTraceHistory(TraceList)
            }}
            text = '获取我的历史轨迹'
        />
        <ButtonTemplate onPress={() => {
            navigation.navigate('DeleteTrace');
            clearTraceInfo();
        }}
            text ='删除记录'/>

        <ButtonTemplate onPress={() => {
            navigation.navigate('Root');
            clearTraceInfo();
            clearUserToken();
        }}
            text ='退出登录'/>

        <ButtonTemplate onPress={() => {
            navigation.navigate('DeleteAccount')
            clearTraceInfo();
        }}
            text ='注销账户'/>

        <ButtonTemplate onPress={() => {
            navigation.navigate('Password');
            clearTraceInfo();
        }}
            text ='修改密码'/>

        <BoundedTraceList
            data={traceHistory}
            renderItem={({item, index}: any) =>
                item[0] === "暂无踪迹" ?
                <Text>暂无踪迹或尚未查询</Text> :
                    <Text>{index}. {item[2]}到访{item[0]}内{item[1]}</Text>
        } keyExtractor={(item : any, index : number) => index.toString()}/>

        <StatusBar style="auto" />
    </PageContainerTemplate>
}