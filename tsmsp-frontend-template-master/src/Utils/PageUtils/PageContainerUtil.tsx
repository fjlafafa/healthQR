import {SCREEN_HEIGHT, SCREEN_WIDTH, styles} from 'Utils/Styles'
import {ImageBackground, ScrollView, View} from 'react-native'
import React from 'react'
import {Provider} from 'react-native-paper'
import {TextTemplate} from "./TextUtil";

const setting = {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: SCREEN_WIDTH,
        minHeight: SCREEN_HEIGHT,
        /*backgroundColor : '#ff0'/**/
    }
}
export function PageContainerTemplate(props: any) {
    return (<ScrollView><Provider>
        {React.createElement(View, {...props, style: setting.container},)}
        </Provider></ScrollView>)
}