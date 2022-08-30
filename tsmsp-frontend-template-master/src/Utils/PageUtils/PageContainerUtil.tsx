import {styles} from "Utils/Styles";
import {View} from "react-native";
import React from "react";
import {Provider} from "react-native-paper";

const setting = {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
}
export function PageContainerTemplate(props: any) {
    return (<Provider>
        {React.createElement(View, {...props, style: setting.container},)}
    </Provider>)
}