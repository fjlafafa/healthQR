import React, {useState} from 'react'
import {Text} from 'react-native'
import {StatusBar} from 'expo-status-bar'
import create from 'zustand'
import {TokenStore} from '../../../../Globals/TokenStore'
import {UserDeleteTraceMessage} from '../../../../Impl/Messages/UserMessages/UserDeleteTraceMessage'
import {ButtonTemplate, ButtonToSendMessage} from '../../../../Utils/PageUtils/ButtonUtil'
import {TSMSPReply} from '../../../../Impl/TSMSPReply'
import {ScreenTemplate} from '../../../../Utils/PageUtils/PageContainerUtil'
import {TextInputTemplate} from '../../../../Utils/PageUtils/TextInputUtil'
import {BoundedTraceList} from '../../../../Utils/PageUtils/ListUtil'
import {UserUpdateTraceMessage} from "../../../../Impl/Messages/UserMessages/UserUpdateTraceMessage";
import {checkRealName} from "../../../../Utils/FormatUtils/RealNameUtil";
import {checkPassword} from "../../../../Utils/FormatUtils/PasswordUtil";
import {checkIdentityNumber} from "../../../../Utils/FormatUtils/IdentityNumberUtil";
import {isNumber, checkLength} from "../../../../Utils/FormatUtils/IdentityNumberUtil";
import {Trace} from "../../../../Types/Trace";
import {SendData} from "../../../../Utils/SendDataUtil";
import {UserGetTraceMessage} from "../../../../Impl/Messages/UserMessages/UserGetTraceMessage";
import {ONEDAY} from "../../../../Utils/Constants";
import {useFocusEffect} from "@react-navigation/native";
import {TraceTable} from "../../../../Utils/PageUtils/TraceTableUtil";
//To implement
const registerStore= create(() => ({
    RemovedTrace: '',
    NewTraceId: '',
    NewTrace: ''
}))

const setNewTraceId= (NewTraceId:string) => registerStore.setState({ NewTraceId })
const setNewTrace= (NewTrace:string) => registerStore.setState({ NewTrace })
const setRemovedTrace= (RemovedTrace:string) => registerStore.setState({ RemovedTrace })
const clearRemovedTraceInfo= ()=> registerStore.setState(({RemovedTrace: ''}))

export function ModifyTracePage({ navigation }: any){
    const {token} = TokenStore()
    const report_type = 'Self uploaded'
    const {RemovedTrace, NewTraceId, NewTrace}=registerStore()


    //refreshing
    const [traceHistory, setTraceHistory] = useState(Array<Trace>())
    const refresh = () => {
        SendData(
            new UserGetTraceMessage(token, (new Date().getTime() - ONEDAY), new Date().getTime()),
            (reply: Trace[]) => {
                setTraceHistory(reply)
            })
    }
    useFocusEffect(React.useCallback(refresh, []))

    const goBack=()=>navigation.navigate('User.Trace')
    return <ScreenTemplate goBack={goBack}>

        <TextInputTemplate placeholder={'访问地点代码'} value={NewTraceId} onChangeText={(newText: string)=>setNewTraceId(newText)}/>
        <TextInputTemplate placeholder={'新轨迹地点名称'} value={NewTrace} onChangeText={(newText: string)=>setNewTrace(newText)}/>

        <ButtonToSendMessage
            checkBeforeSendMessage = {()=>(isNumber(NewTraceId) && checkLength(NewTraceId, 9))}
            checkElse = {()=>{
                alert('地点号码不符合要求(长度应为9)！')
            }}
            icon = 'upload'
            toSendMessage = {new UserUpdateTraceMessage(token, NewTraceId, NewTrace, report_type)}
            text = '上传新轨迹'
            ifSuccess={(_:any)=> refresh()}
        />

        <TextInputTemplate placeholder={'删除轨迹编号'} value={RemovedTrace} onChangeText={(newText: string)=>setRemovedTrace(newText)}/>

        <ButtonToSendMessage
            toSendMessage = {new UserDeleteTraceMessage(token, +RemovedTrace)}
            ifSuccess = {(replyMessage:string)=>{
                alert('轨迹\'' + replyMessage + '\'删除成功！')
                setRemovedTrace('')
                refresh()
            }}
            text = '删除记录'
        />

        <ButtonTemplate
            onPress={() => {
                navigation.navigate('User.Overview')
                clearRemovedTraceInfo()
            }}
            text = '返回主界面'/>


        <TraceTable token={token} traceList={traceHistory}/>

        <StatusBar style='auto' />
    </ScreenTemplate>
}