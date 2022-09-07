import { ScreenTemplate } from "Utils/PageUtils/PageContainerUtil";
import { ButtonToSendMessage } from "Utils/PageUtils/ButtonUtil";
import React from "react";
import create from "zustand";
import { TextInputTemplate } from "Utils/PageUtils/TextInputUtil";
import { UserUpdateTemperatureMessage } from "Messages/UserMessages/UserUpdateTemperatureMessage";
import { TokenStore } from "Globals/TokenStore";
import { Temperature } from "Types/UserMeta/Temperature";
import { checkTemperature } from "Utils/FormatUtils/TemperatureUtils";

const TemperatureStore = create(() => ({ temperature: "" }));

export function TemperaturePage({ navigation }: any) {
  const { temperature } = TemperatureStore();
  const { token } = TokenStore();
  const goBack = () => navigation.navigate("User.Overview");
  return (
    <ScreenTemplate goBack={goBack}>
      <TextInputTemplate
        label="检测体温"
        value={temperature}
        onChangeText={(temperature: string) =>
          TemperatureStore.setState({ temperature })
        }
      />

      <ButtonToSendMessage
        icon="upload"
        checkBeforeSendMessage={() => checkTemperature(temperature)}
        checkElse={() => {
          alert("请输入正确的摄氏度体温");
        }}
        toSendMessage={
          new UserUpdateTemperatureMessage(token, new Temperature(+temperature))
        }
        text="上传"
        ifSuccess={() => {
          TemperatureStore.setState({ temperature: "" });
        }}
      />
    </ScreenTemplate>
  );
}
