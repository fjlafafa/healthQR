import {UserInformation} from "../../../../../../Types/UserInformation";
import QRCode from "react-native-qrcode-svg";
import {SCREEN_WIDTH} from "../../../../../../Utils/SettingsAndConstants";
import {mapUserRiskToColor} from "../../../../../../Types/UserMeta/UserRiskLevel";
import React from "react";
import {UserIdentity} from "../../../../../../Types/UserIdentity";

export function RegisterCode(props:{userInfo:UserIdentity}){
    const avatar = require('Assets/icon.png')
    return <QRCode
        value={JSON.stringify(props.userInfo.identityNumber)}
        logo={avatar}
        size={SCREEN_WIDTH * 0.8}
    />
}