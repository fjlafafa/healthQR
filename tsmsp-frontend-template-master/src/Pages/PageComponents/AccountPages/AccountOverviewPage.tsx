import { clearUserToken } from "Globals/TokenStore";
import { ScreenTemplate } from "Utils/PageUtils/PageContainerUtil";
import { ButtonTemplate } from "Utils/PageUtils/ButtonUtil";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { clearUserRole, RoleStore } from "Globals/RoleStore";
import { Roles } from "Types/UserMeta/Roles";

export function AccountOverviewPage({ navigation }: any) {
  const { role } = RoleStore();
  const goBack = () => {
    if (role === Roles.normal) {
      navigation.navigate("User.Overview");
    } else {
      navigation.navigate("SuperUser.InfoQRCodePage");
    }
  };
  return (
    <ScreenTemplate goBack={goBack}>
      <ButtonTemplate
        icon="account"
        onPress={() => {
          navigation.navigate("Account.Info");
        }}
        text="个人信息查看修改"
      />
      <ButtonTemplate
        icon="account-key"
        onPress={() => {
          navigation.navigate("Account.Password");
        }}
        text="修改密码"
      />
      <ButtonTemplate
        icon="account-key"
        onPress={() => {
          navigation.navigate("Account.SecurityQuestion");
        }}
        text="修改安全问题"
      />
      <ButtonTemplate
        icon="account-remove"
        onPress={() => {
          navigation.navigate("Account.Deletion");
        }}
        text="注销账户"
      />
      <ButtonTemplate
        icon="logout"
        onPress={() => {
          navigation.navigate("Start.Login");
          clearUserToken();
          clearUserRole();
        }}
        text="退出登录"
      />

      <StatusBar style="auto" />
    </ScreenTemplate>
  );
}
