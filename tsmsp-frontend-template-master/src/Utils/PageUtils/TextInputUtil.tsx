import React from 'react'
import {INNER_WIDTH, styles} from 'Utils/Styles'
import {TextInput, View} from 'react-native'
import {Text} from "react-native-paper";

const setting ={
    text: {
        fontSize: 20,
        fontFamily: 'Arial'
    },
    view: {
        height: 30,
        width: INNER_WIDTH
    },
    large:{
        fontSize: 30,
        fontFamily: 'Arial'
    },
}
export function TextInputTemplate(props: any) {
    //const styles_size = {width: 180}
    //const style = Object.assign({}, styles_size, styles.text)
    //const styledProps: any = Object.assign({}, props, {style: style})
    return (<View style={setting.view}>
        {React.createElement(TextInput, {...props, style: setting.text}, null)}
    </View>)
}

export function LargeTextInputTemplate(props: any) {
    //@ts-ignore
    return <View style ={setting.view}>
        <Text style={setting.large}>{props.children}</Text>
    </View>
}