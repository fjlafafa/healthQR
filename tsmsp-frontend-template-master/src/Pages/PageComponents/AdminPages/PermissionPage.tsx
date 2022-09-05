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
import {AdminChangePermissionMessage} from "Messages/AdminMessages/AdminChangePermissionMessage";
import {TokenStore} from "Globals/TokenStore";

export function PermissionPage({navigation}: any) {

    const {token} = TokenStore()

    const goBack = () => navigation.navigate('Admin.Overview')
    const [tosetPremission, setTosetPremmission] = useState(Roles.user)
    const [client, setClient] = useState({realName: new RealName(''), token: new Token('')})

    return <ScreenTemplate goBack={goBack}>
        <View style={{height: 30}}/>
        <TextTemplate>当前设置权限目标用户为：{client.realName.name}</TextTemplate>
        <TextTemplate>设置权限为：{tosetPremission.toString()}</TextTemplate>
        <ScanView
            handleData={(data: string) => {
                const client = JSON.parse(data) as { realName: RealName, token: Token }
                setClient(client)
            }
            }
        />
        <ButtonGroup chosen={Roles.user} subprops={[
            {
                name: Roles.user.toString(),
                onPress: () => setTosetPremmission(Roles.user),
            }, {
                name: Roles.admin.toString(),
                onPress: () => setTosetPremmission(Roles.admin),
            }, {
                name: Roles.nucleic.toString(),
                onPress: () => setTosetPremmission(Roles.nucleic),
            },
        ]}/>
        <ButtonToSendMessage
            toSendMessage={new AdminChangePermissionMessage(new Token(token), client.token, tosetPremission)}
            text={'设置权限'}/>
        <View style={{height: 30}}/>
    </ScreenTemplate>
}