import React from "react";
import {FlatList, View} from "react-native";

export function BoundedTraceList(props:any) {
    const boundStyle = {height:60, width:180};
    return <View style={boundStyle}>
        {React.createElement(FlatList, props,)}
    </View>
}