import {ScreenTemplate} from "../../../Utils/PageUtils/PageContainerUtil";
import {ButtonToSendMessage} from "../../../Utils/PageUtils/ButtonUtil";
import create from "zustand"
import {TokenStore} from "Globals/TokenStore";
import {TextInputTemplate} from "Utils/PageUtils/TextInputUtil";
import React from "react";
import {checkIdentityNumber} from "Utils/FormatUtils/IdentityNumberUtil";
import {HospitalUpdateVaccinationMessage} from "Messages/ThirdPartyMessages/HospitalUpdateVaccinationMessage";

const IDStore = create(()=> ({identity: ''}))
const VaccineNum = create(()=>({vaccine: ''}))
const TestVaccine = (vaccine:string) => {return vaccine === '1' || vaccine  === '2'|| vaccine === '3'}

export function VaccineRegisterPage({navigation}:any){


    const {token} = TokenStore()
    const goBack=()=>navigation.navigate('ThirdParty.Overview')
    const {identity}=IDStore()
    const {vaccine} = VaccineNum()


    return <ScreenTemplate goBack={goBack}>

        <TextInputTemplate label='接种人身份证号' value={identity} onChangeText={(identity: string) =>IDStore.setState({identity})} />
        <TextInputTemplate label='接种针数' value={vaccine} onChangeText={(vaccine: string) => VaccineNum.setState({vaccine})} />

        <ButtonToSendMessage
            checkBeforeSendMessage = {()=>(checkIdentityNumber(identity)&& TestVaccine(vaccine))}
            checkElse = {()=>{alert('请重新检查身份证号与接种针数是否填写正确')}}
            toSendMessage ={new HospitalUpdateVaccinationMessage(token, identity, vaccine)}
            text = '上传'
            ifSuccess = {()=>{IDStore.setState({identity:' '}); VaccineNum.setState({vaccine: ' '}) }}
            />


    </ScreenTemplate>
}