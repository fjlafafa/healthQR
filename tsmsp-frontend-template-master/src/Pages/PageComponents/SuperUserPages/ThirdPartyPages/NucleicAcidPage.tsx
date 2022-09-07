import { ScreenTemplate } from "Utils/PageUtils/PageContainerUtil";
import { HospitalUpdateNucleicTestMessage } from "Messages/ThirdPartyMessages/HospitalUpdateNucleicTestMessage";
import create from "zustand";
import {
  ButtonTemplate,
  ButtonToSendMessage,
} from "Utils/PageUtils/ButtonUtil";
import React, { useState } from "react";
import { TextInputTemplate } from "Utils/PageUtils/TextInputUtil";
import { TextTemplate } from "Utils/PageUtils/TextUtil";
import { checkIdentityNumber } from "Utils/FormatUtils/IdentityNumberUtil";
import { TokenStore } from "Globals/TokenStore";
import { RealName } from "Types/UserMeta/RealName";
import { Token } from "Types/UserMeta/Token";
import { IdentityNumber } from "Types/UserMeta/IdentityNumber";
import { View } from "react-native";
import { ScanView } from "Utils/PageUtils/ScanQRCodeUtil";
import { ButtonGroup } from "Utils/PageUtils/ButtonGroupUtil";
import { HospitalUpdateNucleicTestByTokenMessage } from "Messages/ThirdPartyMessages/HospitalUpdateNucleicTestByTokenMessage";
import { SendData } from "Utils/SendDataUtil";
import { HospitalUploadPositiveNucleicTestResultMessage } from "Messages/ThirdPartyMessages/HospitalUploadPositiveNucleicTestResultMessage";
import { UserRiskLevel } from "Types/UserMeta/UserRiskLevel";
import { HospitalUploadPositiveNucleicTestResultByTokenMessage } from "Messages/ThirdPartyMessages/HospitalUploadPositiveNucleicTestResultByTokenMessage";

export function NucleicAcidPage({ navigation }: any) {
  const { token } = TokenStore.getState();
  const goBack = () => navigation.navigate("ThirdParty.Overview");

  const [testResult, setTestResult] = useState(true); //?
  const [client, setClient] = useState({
    realName: new RealName(""),
    token: new Token(""),
  });

  return (
    <ScreenTemplate goBack={goBack}>
      <View style={{ height: 30 }}/>
      <TextTemplate>
        当前核酸检测目标用户为：{client.realName.name}
      </TextTemplate>
      <TextTemplate>
        设置检测结果为：{testResult ? "阳性" : "阴性"}
      </TextTemplate>
      <ScanView
        handleData={(data: string) => {
          const client = JSON.parse(data) as {
            realName: RealName;
            token: Token;
          };
          setClient(client);
        }}
      />
      {/*?*/}
      <ButtonGroup
        chosen={testResult ? "阳性" : "阴性"}
        subprops={[
          {
            name: "阳性",
            onPress: () => setTestResult(true),
          },
          {
            name: "阴性",
            onPress: () => setTestResult(false),
          },
        ]}
      />
      <ButtonTemplate
        icon="upload"
        onPress={() => {
          SendData(
            new HospitalUpdateNucleicTestByTokenMessage(token, client.token)
          );
          if (testResult) {
            SendData(
              new HospitalUploadPositiveNucleicTestResultByTokenMessage(
                token,
                client.token
              )
            );
          }
        }}
        text={"设置核酸检测结果"}
      />
      <View style={{ height: 30 }} />
    </ScreenTemplate>
  );
}
