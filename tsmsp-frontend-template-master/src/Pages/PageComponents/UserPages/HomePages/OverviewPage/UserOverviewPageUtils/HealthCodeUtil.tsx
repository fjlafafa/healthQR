import {UserInformation} from "Types/UserInformation";
import {SCREEN_WIDTH} from "Utils/SettingsAndConstants";
import QRCode from "react-native-qrcode-svg";
import React from "react";
import {mapUserRiskToColor} from "Types/UserMeta/UserRiskLevel";

export function HealthCode(props: { userInfo: UserInformation }) {
    const avatar = require('Assets/icon.png')
    return <QRCode
        value={JSON.stringify(props.userInfo)}
        logo={avatar}
        size={SCREEN_WIDTH * 0.9}
        color={mapUserRiskToColor(props.userInfo.riskLevel)}
    />
}