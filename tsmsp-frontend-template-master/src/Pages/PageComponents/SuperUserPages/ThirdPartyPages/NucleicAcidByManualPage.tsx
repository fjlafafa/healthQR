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

const IDStore = create(() => ({ identity: " " }));
const setIdentity = (identity: string) => IDStore.setState({ identity });
const UploadState = create(() => ({ state: "请上传核酸检测信息" }));

export function NucleicAcidByManualPage({ navigation }: any) {
  const { identity } = IDStore();
  const { state } = UploadState();
  const { token } = TokenStore.getState();
  const goBack = () => navigation.navigate("ThirdParty.Overview");

  return (
    <ScreenTemplate goBack={goBack}>
      <View style={{ height: 30 }} />
      <TextTemplate value={state} />

      <TextInputTemplate
        label="受检人身份证号"
        value={identity}
        onChangeText={(identity: string) => setIdentity(identity)}
      />

      <ButtonToSendMessage
        icon="upload"
        checkBeforeSendMessage={() => checkIdentityNumber(identity)}
        checkElse={() => {
          alert("请重新检查身份证号是否填写正确");
        }}
        toSendMessage={
          new HospitalUpdateNucleicTestMessage(
            token,
            new IdentityNumber(identity)
          )
        }
        text="上传"
        ifSuccess={() => {
          IDStore.setState({ identity: " " });
        }}
      />
    </ScreenTemplate>
  );
}
