import {ButtonTemplate, ButtonToSendMessage} from "../../Utils/PageUtils/ButtonUtil";
import {ScreenTemplate} from 'Utils/PageUtils/PageContainerUtil'
import React from "react";
import {checkIdentityNumber} from "Utils/FormatUtils/IdentityNumberUtil";
import {TextInputTemplate} from "Utils/PageUtils/TextInputUtil";
import create from "zustand";
import {HospitalUpdateNucleicTestMessage} from "Messages/ThirdPartyMessages/HospitalUpdateNucleicTestMessage";
import {HospitalUpdateVaccinationMessage} from "Messages/ThirdPartyMessages/HospitalUpdateVaccinationMessage";
import {UserRiskLevel} from "Types/UserMeta/UserRiskLevel";
import {HospitalUpdateRiskLevelMessage} from "Messages/ThirdPartyMessages/HospitalUpdateRiskLevelMessage";

const patientInfoStore= create(() => ({
    identityNumber: "",
    riskLevel: ""
}))
const setIdentityNumber= (identityNumber:string) => patientInfoStore.setState({ identityNumber })
const setRiskLevel= (riskLevel:string) => patientInfoStore.setState({ riskLevel })

export function ModifyVaccinePage ({navigation}:any) {
    const {identityNumber, riskLevel}=patientInfoStore()
    return <ScreenTemplate>

        <TextInputTemplate placeholder={'检测人身份证号'} value={identityNumber} onChangeText={(newText: string)=>setIdentityNumber(newText)}/>

        <ButtonToSendMessage
            // checkBeforeSendMessage = {()=>(checkIdentityNumber(identityNumber))}
            checkElse = {()=>{
                alert('身份证号不正确！')
            }}
            icon = 'upload'
            toSendMessage = {new HospitalUpdateNucleicTestMessage(identityNumber)}
            text = '刷新核酸日期'
        />

        <ButtonToSendMessage
            // checkBeforeSendMessage = {()=>(checkIdentityNumber(identityNumber))}
            checkElse = {()=>{
                alert('身份证号不正确！')
            }}
            icon = 'upload'
            toSendMessage = {new HospitalUpdateVaccinationMessage(identityNumber)}
            text = '刷新疫苗接种情况'
        />

        <TextInputTemplate placeholder={'新风险等级'} value={riskLevel} onChangeText={(newText: string)=>setRiskLevel(newText)}/>

        <ButtonToSendMessage
            checkBeforeSendMessage = {()=>(Object.values(UserRiskLevel).includes(riskLevel as UserRiskLevel))}
            checkElse = {()=>{
                alert('风险等级错误')
            }}
            icon = 'upload'
            toSendMessage = {new HospitalUpdateRiskLevelMessage(identityNumber, riskLevel)}
            text = '更新风险等级'
        />

        <ButtonTemplate
        onPress={() => {
            navigation.navigate('Admin',{})
        }}
        text = '返回主页'/>

    </ScreenTemplate>
}