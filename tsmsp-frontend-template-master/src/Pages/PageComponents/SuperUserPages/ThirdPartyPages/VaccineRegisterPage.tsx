import { ScreenTemplate } from "Utils/PageUtils/PageContainerUtil";
import { ButtonToSendMessage } from "Utils/PageUtils/ButtonUtil";
import { Token } from "Types/UserMeta/Token";
import React, { useState } from "react";
import create from "zustand";
import { TokenStore } from "Globals/TokenStore";
import { View } from "react-native";
import { TextTemplate } from "Utils/PageUtils/TextUtil";
import { ScanView } from "Utils/PageUtils/ScanQRCodeUtil";
import { VaccinationStatus } from "Types/UserMeta/VaccinationStatus";
import { RealName } from "Types/UserMeta/RealName";
import { HospitalUpdateVaccinationByTokenMessage } from "Messages/ThirdPartyMessages/HospitalUpdateVaccinationByTokenMessage";

const IDStore = create(() => ({ identity: " " }));
const setIdentity = (identity: string) => IDStore.setState({ identity });
const UploadState = create(() => ({ state: "请上传疫苗接种信息" }));
const VaccineNum = create(() => ({ vaccine: "" }));
const TestVaccine = (vaccine: string) => {
  return vaccine === "1" || vaccine === "2" || vaccine === "3";
};

export function VaccineRegisterPage({ navigation }: any) {
  const { token } = TokenStore();
  const { state } = UploadState.getState();
  const goBack = () => navigation.navigate("ThirdParty.Overview");
  const { identity } = IDStore();
  const { vaccine } = VaccineNum();

  const [tosetVaccine, setTosetVaccine] = useState(VaccinationStatus.none);
  const [client, setClient] = useState({
    realName: new RealName(""),
    token: new Token(""),
  });

  return (
    <ScreenTemplate goBack={goBack}>
      <View style={{ height: 30 }} />
      <TextTemplate>
        当前疫苗注射目标用户为：{client.realName.name}
      </TextTemplate>
      <TextTemplate>更新疫苗情况</TextTemplate>
      <ScanView
        handleData={(data: string) => {
          const client = JSON.parse(data) as {
            realName: RealName;
            token: Token;
          };
          setClient(client);
        }}
      />
      <ButtonToSendMessage
        icon="upload"
        toSendMessage={
          new HospitalUpdateVaccinationByTokenMessage(token, client.token)
        }
        text={"打一针"}
      />
    </ScreenTemplate>
  );
}
