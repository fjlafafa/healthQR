import {Text} from "react-native-paper";
import {styles} from "Utils/Styles";
import React from "react";
import {View} from "react-native";

const setting = {
    text:{
        fontSize: 20,
        fontFamily: "Arial"
    },
    view:{
        height: 50
    }
}
export function TextTemplate(props: any) {
    return <View style ={setting.view}>
        <Text style={setting.text}>{props.children}</Text>
    </View>
}