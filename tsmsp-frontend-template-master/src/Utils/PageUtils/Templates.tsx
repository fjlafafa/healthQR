import React from "react";
import {styles} from "../Styles";
import {Text} from "react-native"

export class TextTemplates extends React.Component<any, any> {
    render() {
        return <Text style={styles.text}>{this.props.children}</Text>
    }
}

//export class TextInput