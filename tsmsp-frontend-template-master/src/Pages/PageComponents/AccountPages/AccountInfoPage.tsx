import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { TokenStore } from "Globals/TokenStore";
import { TextInputTemplate } from "Utils/PageUtils/TextInputUtil";
import { ScreenTemplate } from "Utils/PageUtils/PageContainerUtil";
import { UserId } from "Types/UserMeta/UserId";
import { SendData } from "Utils/SendDataUtil";
import { useFocusEffect } from "@react-navigation/native";
import { RealName } from "Types/UserMeta/RealName";
import { RoleStore } from "Globals/RoleStore";
import { IdentityNumber } from "Types/UserMeta/IdentityNumber";
import { UserGetRealNameMessage } from "Messages/UserMessages/UserGetRealNameMessage";
import { UserGetIdMessage } from "Messages/UserMessages/UserGetIdMessage";
import { UserGetIdentityNumberMessage } from "Messages/UserMessages/UserGetIdentityNumberMessage";

export function AccountInfoPage({ navigation }: any) {
  const { token } = TokenStore();
  const { role } = RoleStore();
  //refresh
  const [realName, setRealName] = useState(new RealName(""));
  const [userId, setUserId] = useState(new UserId(0));
  const [identityNumber, setIdentityNumber] = useState(new IdentityNumber(""));
  const refresh = () => {
    SendData(new UserGetRealNameMessage(token), (reply: RealName) => {
      setRealName(reply);
    });
    SendData(new UserGetIdMessage(token), (reply: UserId) => {
      setUserId(reply);
    });
    SendData(
      new UserGetIdentityNumberMessage(token),
      (reply: IdentityNumber) => {
        setIdentityNumber(reply);
      }
    );
  };
  useFocusEffect(React.useCallback(refresh, []));
  //goBack
  const goBack = () => navigation.navigate("Account.Overview");
  return (
    <ScreenTemplate goBack={goBack}>
      <TextInputTemplate
        label={"真实姓名"}
        value={realName.name}
        disabled={true}
      />
      <TextInputTemplate label={"用户ID"} value={userId.id} disabled={true} />
      <TextInputTemplate
        label={"身份证号"}
        value={identityNumber.token}
        disabled={true}
      />

      <TextInputTemplate
        label={"权限身份"}
        value={role.toString()}
        disabled={true}
      />

      <StatusBar style="auto" />
    </ScreenTemplate>
  );
}
