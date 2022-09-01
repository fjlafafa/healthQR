import React from 'react'
import {View} from "react-native";
import {SCREEN_WIDTH} from "../Styles";

export function SmallSpace() {
    //const styles_size = {width: 180}
    //const style = Object.assign({}, styles_size, styles.text)
    //const styledProps: any = Object.assign({}, props, {style: style})
    return (<View style={{height: SCREEN_WIDTH * 0.03}}/>)
}