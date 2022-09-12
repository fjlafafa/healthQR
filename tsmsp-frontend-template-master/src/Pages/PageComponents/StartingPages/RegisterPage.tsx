import React from "react";
import { StatusBar } from "expo-status-bar";
import create from "zustand";
import { setUserToken } from "Globals/TokenStore";
import { UserRegisterMessage } from "Messages/UserMessages/UserRegisterMessage";
import { ButtonToSendMessage } from "Utils/PageUtils/ButtonUtil";
import { ScreenTemplate } from "Utils/PageUtils/PageContainerUtil";
import { TextInputTemplate } from "Utils/PageUtils/TextInputUtil";
import { checkIdentityNumber } from "Utils/FormatUtils/IdentityNumberUtil";
import { checkPassword } from "Utils/FormatUtils/PasswordUtil";
import { checkRealName } from "Utils/FormatUtils/RealNameUtil";
import { RealName } from "Types/UserMeta/RealName";
import { IdentityNumber } from "Types/UserMeta/IdentityNumber";
import { Password } from "Types/UserMeta/Password";
import { SecurityQuestion } from "Types/UserMeta/SecurityQuestion";
import { SecurityAnswer } from "Types/UserMeta/SecurityAnswer";
import { Token } from "Types/UserMeta/Token";
import { ImageBackground, StyleSheet } from "react-native";

const image = require("Assets/Images/水墨舟.jpeg");
const settings = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "cover",
  },
});

const registerStore = create(() => ({
  realName: "",
  password: "",
  identityNumber: "",
}));

const setUserName = (realName: string) => registerStore.setState({ realName });
const setPassword = (password: string) => registerStore.setState({ password });
const setRealName = (identityNumber: string) =>
  registerStore.setState({ identityNumber });
const clearRegisterInfo = () =>
  registerStore.setState({ realName: "", password: "", identityNumber: "" });

export function RegisterPage({ navigation }: any) {
  const { realName, password, identityNumber } = registerStore();

  const goBack = () => {
    navigation.navigate("Start.Login");
    clearRegisterInfo();
  };

  return (
    <ScreenTemplate goBack={goBack}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={settings.image}
        imageStyle={{ opacity: 0.5 }}
      >
        <TextInputTemplate
          label={"真实姓名"}
          value={realName}
          onChangeText={(newText: string) => setUserName(newText)}
        />
        <TextInputTemplate
          label={"密码"}
          value={password}
          onChangeText={(newText: string) => setPassword(newText)}
          secureTextEntry={true}
        />
        <TextInputTemplate
          label={"身份证号"}
          value={identityNumber}
          onChangeText={(newText: string) => setRealName(newText)}
        />

        <ButtonToSendMessage
          checkBeforeSendMessage={() =>
            checkRealName(realName) &&
            checkPassword(password) &&
            checkIdentityNumber(identityNumber)
          }
          checkElse={() => {
            alert("姓名、密码（至少六位）或身份证号不符要求！");
          }}
          toSendMessage={
            new UserRegisterMessage(
              new RealName(realName),
              new Password(password),
              new IdentityNumber(identityNumber),
              new SecurityQuestion("你的密码是？"),
              new SecurityAnswer(password)
            )
          }
          text="注册"
          ifSuccess={(reply: Token) => {
            setUserToken(reply);
            navigation.navigate("User.Overview");
            alert("请尽快前往个人账户中心设置安全问题！");
            clearRegisterInfo();
          }}
        />
        <StatusBar style="auto" />
      </ImageBackground>
    </ScreenTemplate>
  );
}
