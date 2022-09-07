import { Text } from "react-native-paper";
import React from "react";
import { View } from "react-native";

const setting = {
  text: {
    fontSize: 20,
    fontFamily: "Arial",
  },
  large: {
    fontSize: 30,
    fontFamily: "Arial",
  },
  view: {
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
};

export function TextTemplate(props: any) {
  return (
    //@ts-ignore
    <View style={setting.view}>
      <Text style={setting.text}>{props.children}</Text>
    </View>
  );
}

export function LargeTextTemplate(props: any) {
  return (
    //@ts-ignore
    <View style={setting.view}>
      <Text style={setting.large}>{props.children}</Text>
    </View>
  );
}
