import {
  ScreenTemplate,
  ScrollTemplate,
} from "Utils/PageUtils/PageContainerUtil";
import { View } from "react-native";
import { DAY_MILLIS, SCREEN_WIDTH } from "Utils/SettingsAndConstants";
import { Card } from "react-native-paper";
import { TextTemplate } from "Utils/PageUtils/TextUtil";
import { ButtonTemplate } from "Utils/PageUtils/ButtonUtil";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { clearUserToken, TokenStore } from "Globals/TokenStore";
import { SendData } from "Utils/SendDataUtil";
import { UserGetTraceMessage } from "Messages/UserMessages/UserGetTraceMessage";
import { ViewSwitcher } from "../HomePagesUtils/BarUtil";
import { Trace } from "Types/Trace";
import { useFocusEffect } from "@react-navigation/native";
import { TextClock } from "Utils/PageUtils/ClockUtil";
import { DateClass } from "Types/Templates/DateClass";
import { VaccinationStatus } from "Types/UserMeta/VaccinationStatus";
import { VaccineView } from "./UserOverviewPageUtils/VaccineUtil";
import { NucleicAcidView } from "./UserOverviewPageUtils/NucleicAcidUtil";
import { PlanTraceList } from "./UserOverviewPageUtils/PlanTraceListUtil";
import { HealthCode } from "./UserOverviewPageUtils/HealthCodeUtil";
import { UserInformation } from "Types/UserInformation";
import { UserId } from "Types/UserMeta/UserId";
import { UserRiskLevel } from "Types/UserMeta/UserRiskLevel";
import { HeaderTemplate } from "Utils/PageUtils/HeaderUtil";
import { UserGetInfoMessage } from "Messages/UserMessages/UserGetInfoMessage";
import { clearUserRole } from "Globals/RoleStore";
import { TemperatureView } from "Pages/PageComponents/UserPages/HomePages/OverviewPage/UserOverviewPageUtils/Temperature";
import { Temperature } from "Types/UserMeta/Temperature";

const image = require("Assets/Images/水墨梅.jpeg");

export function UserOverviewPage({ navigation }: any) {
  const { token } = TokenStore();

  //refreshing
  const [traceHistory, setTraceHistory] = useState(Array<Trace>());
  const [info, setInfo] = useState(
    new UserInformation(
      new UserId(0),
      new DateClass(0),
      VaccinationStatus.none,
      UserRiskLevel.popUps,
      new Temperature(36.6)
    )
  );
  const refresh = () => {
    SendData(
      new UserGetTraceMessage(
        token,
        new Date().getTime() - DAY_MILLIS,
        new Date().getTime()
      ),
      (reply: Trace[]) => {
        setTraceHistory(reply);
      }
    );
    SendData(new UserGetInfoMessage(token), (reply: UserInformation) => {
      setInfo(reply);
    });
  };
  useFocusEffect(React.useCallback(refresh, []));

  //go back
  const goBack = () => {
    navigation.navigate("Start.Login");
    clearUserToken();
    clearUserRole();
  };

  return (
    <ScreenTemplate goBack={goBack} background_image={image}>
      <ViewSwitcher state={"User.Overview"} navigation={navigation} />
      <ScrollTemplate>
        <View style={{ height: SCREEN_WIDTH * 0.03 }} />
        <View
          style={{
            width: SCREEN_WIDTH,
            height: SCREEN_WIDTH * 0.18,
            alignItems: "center",
            justifyContent: "flex-end" /*backgroundColor: '#f0f'/**/,
          }}
        >
          {/*头部钟*/}
          <Card style={{ width: "95%", height: "90%", alignItems: "center" }}>
            <TextClock />
          </Card>
        </View>
        <View
          style={{
            width: SCREEN_WIDTH,
            height: SCREEN_WIDTH,
            alignItems: "center",
            justifyContent: "center" /*backgroundColor: '#f0f'/**/,
          }}
        >
          <Card style={{ width: "95%", height: "95%", alignItems: "center" }}>
            <View style={{ height: SCREEN_WIDTH * 0.025 }} />
            {/*健康码*/}
            <HealthCode userInfo={info} />
          </Card>
        </View>
        <View
          style={{
            width: SCREEN_WIDTH,
            height: SCREEN_WIDTH * 0.55,
            flexDirection: "row" /*backgroundColor: '#00f'/**/,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center" /*backgroundColor: '#008'/**/,
            }}
          >
            {/*核酸疫苗*/}
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <VaccineView vaccinationStatus={info.vaccinationStatus} />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <NucleicAcidView
                recentNucleicTestTime={info.recentNucleicTestTime}
              />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TemperatureView temperature={info.temperature} />
            </View>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center" /*backgroundColor: '#080'*/,
            }}
          >
            <Card
              style={{
                width: "90%",
                height: "90%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/*行程数据*/}
              <TextTemplate>14天内行程记录</TextTemplate>
              <PlanTraceList token={token} trace={traceHistory} />
            </Card>
          </View>
        </View>
        <View
          style={{
            width: SCREEN_WIDTH,
            alignItems: "center",
            justifyContent: "center" /*backgroundColor: '#f0f'/**/,
          }}
        >
          {/*其他微服务*/}
          <HeaderTemplate text="其他微服务" />

          <ButtonTemplate
            onPress={() => {
              navigation.navigate("User.Temperature");
            }}
            text="上传体温"
          />

          <ButtonTemplate
            icon="account"
            onPress={() => {
              navigation.navigate("Account.Overview");
            }}
            text="个人账户"
          />
          <ButtonTemplate
            onPress={() => {
              navigation.navigate("User.Helping");
            }}
            text="助查询"
          />
          <ButtonTemplate
            icon="logout"
            onPress={() => goBack()}
            text="退出登录"
          />
        </View>

        <StatusBar style="auto" />
      </ScrollTemplate>
    </ScreenTemplate>
  );
}
