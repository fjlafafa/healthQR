import React from "react";
import { Button } from "react-native-paper";
import { Text, View } from "react-native";
import { INNER_WIDTH } from "Utils/SettingsAndConstants";

const setting = {
  view: {
    height: 60,
    width: INNER_WIDTH,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
};

interface subProps {
  name: string;
  onPress: () => void;
  key?: any;
  disabled?: boolean;
}

interface P {
  chosen: string | null;
  subprops: Array<subProps>;
}

function SubButton(props: subProps) {
  return (
    <Button
      mode="outlined"
      disabled={props.disabled}
      onPress={() => props.onPress()}
    >
      <Text>{props.name}</Text>
    </Button>
  );
}

export class ButtonGroup extends React.Component<P, any> {
  constructor(props: P) {
    super(props);
    this.state = {
      pressed: this.props.chosen as string | null,
    };
  }

  render() {
    const buttonList = this.props.subprops.map((props: subProps) => {
      return (
        <SubButton
          key={props.name}
          name={props.name}
          disabled={props.name == this.state.pressed}
          onPress={() => {
            props.onPress();
            this.setState({ pressed: props.name });
          }}
        />
      );
    });

    //@ts-ignore
    return <View style={setting.view}>{buttonList}</View>;
  }
}
