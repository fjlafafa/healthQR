import {ScreenTemplate} from "../../../Utils/PageUtils/PageContainerUtil";
import {ButtonTemplate, ButtonToSendMessage} from "../../../Utils/PageUtils/ButtonUtil";
import {checkIdentityNumber} from "Utils/FormatUtils/IdentityNumberUtil";
import {HospitalUpdateNucleicTestMessage} from "Messages/ThirdPartyMessages/HospitalUpdateNucleicTestMessage";
import {Token} from "Types/UserMeta/Token";
import {IdentityNumber} from "Types/UserMeta/IdentityNumber";
import React from "react";
import {TextInputTemplate} from "Utils/PageUtils/TextInputUtil";
import create from "zustand";
import {TokenStore} from "Globals/TokenStore";

const IDStore = create(()=> ({identity: ' '}))
const setIdentity = (identity: string) => IDStore.setState({identity})
const UploadState = create( ()=>({state: '请上传疫苗接种信息'}))

export function VaccineRegisterPage({navigation}:any){

    const {identity} = IDStore()
    const {state} = UploadState.getState()
    const {token} = TokenStore.getState()
    const goBack=()=>navigation.navigate('ThirdParty.Overview')


    return <ScreenTemplate goBack={goBack}>

        <TextInputTemplate label='受检人身份证号' value={identity} onChangeText={(identity: string) => setIdentity(identity)}/>

        <ButtonToSendMessage
            checkBeforeSendMessage = {()=>(checkIdentityNumber(identity))}
            checkElse = {()=>{alert('请重新检查身份证号是否填写正确')}}
            toSendMessage ={new HospitalUpdateNucleicTestMessage(new Token(token), new IdentityNumber(identity))}
            text = '上传'
        />


    </ScreenTemplate>
}