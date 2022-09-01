import {Text} from 'react-native-paper'
import {styles} from 'Utils/Styles'
import React from 'react'
import {View} from 'react-native'

const setting = {
    text:{
        fontSize: 20,
        fontFamily: 'Arial'
    },
    large:{
        fontSize: 30,
        fontFamily: 'Arial'
    },
    view:{
        height: 50,
        alignItems: 'center'
    }

}
export function TextTemplate(props: any) {
    //@ts-ignore
    return <View style ={setting.view}>
        <Text style={setting.text}>{props.children}</Text>
    </View>
}

export function LargeTextTemplate(props: any) {
    //@ts-ignore
    return <View style ={setting.view}>
        <Text style={setting.large}>{props.children}</Text>
    </View>
}