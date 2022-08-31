import {SCREEN_HEIGHT, SCREEN_WIDTH, styles} from 'Utils/Styles'
import {ScrollView, View} from 'react-native'
import React from 'react'
import {Appbar, Provider} from 'react-native-paper'
import {TextTemplate} from "./TextUtil";
import {backdropClasses} from "@mui/material";

const setting = {
    screen: {
        alignItems: 'center',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        backgroundColor: '#f0f0f0'/*This color may be necessary*/
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        /*backgroundColor : '#ff0'/**/
    }
}

export function ScreenTemplate(props: any) {
    const safeAreaHeight = 20

    return (
        /*@ts-ignore*/
        <View style={setting.screen}>
            <View style={{height: safeAreaHeight, /*backgroundColor: '#0f0'/**/}}/>
            {React.createElement(View, {...props, style: setting.container})}
        </View>
    )
}

//一定会渲染到屏幕外的话拿这个包一下
export function ScrollTemplate(props: any) {
    //@ts-ignore
    return (
        <ScrollView style={{/*backgroundColor: '#f00'/**/}} centerContent={true} bounces={true}>
            {React.createElement(View, {...props, style: setting.container})}
        </ScrollView>
    )
}
