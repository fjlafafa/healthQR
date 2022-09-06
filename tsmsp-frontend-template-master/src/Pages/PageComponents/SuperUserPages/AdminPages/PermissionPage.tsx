import {ScreenTemplate} from "Utils/PageUtils/PageContainerUtil";
import {ButtonToSendMessage} from "Utils/PageUtils/ButtonUtil";
import {ScanView} from "Utils/PageUtils/ScanQRCodeUtil";
import React, {useState} from "react";
import {TextTemplate} from "Utils/PageUtils/TextUtil";
import {Roles} from "Types/UserMeta/Roles";
import {ButtonGroup} from "Utils/PageUtils/ButtonGroupUtil";
import {View} from "react-native";
import {Token} from "Types/UserMeta/Token";
import {RealName} from "Types/UserMeta/RealName";
import {AdminChangeRoleMessage} from "Messages/AdminMessages/AdminChangeRoleMessage";
import {TokenStore} from "Globals/TokenStore";

export function PermissionPage({navigation}: any) {

    const {token} = TokenStore()

    const goBack = () => navigation.navigate('Admin.Overview')
    const [toSetPermission, setToSetPermission] = useState(Roles.normal)
    const [client, setClient] = useState({realName: new RealName(''), token: new Token('')})

    return <ScreenTemplate goBack={goBack}>
        <View style={{height: 30}}/>
        <TextTemplate>当前设置权限目标用户为：{client.realName.name}</TextTemplate>
        <TextTemplate>设置权限为：{toSetPermission.toString()}</TextTemplate>
        <ScanView
            handleData={(data: string) => {
                const client = JSON.parse(data) as { realName: RealName, token: Token }
                setClient(client)
            }
            }
        />
        <ButtonGroup chosen={Roles.normal} subprops={[
            {
                name: Roles.superAdmin.toString(),
                onPress: () => setToSetPermission(Roles.superAdmin),
            }, {
                name: Roles.admin.toString(),
                onPress: () => setToSetPermission(Roles.admin),
            }, {
                name: Roles.normal.toString(),
                onPress: () => setToSetPermission(Roles.normal),
            }, {
                name: Roles.nucleic.toString(),
                onPress: () => setToSetPermission(Roles.nucleic),
            }, {
                name: Roles.vaccine.toString(),
                onPress: () => setToSetPermission(Roles.vaccine),
            }, {
                name: Roles.hospital.toString(),
                onPress: () => setToSetPermission(Roles.hospital),
            }, {
                name: Roles.government.toString(),
                onPress: () => setToSetPermission(Roles.government),
            }
        ]}/>
        <ButtonToSendMessage
            toSendMessage={new AdminChangeRoleMessage(token, client.token, toSetPremission)}
            text={'设置权限'}/>
        <View style={{height: 30}}/>
    </ScreenTemplate>
}