import React from 'react'
import {INNER_WIDTH, styles} from 'Utils/Styles'
import {TextInput, View} from 'react-native'

const setting ={
    text: {
        fontSize: 20,
        fontFamily: 'Arial'
    },
    view: {
        height: 30,
        width: INNER_WIDTH
    }
}
export function TextInputTemplate(props: any) {
    //const styles_size = {width: 180}
    //const style = Object.assign({}, styles_size, styles.text)
    //const styledProps: any = Object.assign({}, props, {style: style})
    return (<View style={setting.view}>
        {React.createElement(TextInput, {...props, style: setting.text}, null)}
    </View>)
}