import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  settingsAndConstants,
} from "../SettingsAndConstants";
import { ImageBackground, ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { Appbar } from "react-native-paper";

const safeAreaHeight: number = 25;
const setting = StyleSheet.create({
  screen: {
    alignItems: "center",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor:
      settingsAndConstants.bgColor /*This color may be necessary*/,
  },
  bar: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 0.12,
    backgroundColor: settingsAndConstants.barColor,
  },
  safeArea: {
    height: safeAreaHeight,
    width: SCREEN_WIDTH,
    backgroundColor: settingsAndConstants.barColor,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    /*backgroundColor : '#ff0'/**/
  },
  image: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "cover",
  },
});

export class ScreenTemplate extends React.Component<any, any> {
  static defaultProps = {
    title: "类型安全宝",
    goBack: () => {},
    atRoot: false,
    background_image: require("Assets/Images/水墨竹.jpg"),
    background_opacity: 0.5,
  };

  render() {
    return (
      /*@ts-ignore*/
      <View style={setting.screen}>
        <ImageBackground
          source={this.props.background_image}
          resizeMode="cover"
          style={setting.image}
          imageStyle={{ opacity: this.props.background_opacity }}
        >
          <View style={setting.safeArea} />
          <Appbar
            style={setting.bar}
            mode={this.props.atRoot ? "center-aligned" : "small"}
          >
            {this.props.atRoot ? null : (
              <Appbar.BackAction onPress={this.props.goBack} />
            )}
            <Appbar.Content title={this.props.title} />
          </Appbar>
          {/*@ts-ignore*/}
          {React.createElement(View, {
            ...this.props,
            style: setting.container,
          })}
        </ImageBackground>
      </View>
    );
  }
}

//一定会渲染到屏幕外的话拿这个包一下
//如果要渲染datatable也拿这个包一下
export function ScrollTemplate(props: any) {
  //@ts-ignore
  return (
    <ScrollView
      style={
        {
          /*backgroundColor: '#f00'/**/
        }
      }
      centerContent={true}
      bounces={true}
    >
      {React.createElement(View, { ...props, style: setting.container })}
    </ScrollView>
  );
}
