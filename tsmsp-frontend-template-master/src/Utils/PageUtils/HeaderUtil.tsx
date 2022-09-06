import { View } from "react-native";
import { Divider, Text } from "react-native-paper";

export function HeaderTemplate(props: { text?: string }) {
  return (
    <View style={{ width: "100%" }}>
      <Text variant="titleMedium">{"      " + props.text}</Text>
      <Divider />
    </View>
  );
}
