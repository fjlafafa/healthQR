import {Text, View} from "react-native";
import {styles} from "Utils/Styles";
import React from "react";

export function TextTemplate(props: any) {
    const style_view = {height: 50}
    return <View style ={style_view}>
        <Text style={styles.text}>{props.children}</Text>
    </View>
}