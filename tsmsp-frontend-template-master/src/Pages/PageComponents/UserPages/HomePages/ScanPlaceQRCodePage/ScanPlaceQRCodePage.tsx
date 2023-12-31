import React, { useState } from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { ButtonTemplate } from "Utils/PageUtils/ButtonUtil";
import { TokenStore } from "Globals/TokenStore";
import {
  ScreenTemplate,
  ScrollTemplate,
} from "Utils/PageUtils/PageContainerUtil";
import { ViewSwitcher } from "../HomePagesUtils/BarUtil";
import { SCREEN_WIDTH } from "Utils/SettingsAndConstants";
import { PlaceScanView } from "./ScanPlaceQRCodeUtils/ScanViewUtil";
import { HeaderTemplate } from "Utils/PageUtils/HeaderUtil";

export function ScanPlaceQRCodePage({ navigation }: any) {
  const [cameraOn, setCamera] = useState(false);
  const { token } = TokenStore();

  const goBack = () => navigation.navigate("User.Overview");

  return (
    <ScreenTemplate goBack={goBack}>
      <ViewSwitcher state={"User.ScanPlaceQRCode"} navigation={navigation} />
      <ScrollTemplate>
        <View
          style={{
            width: SCREEN_WIDTH,
            height: SCREEN_WIDTH * 1.4,
            alignItems: "center",
            justifyContent: "center" /*backgroundColor: '#f0f'/**/,
          }}
        >
          {cameraOn ? (
            <PlaceScanView token={token} />
          ) : (
            <Button
              icon={"qrcode-scan"}
              mode="text"
              onPress={() => {
                setCamera(true);
              }}
            >
              点击开启地点扫码
            </Button>
          )}
        </View>
        <ButtonTemplate
          icon="qrcode-scan"
          onPress={() => {
            if (cameraOn) setCamera(false);
            else setCamera(true);
          }}
        >
          {cameraOn ? (
            <Text>点击关闭地点扫码</Text>
          ) : (
            <Text>点击开启地点扫码</Text>
          )}
        </ButtonTemplate>
        <HeaderTemplate text="行程相关微服务" />
        <ButtonTemplate
          icon="map"
          onPress={() => navigation.navigate("User.Trace")}
          text="我的行程"
        />
      </ScrollTemplate>
    </ScreenTemplate>
  );
}
