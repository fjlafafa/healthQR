import {Text} from "react-native";
import {styles} from "Utils/Styles";
import React from "react";

export function TextTemplate(props: any) {
    return <Text style={styles.text}>{props.children}</Text>
}