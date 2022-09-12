import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { TokenStore } from "Globals/TokenStore";
import {
  ButtonTemplate,
  ButtonToSendMessage,
} from "Utils/PageUtils/ButtonUtil";
import { TextInputTemplate } from "Utils/PageUtils/TextInputUtil";
import { ScreenTemplate } from "Utils/PageUtils/PageContainerUtil";
import { useFocusEffect } from "@react-navigation/native";
import { SendData } from "Utils/SendDataUtil";
import { UserGetIdentityNumberMessage } from "Messages/UserMessages/UserGetIdentityNumberMessage";
import { IdentityNumber } from "Types/UserMeta/IdentityNumber";
import { SecurityQuestion } from "Types/UserMeta/SecurityQuestion";
import { SecurityAnswer } from "Types/UserMeta/SecurityAnswer";
import { UserUpdateSecurityQuestionMessage } from "Messages/UserMessages/UserUpdateSecurityQuestionMessage";
import { UserUpdateSecurityAnswerMessage } from "Messages/UserMessages/UserUpdateSecurityAnswerMessage";
import { UserGetSecurityQuestionMessage } from "Messages/UserMessages/UserGetSecurityQuestionMessage";

export function SecurityQuestionPage({ navigation }: any) {
  const { token } = TokenStore();

  const [securityQuestion, setSecurityQuestion] = useState(
    new SecurityQuestion("")
  );
  const [securityAnswer, setSecurityAnswer] = useState(new SecurityAnswer(""));
  const refresh = () => {
    SendData(
      new UserGetIdentityNumberMessage(token),
      (reply: IdentityNumber) => {
        SendData(
          new UserGetSecurityQuestionMessage(reply),
          (replyQuestion: SecurityQuestion) => {
            setSecurityQuestion(replyQuestion);
          }
        );
      }
    );
  };
  useFocusEffect(React.useCallback(refresh, []));
  const goBack = () => navigation.navigate("Account.Overview");
  return (
    <ScreenTemplate goBack={goBack}>
      <TextInputTemplate
        label={"安全问题"}
        value={securityQuestion.name}
        onChangeText={(newText: string) =>
          setSecurityQuestion(new SecurityQuestion(newText))
        }
      />
      <TextInputTemplate
        label={"问题回答"}
        value={securityAnswer.token}
        onChangeText={(newText: string) =>
          setSecurityAnswer(new SecurityAnswer(newText))
        }
      />
      <ButtonTemplate
        onPress={() => {
          SendData(
            new UserUpdateSecurityQuestionMessage(token, securityQuestion)
          );
          SendData(new UserUpdateSecurityAnswerMessage(token, securityAnswer));
        }}
        text={"设置"}
      />
      <StatusBar style="auto" />
    </ScreenTemplate>
  );
}
