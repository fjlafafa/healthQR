import {ScreenTemplate} from "Utils/PageUtils/PageContainerUtil";
import {HospitalUpdateNucleicTestMessage} from "Messages/ThirdPartyMessages/HospitalUpdateNucleicTestMessage";
import create from 'zustand'
import {ButtonToSendMessage} from "Utils/PageUtils/ButtonUtil";
import React from "react";
import {TextInputTemplate} from "Utils/PageUtils/TextInputUtil";
import {TextTemplate} from "Utils/PageUtils/TextUtil";
import {checkIdentityNumber} from "Utils/FormatUtils/IdentityNumberUtil";
import {TokenStore} from "Globals/TokenStore";
import {useNavigation} from "@react-navigation/native";

const IDStore = create(()=> ({identity: ' '}))
const setIdentity = (identity: string) => IDStore.setState({identity})
const UploadState = create( ()=>({state: '请上传核酸检测信息'}))



export function NucleicAcidPage({navigation}:any){

    const {identity} = IDStore()
    const {state} = UploadState.getState()
    const {token} = TokenStore.getState()
    const goBack = ()=>navigation.navigate('ThirdParty.Overview')

return <ScreenTemplate goBack={goBack}>
    <TextTemplate value={state}/>

    <TextInputTemplate label='受检人身份证号' value={identity} onChangeText={(identity: string) => setIdentity(identity)}/>

    <ButtonToSendMessage
        checkBeforeSendMessage = {()=>(checkIdentityNumber(identity))}
        checkElse = {()=>{alert('请重新检查身份证号是否填写正确')}}
        toSendMessage ={new HospitalUpdateNucleicTestMessage(identity, token)}
        text = '上传'
        ifSuccess = {()=>{IDStore.setState({identity:" "})}}
    />


</ScreenTemplate>}