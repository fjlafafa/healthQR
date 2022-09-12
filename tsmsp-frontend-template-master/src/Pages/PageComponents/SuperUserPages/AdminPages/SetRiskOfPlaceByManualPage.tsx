import { PlaceId } from "Types/PlaceMeta/PlaceId";
import { TokenStore } from "Globals/TokenStore";
import React, { useState } from "react";
import { PlaceRiskLevel } from "Types/PlaceMeta/PlaceRiskLevel";
import { ScreenTemplate } from "Utils/PageUtils/PageContainerUtil";
import { View } from "react-native";
import { TextInputTemplate } from "Utils/PageUtils/TextInputUtil";
import { ButtonToSendMessage } from "Utils/PageUtils/ButtonUtil";
import { GovernorUpdateRiskOfPlaceMessage } from "Messages/AdminMessages/GovernorUpdateRiskOfPlaceMessage";
import { ButtonGroup } from "Utils/PageUtils/ButtonGroupUtil";

export function SetRiskOfPlaceByManualPage({ navigation }: any) {
  const goBack = () => navigation.navigate("Admin.Overview");
  const { token } = TokenStore();
  const [placeId, setPlaceId] = useState(new PlaceId(NaN));
  const [riskLevel, setPlaceRiskLevel] = useState(PlaceRiskLevel.red);

  return (
    <ScreenTemplate goBack={goBack}>
      <View style={{ height: 30 }} />
      <TextInputTemplate
        label="地点码"
        value={isNaN(placeId.id) ? "" : placeId.id.toString()}
        onChangeText={(id: string) => setPlaceId(new PlaceId(parseInt(id)))}
      />

      <ButtonGroup
        chosen={riskLevel.toString()}
        subprops={[
          {
            name: PlaceRiskLevel.green.toString(),
            onPress: () => setPlaceRiskLevel(PlaceRiskLevel.green),
          },
          {
            name: PlaceRiskLevel.yellow.toString(),
            onPress: () => setPlaceRiskLevel(PlaceRiskLevel.yellow),
          },
          {
            name: PlaceRiskLevel.red.toString(),
            onPress: () => setPlaceRiskLevel(PlaceRiskLevel.red),
          },
        ]}
      />
      <ButtonToSendMessage
        icon="upload"
        toSendMessage={
          new GovernorUpdateRiskOfPlaceMessage(token, placeId, riskLevel)
        }
        text="上传"
      />
    </ScreenTemplate>
  );
}
