import React, {useState} from "react";
import {ButtonToSendMessage,} from "Utils/PageUtils/ButtonUtil";
import {TextInputTemplate} from "Utils/PageUtils/TextInputUtil";
import {ScreenTemplate} from "Utils/PageUtils/PageContainerUtil";
import {ScrollView, View} from "react-native";
import {SCREEN_WIDTH} from "Utils/SettingsAndConstants";
import QRCode from "react-native-qrcode-svg";
import {Card} from "react-native-paper";
import {TextTemplate} from "Utils/PageUtils/TextUtil";
import {PlaceId} from "Types/PlaceMeta/PlaceId";
import {UserGetPlaceMessage} from "Messages/UserMessages/UserGetPlaceMessage";
import {TokenStore} from "Globals/TokenStore";
import {Place} from "Types/Place";
import {Province} from "Types/PlaceMeta/Province";
import {PlaceRiskLevel} from "Types/PlaceMeta/PlaceRiskLevel";
import {City} from "Types/PlaceMeta/City";
import {District} from "Types/PlaceMeta/District";
import {SubDistrict} from "Types/PlaceMeta/SubDistrict";

//import Select from 'react-select'

export function GeneratePlaceQRPage({ navigation }: any) {
  //const values
  const [placeId, setPlaceId] = useState(new PlaceId(NaN));
  const [placeIdShowed, setPlaceIdShowed] = useState(new PlaceId(NaN));
  const [placeShowed, setPlaceShowed] = useState(
    new Place(
      new PlaceId(NaN),
      new Province(""),
      new City(""),
      new District(""),
      new SubDistrict(""),
      PlaceRiskLevel.red
    )
  );
  const avatar = require("Assets/Images/钥匙盾.jpeg");

  const goBack = () => navigation.navigate("Admin.Overview");
  const { token } = TokenStore();

  return (
    <ScreenTemplate goBack={goBack}>
      <ScrollView>
        {/*ts-ignore*/}
        <View
          style={{
            width: SCREEN_WIDTH,
            height: SCREEN_WIDTH * 0.3,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: SCREEN_WIDTH,
              height: SCREEN_WIDTH * 0.15,
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Card style={{ width: "95%", height: "80%", alignItems: "center" }}>
              <View style={{ height: "20%" }} />

              <TextTemplate> 请输入地点代码以查询二维码 </TextTemplate>
            </Card>
          </View>
          <View
            style={{
              width: SCREEN_WIDTH,
              height: SCREEN_WIDTH * 0.15,
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Card style={{ width: "95%", height: "80%", alignItems: "center" }}>
              <TextInputTemplate
                placeholder={"地点代码"}
                value={isNaN(placeId.id) ? "" : placeId.id}
                onChangeText={(newText: string) => {
                  try {
                    setPlaceId(new PlaceId(parseInt(newText)));
                  } catch (e) {
                    alert("请输入合法字符");
                  }
                }}
              />
            </Card>
          </View>
        </View>

        <View
          style={{
            width: SCREEN_WIDTH,
            height: SCREEN_WIDTH,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Card style={{ width: "95%", height: "95%", alignItems: "center" }}>
            <View style={{ height: SCREEN_WIDTH * 0.075 }} />

            <QRCode
              value={JSON.stringify(placeIdShowed)}
              logo={avatar}
              backgroundColor={"#ffffff"}
              size={SCREEN_WIDTH * 0.8}
              color={"#66d398"}
            />
          </Card>
        </View>
        <ButtonToSendMessage
          text={"查验并生成地点码"}
          toSendMessage={new UserGetPlaceMessage(token, new Array(placeId))}
          ifSuccess={(place: Place[]) => {
            setPlaceIdShowed(place[0].id);
            setPlaceShowed(place[0]);
          }}
        />

        <View
          style={{
            width: SCREEN_WIDTH,
            height: SCREEN_WIDTH * 0.3,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextInputTemplate
            disabled={true}
            value={
              placeShowed.province.name +
              placeShowed.city.name +
              placeShowed.district.name +
              placeShowed.subDistrict.name
            }
            label={"地点"}
          />
        </View>
      </ScrollView>
    </ScreenTemplate>
  );
}
