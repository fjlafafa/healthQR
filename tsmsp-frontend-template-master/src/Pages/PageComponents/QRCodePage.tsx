import QRCode from "react-native-qrcode-svg";
import React from "react";
import {ButtonTemplate} from "../../Utils/PageUtils/ButtonUtil";
import {TokenStore} from "Globals/TokenStore";
import {QRCodeSize} from "Globals/GlobalVariables";
import {PageContainerTemplate} from "Utils/PageUtils/PageContainerUtil";

export function QRCodePage({navigation}:any) {
    const {token} = TokenStore()
    const avatar = require('Assets/icon.png');
    return (
        <PageContainerTemplate>
            <QRCode
                value={token}
                logo={avatar}
                size={QRCodeSize}
                color="green"
            />
            <ButtonTemplate
                onPress = {()=>navigation.navigate("Trace")}
                text = '返回主页'/>
        </PageContainerTemplate>
    )
}