import React from "react";
import {styles} from "Utils/Styles";
import {TextInput, View} from "react-native"


export function TextInputTemplate(props: any) {
    const styles_view = {height: 30}
    //const styles_size = {width: 180}
    //const style = Object.assign({}, styles_size, styles.text);
    //const styledProps: any = Object.assign({}, props, {style: style});
    const styledProps: any = Object.assign({}, props, {style: styles.text});
    return (<View style={styles_view}>
        {React.createElement(TextInput, styledProps, null)}
    </View>)
}