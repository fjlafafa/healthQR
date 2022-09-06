import {ButtonTemplate, ButtonToSendMessage} from "Utils/PageUtils/ButtonUtil";
import {ScreenTemplate} from 'Utils/PageUtils/PageContainerUtil'
import React from "react";
import {TextInputTemplate} from "Utils/PageUtils/TextInputUtil";
import create from "zustand";
import {
    HospitalUpdateNucleicTestMessage
} from "Messages/ThirdPartyMessages/HospitalUpdateNucleicTestMessage";
import {
    HospitalUpdateVaccinationMessage
} from "Messages/ThirdPartyMessages/HospitalUpdateVaccinationMessage";
import {UserRiskLevel} from "Types/UserMeta/UserRiskLevel";
import {
    HospitalUploadPositiveNucleicTestResultMessage
} from "Messages/ThirdPartyMessages/HospitalUploadPositiveNucleicTestResultMessage";
import {TokenStore} from "Globals/TokenStore";
import {Token} from "Types/UserMeta/Token";
import {IdentityNumber} from "Types/UserMeta/IdentityNumber";

const patientInfoStore = create(() => ({
    identityNumber: "",
    riskLevel: ""
}))
const setIdentityNumber = (identityNumber: string) => patientInfoStore.setState({identityNumber})
const setRiskLevel = (riskLevel: string) => patientInfoStore.setState({riskLevel})

export function ModifyVaccinePage({navigation}: any) {
    const {token} = TokenStore()
    const {identityNumber, riskLevel} = patientInfoStore()

    const goBack = () => navigation.navigate('User.Vaccine')
    return <ScreenTemplate goBack={goBack}>

        <TextInputTemplate placeholder={'检测人身份证号'} value={identityNumber}
                           onChangeText={(newText: string) => setIdentityNumber(newText)}/>

        <ButtonToSendMessage
            // checkBeforeSendMessage = {()=>(checkIdentityNumber(identityNumber))}
            checkElse={() => {
                alert('身份证号不正确！')
            }}
            icon='update'
            toSendMessage={new HospitalUpdateNucleicTestMessage(token, new IdentityNumber(identityNumber))}
            text='刷新核酸日期'
        />

        <ButtonToSendMessage
            // checkBeforeSendMessage = {()=>(checkIdentityNumber(identityNumber))}
            checkElse={() => {
                alert('身份证号不正确！')
            }}
            icon='update'
            toSendMessage={new HospitalUpdateVaccinationMessage(token, new IdentityNumber(identityNumber))}
            text='刷新疫苗接种情况'
        />

        <TextInputTemplate placeholder={'新风险等级'} value={riskLevel}
                           onChangeText={(newText: string) => setRiskLevel(newText)}/>

        <ButtonToSendMessage
            checkBeforeSendMessage={() => (Object.values(UserRiskLevel).includes(riskLevel as UserRiskLevel))}
            checkElse={() => {
                alert('风险等级错误')
            }}
            icon='update'
            toSendMessage={new HospitalUploadPositiveNucleicTestResultMessage(token, new IdentityNumber(identityNumber))}
            text='更新风险等级'
        />

    </ScreenTemplate>
}