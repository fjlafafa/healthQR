import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { setUserToken, TokenStore } from "Globals/TokenStore";
import { ButtonTemplate } from "Utils/PageUtils/ButtonUtil";
import {
  ScreenTemplate,
  ScrollTemplate,
} from "Utils/PageUtils/PageContainerUtil";

export function AdminBrotherPage({ navigation }: any) {
  const { token } = TokenStore();
  const [nothing, update] = useState(0);
  return (
    <ScreenTemplate>
      <ScrollTemplate>
        <ButtonTemplate
          onPress={() => navigation.navigate("Admin")}
          text="返回主测试"
        />

        <StatusBar style="auto" />
      </ScrollTemplate>
    </ScreenTemplate>
  );
}
