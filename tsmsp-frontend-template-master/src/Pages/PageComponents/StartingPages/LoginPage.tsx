import React from "react";
import { StatusBar } from "expo-status-bar";
import create from "zustand";
import { setUserToken } from "Globals/TokenStore";
import { UserLoginMessage } from "Messages/UserMessages/UserLoginMessage";
import {
  ButtonTemplate,
  ButtonToSendMessage,
} from "Utils/PageUtils/ButtonUtil";
import { AllowTester } from "Globals/GlobalVariables";
import { TextInputTemplate } from "Utils/PageUtils/TextInputUtil";
import { ScreenTemplate } from "Utils/PageUtils/PageContainerUtil";
import { IdentityNumber } from "Types/UserMeta/IdentityNumber";
import { Password } from "Types/UserMeta/Password";
import { Token } from "Types/UserMeta/Token";
import { UserLogin } from "Utils/LoginUtils";

const image = require("Assets/Images/水墨舟.jpeg");

const loginStore = create(() => ({
  userName: "",
  password: "",
}));

const setUserName = (userName: string) => loginStore.setState({ userName });
const setPassword = (password: string) => loginStore.setState({ password });
const clearLoginInfo = () =>
  loginStore.setState({ userName: "", password: "" });

export function LoginPage({ navigation }: any) {
  const { userName, password } = loginStore();
  return (
    <ScreenTemplate atRoot={true} background_image={image}>
      <TextInputTemplate
        label="身份证号"
        value={userName}
        onChangeText={(newText: string) => setUserName(newText)}
      />
      <TextInputTemplate
        label="密码"
        value={password}
        onChangeText={(newText: string) => setPassword(newText)}
        secureTextEntry={true}
      />
      <ButtonToSendMessage
        icon="login"
        toSendMessage={
          new UserLoginMessage(
            new IdentityNumber(userName),
            new Password(password)
          )
        }
        ifSuccess={(reply: Token) => {
          setUserToken(reply);
          UserLogin(navigation, reply, clearLoginInfo);
        }}
        text="登录"
      />
      <ButtonTemplate
        icon="account-multiple-plus"
        onPress={() => {
          navigation.navigate("Start.Register");
          clearLoginInfo();
        }}
        text="注册"
      />

      <ButtonTemplate
        icon="table-key"
        onPress={() => {
          navigation.navigate("Start.FindPassword");
          clearLoginInfo();
        }}
        text="找回密码"
      />

      {
        //管理员界面唯一入口
        AllowTester ? (
          <ButtonTemplate
            onPress={() => {
              navigation.navigate("Admin");
              clearLoginInfo();
            }}
            text="测试员入口"
          />
        ) : null
      }

      <StatusBar style="auto" />
    </ScreenTemplate>
  );
}
