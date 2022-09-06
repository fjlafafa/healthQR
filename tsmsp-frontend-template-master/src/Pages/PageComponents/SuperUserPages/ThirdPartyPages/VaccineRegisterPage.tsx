import {ScreenTemplate} from "Utils/PageUtils/PageContainerUtil";
import {ButtonToSendMessage} from "Utils/PageUtils/ButtonUtil";
import {checkIdentityNumber} from "Utils/FormatUtils/IdentityNumberUtil";
import {Token} from "Types/UserMeta/Token";
import {IdentityNumber} from "Types/UserMeta/IdentityNumber";
import React, {useState} from "react";
import {TextInputTemplate} from "Utils/PageUtils/TextInputUtil";
import create from "zustand";
import {TokenStore} from "Globals/TokenStore";
import {View} from "react-native";
import {TextTemplate} from "Utils/PageUtils/TextUtil";
import {ScanView} from "Utils/PageUtils/ScanQRCodeUtil";
import {VaccinationStatus} from "Types/UserMeta/VaccinationStatus";
import {HospitalUpdateVaccinationMessage} from "Messages/ThirdPartyMessages/HospitalUpdateVaccinationMessage";
import {RealName} from "Types/UserMeta/RealName";
import {
    HospitalUpdateVaccinationByTokenMessage
} from "Messages/ThirdPartyMessages/HospitalUpdateVaccinationByTokenMessage";

const IDStore = create(() => ({identity: ' '}))
const setIdentity = (identity: string) => IDStore.setState({identity})
const UploadState = create(() => ({state: '请上传疫苗接种信息'}))
const VaccineNum = create(() => ({vaccine: ''}))
const TestVaccine = (vaccine: string) => {
    return vaccine === '1' || vaccine === '2' || vaccine === '3'
}

export function VaccineRegisterPage({navigation}: any) {


    const {token} = TokenStore()
    const {state} = UploadState.getState()
    const goBack = () => navigation.navigate('ThirdParty.Overview')
    const {identity} = IDStore()
    const {vaccine} = VaccineNum()

    const [tosetVaccine, setTosetVaccine] = useState(VaccinationStatus.none)
    const [client, setClient] = useState({realName: new RealName(''), token: new Token('')})

    return <ScreenTemplate goBack={goBack}>
        <View style={{height: 30}}/>
        <TextTemplate>当前疫苗注射目标用户为：{client.realName.name}</TextTemplate>
        <TextTemplate>更新疫苗情况</TextTemplate>
        <ScanView
            handleData={(data: string) => {
                const client = JSON.parse(data) as { realName: RealName, token: Token }
                setClient(client)
            }
            }/>
        <ButtonToSendMessage
            icon = 'upload'
            toSendMessage={new HospitalUpdateVaccinationByTokenMessage(new Token(token), client.token)}
            text={'打一针'}/>
        {/**/}

        <TextInputTemplate label='接种人身份证号' value={identity}
                           onChangeText={(identity: string) => IDStore.setState({identity})}/>
        <TextInputTemplate label='接种针数' value={vaccine}
                           onChangeText={(vaccine: string) => VaccineNum.setState({vaccine})}/>

        <ButtonToSendMessage
            icon = 'upload'
            checkBeforeSendMessage={() => (checkIdentityNumber(identity))}
            checkElse={() => {
                alert('请重新检查身份证号是否填写正确')
            }}
            toSendMessage={new HospitalUpdateVaccinationMessage(new Token(token), new IdentityNumber(identity))}
            text='上传'
        />


    </ScreenTemplate>
}