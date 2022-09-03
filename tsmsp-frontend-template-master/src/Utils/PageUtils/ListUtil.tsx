import React from 'react'
import {FlatList, View} from 'react-native'
import {INNER_WIDTH} from '../SettingsAndConstants'

//To Implement
const setting = {

    view:{
        height:60,
    }
}
export function BoundedTraceList(props:any) {
    return <View style={setting.view}>
        {React.createElement(FlatList, props,)}
    </View>
}