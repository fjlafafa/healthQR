import QRCode from "react-native-qrcode-svg";
import React from "react";
import {styles} from "../Utils/Styles";
import {Button, View} from "react-native";
import {ButtonTemplate} from "../Utils/PageUtils";

export function QRCodePage({navigation}:any) {
    return (
        <View style={styles.container}>
            <QRCode
                value="https://www.baidu.com"
            />
            <ButtonTemplate
                onPress = {()=>navigation.navigate("Root")}
                text = '返回登录界面'/>
        </View>
    )
}