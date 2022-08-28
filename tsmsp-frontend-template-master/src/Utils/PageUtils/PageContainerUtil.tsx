import {styles} from "../Styles";
import {View} from "react-native";
import React from "react";

export function PageContainerTemplate(props: any) {
    const style = {style: styles.container}
    const styledProps: any = Object.assign({}, props, style);
    return React.createElement(View, styledProps,)
}