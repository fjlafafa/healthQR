import { useState } from "react";
import { RealName } from "Types/UserMeta/RealName";
import { Token } from "Types/UserMeta/Token";
import { ScreenTemplate } from "Utils/PageUtils/PageContainerUtil";
import { View } from "react-native";
import { ScanView } from "Utils/PageUtils/ScanQRCodeUtil";
import { TextTemplate } from "Utils/PageUtils/TextUtil";
import { ButtonToSendMessage } from "Utils/PageUtils/ButtonUtil";
import { HospitalUpdatePatientRecoveryByTokenMessage } from "Messages/ThirdPartyMessages/HospitalUpdatePatientRecoveryByTokenMessage";
import { TokenStore } from "Globals/TokenStore";

export function RecoverPatientPage({ navigation }: any) {
  const goBack = () => navigation.navigate("ThirdParty.Overview");
  const { token } = TokenStore();
  const [client, setClient] = useState({
    realName: new RealName(""),
    token: new Token(""),
  });

  return (
    <ScreenTemplate goBack={goBack}>
      <View style={{ height: 30 }} />
      <TextTemplate>当前恢复健康户为：{client.realName.name}</TextTemplate>
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
        toSendMessage={
          new HospitalUpdatePatientRecoveryByTokenMessage(token, client.token)
        }
        text={"恢复病人"}
      />
    </ScreenTemplate>
  );
}
