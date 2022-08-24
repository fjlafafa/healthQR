import QRCode from "react-native-qrcode-svg";
import React from "react";

export function QRCodePage() {
    return (
        <QRCode
            value="https://www.baidu.com"
        />
    )
}