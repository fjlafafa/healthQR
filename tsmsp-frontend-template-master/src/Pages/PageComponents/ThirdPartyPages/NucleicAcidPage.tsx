import {ScreenTemplate} from "../../../Utils/PageUtils/PageContainerUtil";
import {HospitalUpdateNucleicTestMessage} from "Messages/ThirdPartyMessages/HospitalUpdateNucleicTestMessage";
import create from 'zustand'
import {ButtonToSendMessage} from "Utils/PageUtils/ButtonUtil";
import React from "react";
import {TextInputTemplate} from "Utils/PageUtils/TextInputUtil";
import {checkIdentityNumber} from "Utils/FormatUtils/IdentityNumberUtil";

export function NucleicAcidPage({navigation}:any){

const IDStore = create(()=> ({
        identity: ''
}))
const setIdentity = (identity: string) => IDStore.setState({identity})
const goBack=()=>navigation.navigate('ThirdParty.Overview')
const {identity} = IDStore()
//@ts-ignore
return <ScreenTemplate goBack={goBack}>

    <TextInputTemplate label='受检人身份证号' value={identity} onChangeText={(identity: string) => setIdentity(identity)}/>

    <ButtonToSendMessage
        checkBeforeSendMessage = {()=>(checkIdentityNumber(identity))}
        checkElse = {'请重新检查身份证号是否填写正确'}
        toSendMessage ={new HospitalUpdateNucleicTestMessage(identity)}
        text = '上传'
        ifSuccess = {IDStore.setState({identity:""})}
    />

</ScreenTemplate>}