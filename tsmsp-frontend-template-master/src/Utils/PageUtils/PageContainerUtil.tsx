import {SCREEN_HEIGHT, SCREEN_WIDTH, styles} from "Utils/Styles";
import {ScrollView, View} from "react-native";
import React from "react";
import {Provider} from "react-native-paper";

const setting = {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: SCREEN_HEIGHT,
        /*backgroundColor : '#ff0'/**/
    }
}
export function PageContainerTemplate(props: any) {
    return (<ScrollView><Provider>
        {React.createElement(View, {...props, style: setting.container},)}
    </Provider></ScrollView>)
}