import {ScreenTemplate} from "Utils/PageUtils/PageContainerUtil";
import {HospitalUpdateNucleicTestMessage} from "Messages/ThirdPartyMessages/HospitalUpdateNucleicTestMessage";
import create from 'zustand'
import {ButtonToSendMessage} from "Utils/PageUtils/ButtonUtil";
import React, {useState} from "react";
import {TextInputTemplate} from "Utils/PageUtils/TextInputUtil";
import {TextTemplate} from "Utils/PageUtils/TextUtil";
import {checkIdentityNumber} from "Utils/FormatUtils/IdentityNumberUtil";
import {TokenStore} from "Globals/TokenStore";
import {RealName} from "Types/UserMeta/RealName";
import {Token} from "Types/UserMeta/Token";
import {IdentityNumber} from "Types/UserMeta/IdentityNumber";
import {View} from "react-native";
import {ScanView} from "Utils/PageUtils/ScanQRCodeUtil";
import {
    HospitalUpdateNucleicTestByTokenMessage
} from 'Impl/Messages/ThirdPartyMessages/HospitalUpdateNucleicTestByTokenMessage'

const IDStore = create(() => ({identity: ' '}))
const setIdentity = (identity: string) => IDStore.setState({identity})
const UploadState = create(() => ({state: '请上传核酸检测信息'}))


export function NucleicAcidPage({navigation}: any) {

    const {identity} = IDStore()
    const {state} = UploadState()
    const {token} = TokenStore.getState()
    const goBack = () => navigation.navigate('ThirdParty.Overview')

    const [tosetStatus, setTosetStatus] = useState(null)//?
    const [client, setClient] = useState({realName: new RealName(''), token: new Token('')})

    return <ScreenTemplate goBack={goBack}>
        <View style={{height: 30}}/>
        <TextTemplate>当前核酸检测目标用户为：{client.realName.name}</TextTemplate>
        <TextTemplate>设置检测结果为：阴性</TextTemplate>
        <ScanView
            handleData={(data: string) => {
                const client = JSON.parse(data) as { realName: RealName, token: Token }
                setClient(client)
            }
            }/>
        {/*?*/}
        <ButtonToSendMessage
            toSendMessage={new HospitalUpdateNucleicTestByTokenMessage(new Token(token), client.token)}
            text={'设置核酸检测结果'}
        />
        <View style={{height: 30}}/>
        {/*<->*/}
        <TextTemplate value={state}/>

        <TextInputTemplate label='受检人身份证号' value={identity}
                           onChangeText={(identity: string) => setIdentity(identity)}/>

        <ButtonToSendMessage
            checkBeforeSendMessage={() => (checkIdentityNumber(identity))}
            checkElse={() => {
                alert('请重新检查身份证号是否填写正确')
            }}
            toSendMessage={new HospitalUpdateNucleicTestMessage(new Token(token), new IdentityNumber(identity))}
            text='上传'
            ifSuccess={() => {
                IDStore.setState({identity: " "})
            }}
        />


    </ScreenTemplate>
}