import React from "react";
import { INNER_WIDTH, settingsAndConstants } from "../SettingsAndConstants";
import { View } from "react-native";
import { Text, TextInput } from "react-native-paper";

const setting = {
  textBox: {
    fontSize: 20,
    height: 30,
    width: INNER_WIDTH,
    fontFamily: "Arial",
    backgroundColor: settingsAndConstants.bgColor,
  },
  view: {
    height: 50,
    width: INNER_WIDTH,
    //backgroundColor:'#ff0',
  },
  large: {
    fontSize: 30,
    fontFamily: "Arial",
  },
};

export function TextInputTemplate(props: any) {
  return (
    <View style={setting.view}>
      {React.createElement(
        TextInput,
        {
          ...props,
          mode: "outlined",
          style: setting.textBox,
        },
        null
      )}
    </View>
  );
}

export function LargeTextInputTemplate(props: any) {
  //@ts-ignore
  return (
    <View style={setting.view}>
      <Text style={setting.large}>{props.children}</Text>
    </View>
  );
}
