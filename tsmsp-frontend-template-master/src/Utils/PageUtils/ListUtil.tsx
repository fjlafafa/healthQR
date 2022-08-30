import React from "react";
import {FlatList, View} from "react-native";
import {INNER_WIDTH} from "../Styles";

const setting = {

    view:{
        height:60,
        width:INNER_WIDTH
    }
}
export function BoundedTraceList(props:any) {
    return <View style={setting.view}>
        {React.createElement(FlatList, props,)}
    </View>
}