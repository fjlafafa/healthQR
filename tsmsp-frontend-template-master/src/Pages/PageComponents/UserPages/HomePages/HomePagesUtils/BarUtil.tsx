import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { SCREEN_WIDTH, settingsAndConstants } from "Utils/SettingsAndConstants";

const barHeight = 45;

function Barbutton({ chosen, text, onPress }: any) {
  if (chosen) {
    return (
      <View
        style={{ flex: 1, backgroundColor: settingsAndConstants.pressColor }}
      >
        <View style={{ flex: 5 }}>
          <Button mode="text" compact={true}>
            <Text>{text}</Text>
          </Button>
        </View>
        <View
          style={{ flex: 1, backgroundColor: settingsAndConstants.themeColor }}
        />
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, backgroundColor: settingsAndConstants.barColor }}>
        <Button mode="text" onPress={() => onPress()}>
          <Text>{text}</Text>
        </Button>
      </View>
    );
  }
}

export function ViewSwitcher({ state, navigation }: any) {
  return (
    <View
      style={{ width: SCREEN_WIDTH, height: barHeight, flexDirection: "row" }}
    >
      <Barbutton
        chosen={state == "User.Overview"}
        text="健康码主页"
        onPress={() => navigation.navigate("User.Overview")}
      />
      <Barbutton
        chosen={state == "User.ScanPlaceQRCode"}
        text="地点扫码"
        onPress={() => navigation.navigate("User.ScanPlaceQRCode")}
      />
      <Barbutton
        chosen={state == "User.InfoQRCodePage"}
        text="核酸疫苗码"
        onPress={() => navigation.navigate("User.InfoQRCodePage")}
      />
    </View>
  );
}
