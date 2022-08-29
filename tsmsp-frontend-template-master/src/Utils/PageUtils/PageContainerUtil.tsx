import {styles} from "Utils/Styles";
import {View} from "react-native";
import React from "react";

export function PageContainerTemplate(props: any) {
    return React.createElement(View, {...props, style: styles.container},)
}