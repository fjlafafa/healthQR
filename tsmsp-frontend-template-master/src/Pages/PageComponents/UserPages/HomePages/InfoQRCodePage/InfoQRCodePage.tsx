import React, { useState } from "react";
import { ViewSwitcher } from "../HomePagesUtils/BarUtil";
import { Text, View } from "react-native";
import { Card } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import { TokenStore } from "Globals/TokenStore";
import { UserGetRealNameMessage } from "Messages/UserMessages/UserGetRealNameMessage";
import { SCREEN_WIDTH } from "Utils/SettingsAndConstants";
import {
  ScreenTemplate,
  ScrollTemplate,
} from "Utils/PageUtils/PageContainerUtil";
import { HeaderTemplate } from "Utils/PageUtils/HeaderUtil";
import { TextTemplate } from "Utils/PageUtils/TextUtil";
import { RegisterCode } from "Utils/PageUtils/InfoQRCodeUtil";
import { ButtonTemplate } from "Utils/PageUtils/ButtonUtil";
import { SendData } from "Utils/SendDataUtil";
import { RealName } from "Types/UserMeta/RealName";
import { Token } from "Types/UserMeta/Token";
import { UserInformation } from "Types/UserInformation";
import { UserId } from "Types/UserMeta/UserId";
import { DateClass } from "Types/Templates/DateClass";
import { VaccinationStatus } from "Types/UserMeta/VaccinationStatus";
import { UserRiskLevel } from "Types/UserMeta/UserRiskLevel";
import { Temperature } from "Types/UserMeta/Temperature";
import { UserGetInfoMessage } from "Messages/UserMessages/UserGetInfoMessage";
import { VaccineView } from "Pages/PageComponents/UserPages/HomePages/OverviewPage/UserOverviewPageUtils/VaccineUtil";
import { NucleicAcidView } from "Pages/PageComponents/UserPages/HomePages/OverviewPage/UserOverviewPageUtils/NucleicAcidUtil";
import { LargeNucleicAcidView } from "Pages/PageComponents/UserPages/HomePages/InfoQRCodePage/InfoQRUtils/NucleicAcidUtil";
import { LargeVaccineView } from "Pages/PageComponents/UserPages/HomePages/InfoQRCodePage/InfoQRUtils/VaccineUtil";

export function InfoQRCodePage({ navigation }: any) {
  const { token } = TokenStore();

  const [realName, setRealName] = useState(new RealName(""));
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
    SendData(new UserGetRealNameMessage(token), (reply: RealName) => {
      setRealName(reply);
    });
    SendData(new UserGetInfoMessage(token), (reply: UserInformation) => {
      setInfo(reply);
    });
  };
  useFocusEffect(React.useCallback(refresh, []));

  const goBack = () => navigation.navigate("User.Overview");
  return (
    <ScreenTemplate goBack={goBack}>
      <ViewSwitcher state={"User.InfoQRCodePage"} navigation={navigation} />
      <ScrollTemplate>
        <View style={{ height: SCREEN_WIDTH * 0.025 }} />
        <View
          style={{
            width: SCREEN_WIDTH,
            height: SCREEN_WIDTH * 1.1,
            alignItems: "center",
            justifyContent: "center" /*backgroundColor: '#f0f'/**/,
          }}
        >
          <Card
            style={{
              width: "95%",
              height: "95%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={{ height: SCREEN_WIDTH * 0.025 }} />
            {/*核酸登记码*/}
            <View
              style={{
                height: SCREEN_WIDTH * 0.9,
                width: SCREEN_WIDTH * 0.95,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <RegisterCode userInfo={{ realName: realName, token: token }} />
            </View>
            <View style={{ height: "2%" }} />
            <TextTemplate>出示此码登记核酸检测/疫苗注射信息</TextTemplate>
          </Card>
        </View>
        <View
          style={{
            width: SCREEN_WIDTH,
            height: SCREEN_WIDTH * 0.3,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            /*backgroundColor: '#f0f'/**/
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              /*backgroundColor: '#f0f'/**/
            }}
          >
            <LargeVaccineView vaccinationStatus={info.vaccinationStatus} />
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              /*backgroundColor: '#f0f'/**/
            }}
          >
            <LargeNucleicAcidView
              recentNucleicTestTime={info.recentNucleicTestTime}
            />
          </View>
        </View>
      </ScrollTemplate>
    </ScreenTemplate>
  );
}
