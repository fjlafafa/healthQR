import {SCREEN_HEIGHT, SCREEN_WIDTH, styles} from 'Utils/Styles'
import {ScrollView, View} from 'react-native'
import React from 'react'
import {Provider} from 'react-native-paper'
import {TextTemplate} from "./TextUtil";

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
        <View style={{height: 50}}>
            <TextTemplate>这是还没实现的标题</TextTemplate>
        </View>
        {React.createElement(View, {...props, style: setting.container},)}
    </Provider></ScrollView>)
}