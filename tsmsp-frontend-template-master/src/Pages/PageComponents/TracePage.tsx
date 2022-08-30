import React from 'react'
import {Text} from 'react-native'
import {StatusBar} from 'expo-status-bar'
import create from 'zustand'
import {TokenStore} from 'Globals/TokenStore'
import {UserDeleteTraceMessage} from 'Impl/Messages/UserDeleteTraceMessage'
import {ButtonTemplate, ButtonToSendMessage} from 'Utils/PageUtils/ButtonUtil'
import {TSMSPReply} from 'Impl/Replies/TSMSPReply'
import {PageContainerTemplate} from 'Utils/PageUtils/PageContainerUtil'
import {TextInputTemplate} from 'Utils/PageUtils/TextInputUtil'
import {BoundedTraceList} from 'Utils/PageUtils/ListUtil'

const registerStore= create(() => ({
    RemovedTrace: '',
    traceHistory:[['暂无踪迹/尚未查询']]
}))

const setRemovedTrace= (RemovedTrace:string) => registerStore.setState({ RemovedTrace })
const clearRemovedTraceInfo= ()=> registerStore.setState(({RemovedTrace: '', traceHistory: [['暂无踪迹/尚未查询']]}))

export function TracePage({ navigation }: any){
    const {token} = TokenStore()
    const {RemovedTrace, traceHistory}=registerStore()
    return <PageContainerTemplate>
        <TextInputTemplate placeholder={'删除轨迹编号'} value={RemovedTrace} onChangeText={(newText: string)=>setRemovedTrace(newText)}/>

        <ButtonToSendMessage
            toSendMessage = {new UserDeleteTraceMessage(token, +RemovedTrace)}
            ifSuccess = {(replyJson:TSMSPReply)=>{
                alert('轨迹\'' + replyJson.message + '\'删除成功！')
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
    </PageContainerTemplate>
}