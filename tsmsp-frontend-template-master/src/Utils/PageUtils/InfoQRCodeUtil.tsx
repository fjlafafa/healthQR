import QRCode from "react-native-qrcode-svg";
import { SCREEN_WIDTH } from "../SettingsAndConstants";
import React from "react";

export function RegisterCode(props: any) {
  const avatar = require("Assets/Images/猫猫.jpeg");
  return (
    <QRCode
      logo={avatar}
      value={JSON.stringify(props.userInfo)}
      size={SCREEN_WIDTH * 0.8}
    />
  );
}
