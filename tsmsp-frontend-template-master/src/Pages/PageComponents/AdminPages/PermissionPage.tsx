import {ScreenTemplate} from "../../../Utils/PageUtils/PageContainerUtil";
import {ButtonTemplate, ButtonToSendMessage} from "../../../Utils/PageUtils/ButtonUtil";
import {ScanView} from "Utils/PageUtils/ScanQRCodeUtil";
import {TraceId} from "Types/TraceMeta/TraceId";
import {SCREEN_WIDTH} from "Utils/SettingsAndConstants";
import QRCode from "react-native-qrcode-svg";
import React, {useState} from "react";
import {TextTemplate} from "Utils/PageUtils/TextUtil";
import {Permission} from "Types/UserMeta/Permission";
import {UserIdentity} from "Types/UserIdentity";
import {ButtonGroup} from "Utils/PageUtils/ButtonGroupUtil";
import {Card} from "react-native-paper";
import { View } from "react-native";

export function PermissionPage({navigation}: any) {

    const goBack = () => navigation.navigate('Admin.Overview')
    //const testdata='{"fid":{"dick":123321}}'
    const [tosetPremission, setTosetPremmission] = useState(Permission.normal)
    const [client, setClient] = useState(null as null | UserIdentity)

    return <ScreenTemplate goBack={goBack}>
        <View style={{height:30}}/>
        <TextTemplate>当前设置权限目标用户为：{(client === null ? '未定' : client.realName.name)}</TextTemplate>
        <TextTemplate>设置权限为：{tosetPremission.toString()}</TextTemplate>
        <ScanView
            handleData={(data: string) => {
                const client = JSON.parse(data) as UserIdentity
                setClient(client)
            }
            }/>
        <ButtonGroup chosen={Permission.normal} subprops={[
            {
                name: Permission.normal.toString(),
                onPress: () => setTosetPremmission(Permission.normal),
            }, {
                name: Permission.admin.toString(),
                onPress: () => setTosetPremmission(Permission.admin),
            }, {
                name: Permission.nucleic.toString(),
                onPress: () => setTosetPremmission(Permission.nucleic),
            },
        ]}/>
        <ButtonToSendMessage
            text={'设置权限'}/>
        <View style={{height:30}}/>
    </ScreenTemplate>
}