import React from "react";
import { View } from "react-native";
import { SCREEN_WIDTH } from "../SettingsAndConstants";

export function SmallSpace() {
  return <View style={{ height: SCREEN_WIDTH * 0.03 }} />;
}
