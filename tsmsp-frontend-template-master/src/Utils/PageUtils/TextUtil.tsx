import {Text} from "react-native";
import {styles} from "../Styles";
import React from "react";

export function TextTemplate(props: any) {
    return <Text style={styles.text}>{props.children}</Text>
}