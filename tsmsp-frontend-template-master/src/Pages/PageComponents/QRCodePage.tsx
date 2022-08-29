import QRCode from "react-native-qrcode-svg";
import React from "react";
import {styles} from "Utils/Styles";
import {View} from "react-native";
import {ButtonTemplate} from "Utils/PageUtils/PageButtonUtil";
import {TokenStore} from "Globals/TokenStore";
import {QRCodeSize} from "Globals/GlobalVariables";

export function QRCodePage({navigation}:any) {
    const {token} = TokenStore()
    const avatar = require('Assets/icon.png');
    return (
        <View style={styles.container}>
            <QRCode
                value={token}
                logo={avatar}
                size={QRCodeSize}
                color="green"
            />
            <ButtonTemplate
                onPress = {()=>navigation.navigate("Trace")}
                text = '返回主页'/>
        </View>
    )
}