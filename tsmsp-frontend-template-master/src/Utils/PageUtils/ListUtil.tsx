import React from "react";
import {FlatList, View} from "react-native";

const setting = {

    view:{
        height:60,
        width:180
    }
}
export function BoundedTraceList(props:any) {
    return <View style={setting.view}>
        {React.createElement(FlatList, props,)}
    </View>
}