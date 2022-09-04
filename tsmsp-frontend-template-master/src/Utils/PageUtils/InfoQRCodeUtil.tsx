import {UserInformation} from "Types/UserInformation";
import QRCode from "react-native-qrcode-svg";
import {SCREEN_WIDTH} from "../SettingsAndConstants";
import {mapUserRiskToColor} from "Types/UserMeta/UserRiskLevel";
import React from "react";
import {UserIdentity} from "Types/UserIdentity";

export function RegisterCode(props:any){
    const avatar = require('Assets/icon.png')
    return <QRCode
        logo={avatar}
        value={JSON.stringify(props.userInfo)}
        size={SCREEN_WIDTH * 0.8}
    />
}