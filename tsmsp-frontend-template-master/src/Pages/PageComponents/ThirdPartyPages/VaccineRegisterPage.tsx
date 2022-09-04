import {ScreenTemplate} from "../../../Utils/PageUtils/PageContainerUtil";
import {ButtonToSendMessage} from "../../../Utils/PageUtils/ButtonUtil";
import {Permission} from "Types/UserMeta/Permission";
import {UserIdentity} from "Types/UserIdentity";
import {View} from "react-native";
import {TextTemplate} from "Utils/PageUtils/TextUtil";
import {ScanView} from "Utils/PageUtils/ScanQRCodeUtil";
import {ButtonGroup} from "Utils/PageUtils/ButtonGroupUtil";
import {VaccinationStatus} from "Types/UserMeta/VaccinationStatus";
import create from "zustand"
import {TokenStore} from "Globals/TokenStore";
import {TextInputTemplate} from "Utils/PageUtils/TextInputUtil";
import React, {useState} from "react";
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

    const [tosetVaccine, setTosetVaccine] = useState(VaccinationStatus.none)
    const [client, setClient] = useState(null as null | UserIdentity)

    return <ScreenTemplate goBack={goBack}>
        <View style={{height:30}}/>
        <TextTemplate>当前设置权限目标用户为：{(client === null ? '未定' : client.userId)}</TextTemplate>
        <TextTemplate>设置疫苗注射状况为：{tosetVaccine.toString()}</TextTemplate>
        <ScanView
            handleData={(data: string) => {
                const client = JSON.parse(data) as UserIdentity
                setClient(client)
            }
            }/>

        <TextInputTemplate label='接种人身份证号' value={identity} onChangeText={(identity: string) =>IDStore.setState({identity})} />
        <TextInputTemplate label='接种针数' value={vaccine} onChangeText={(vaccine: string) => VaccineNum.setState({vaccine})} />

        <ButtonToSendMessage
            text={'打一针'}/>
        {/**/}
        <ButtonToSendMessage
            checkBeforeSendMessage = {()=>(checkIdentityNumber(identity)&& TestVaccine(vaccine))}
            checkElse = {()=>{alert('请重新检查身份证号与接种针数是否填写正确')}}
            toSendMessage ={new HospitalUpdateVaccinationMessage(token, identity, vaccine)}
            text = '上传'
            ifSuccess = {()=>{IDStore.setState({identity:' '}); VaccineNum.setState({vaccine: ' '}) }}
            />



        <View style={{height:30}}/>
    </ScreenTemplate>
}