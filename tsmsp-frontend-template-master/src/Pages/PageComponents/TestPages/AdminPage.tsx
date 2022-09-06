import { StatusBar } from "expo-status-bar";
import React from "react";
import { setUserToken } from "Globals/TokenStore";
import {
  ButtonTemplate,
  ButtonToSendMessage,
} from "Utils/PageUtils/ButtonUtil";
import {
  ScreenTemplate,
  ScrollTemplate,
} from "Utils/PageUtils/PageContainerUtil";
import { UserRegisterMessage } from "Messages/UserMessages/UserRegisterMessage";
import { RealName } from "Types/UserMeta/RealName";
import { IdentityNumber } from "Types/UserMeta/IdentityNumber";
import { Password } from "Types/UserMeta/Password";
import { DataTable } from "react-native-paper";
import { TextTemplate } from "Utils/PageUtils/TextUtil";
import { checkPermission, Permissions, Roles } from "Types/UserMeta/Roles";
import { SecurityQuestion } from "Types/UserMeta/SecurityQuestion";
import { SecurityAnswer } from "Types/UserMeta/SecurityAnswer";
import { Token } from "Types/UserMeta/Token";

//This is just a page for test
export function AdminPage({ navigation }: any) {
  const goBack = () => navigation.navigate("Start.Login");
  return (
    <ScreenTemplate goBack={goBack}>
      <ScrollTemplate>
        <TextTemplate>
          {checkPermission(Roles.admin, Permissions.setAdmin) ? 1 : 0}
        </TextTemplate>
        <TextTemplate>
          {checkPermission(Roles.normal, Permissions.setAdmin) ? 1 : 0}
        </TextTemplate>
        <TextTemplate>
          {checkPermission(Roles.government, Permissions.setRiskOfPlace)
            ? 1
            : 0}
        </TextTemplate>
        <TextTemplate>
          {parseInt("adsfasd") === NaN ? "NaN" : ",,,"}
        </TextTemplate>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title sortDirection="descending">风险</DataTable.Title>
            <DataTable.Title numeric>省</DataTable.Title>
            <DataTable.Title numeric>市</DataTable.Title>
            <DataTable.Title numeric>区</DataTable.Title>
            <DataTable.Title numeric>街道</DataTable.Title>
            <DataTable.Title numeric>时间</DataTable.Title>
          </DataTable.Header>
        </DataTable>

        <ButtonTemplate
          onPress={() => navigation.navigate("AdminBrother")}
          text="返回副测试"
        />

        <ButtonToSendMessage
          toSendMessage={
            new UserRegisterMessage(
              new RealName(""),
              new Password(""),
              new IdentityNumber(""),
              new SecurityQuestion(""),
              new SecurityAnswer("")
            )
          }
          text="注册空用户"
          ifSuccess={(reply: Token) => {
            setUserToken(reply);
            navigation.navigate("User.Overview");
          }}
        />
        <ButtonToSendMessage
          toSendMessage={
            new UserRegisterMessage(
              new RealName(new Date().getTime().toString()),
              new Password(""),
              new IdentityNumber(""),
              new SecurityQuestion(""),
              new SecurityAnswer("")
            )
          }
          text="注册全新用户"
          ifSuccess={(reply: Token) => {
            setUserToken(reply);
            navigation.navigate("User.Overview");
          }}
        />
        <ButtonTemplate
          onPress={() => navigation.navigate("User.Overview")}
          text={"免登录进入用户"}
        />
        <ButtonTemplate
          onPress={() => navigation.navigate("Admin.Overview")}
          text={"免登录进入管理员"}
        />
        <ButtonTemplate
          onPress={() => navigation.navigate("ThirdParty.Overview")}
          text={"免登录进入第三方"}
        />
        <ButtonTemplate
          onPress={() => navigation.navigate("Start.Login")}
          text="返回登录界面"
        />

        <StatusBar style="auto" />
      </ScrollTemplate>
    </ScreenTemplate>
  );
}
