import {ScreenTemplate} from "../../../Utils/PageUtils/PageContainerUtil";
import {ButtonTemplate, ButtonToSendMessage} from "../../../Utils/PageUtils/ButtonUtil";
import React, {useState} from "react";
import {Permission} from "Types/UserMeta/Permission";
import {UserIdentity} from "Types/UserIdentity";
import {View} from "react-native";
import {TextTemplate} from "Utils/PageUtils/TextUtil";
import {ScanView} from "Utils/PageUtils/ScanQRCodeUtil";
import {ButtonGroup} from "Utils/PageUtils/ButtonGroupUtil";
import {VaccinationStatus} from "Types/UserMeta/VaccinationStatus";

export function VaccineRegisterPage({navigation}:any){

    const goBack=()=>navigation.navigate('ThirdParty.Overview')

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
        <ButtonToSendMessage
            text={'打一针'}/>
        <View style={{height:30}}/>
    </ScreenTemplate>
}