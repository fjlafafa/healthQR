import React from 'react'
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
//To implement
const registerStore= create(() => ({
    RemovedTrace: '',
    traceHistory:[['暂无踪迹/尚未查询']],
    NewTraceId: '',
    NewTrace: ''
}))

const setNewTraceId= (NewTraceId:string) => registerStore.setState({ NewTraceId })
const setNewTrace= (NewTrace:string) => registerStore.setState({ NewTrace })
const setRemovedTrace= (RemovedTrace:string) => registerStore.setState({ RemovedTrace })
const clearRemovedTraceInfo= ()=> registerStore.setState(({RemovedTrace: '', traceHistory: [['暂无踪迹/尚未查询']]}))

export function TracePage({ navigation }: any){
    const {token} = TokenStore()
    const report_type = 'Self uploaded'
    const {RemovedTrace, traceHistory, NewTraceId, NewTrace}=registerStore()
    return <ScreenTemplate>

        <TextInputTemplate placeholder={'访问地点代码'} value={NewTraceId} onChangeText={(newText: string)=>setNewTraceId(newText)}/>
        <TextInputTemplate placeholder={'新轨迹地点名称'} value={NewTrace} onChangeText={(newText: string)=>setNewTrace(newText)}/>

        <ButtonToSendMessage
            checkBeforeSendMessage = {()=>(isNumber(NewTraceId) && checkLength(NewTraceId, 12))}
            checkElse = {()=>{
                alert('地点号码不符合要求(长度应为12)！')
            }}
            icon = 'upload'
            toSendMessage = {new UserUpdateTraceMessage(token, NewTraceId, NewTrace, report_type)}
            text = '上传新轨迹'
        />

        <TextInputTemplate placeholder={'删除轨迹编号'} value={RemovedTrace} onChangeText={(newText: string)=>setRemovedTrace(newText)}/>

        <ButtonToSendMessage
            toSendMessage = {new UserDeleteTraceMessage(token, +RemovedTrace)}
            ifSuccess = {(replyMessage:string)=>{
                alert('轨迹\'' + replyMessage + '\'删除成功！')
                setRemovedTrace('')
            }}
            text = '删除记录'
        />

        <ButtonTemplate
            onPress={() => {
                navigation.navigate('Overview',{})
                clearRemovedTraceInfo()
            }}
            text = '返回主界面'/>

        <BoundedTraceList
            data={traceHistory}
            renderItem={({item, index}:any) =>
                item[0] === '暂无踪迹/尚未查询' ?
                    <Text>暂无踪迹或尚未查询</Text> :
                    <Text>{index}. {item[2]}到访{item[0]}内{item[1]}</Text>
            } keyExtractor={(item : any, index : number) => index.toString()}/>

        <StatusBar style='auto' />
    </ScreenTemplate>
}