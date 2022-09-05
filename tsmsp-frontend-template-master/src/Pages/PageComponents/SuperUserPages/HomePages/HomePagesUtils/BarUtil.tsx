import {Text, View} from "react-native";
import {Button} from "react-native-paper";
import {SCREEN_WIDTH, settingsAndConstants} from "Utils/SettingsAndConstants";

const barHeight = 45

function Barbutton({chosen, text, onPress}: any) {
    if (chosen) {
        return <View style={{flex: 1, backgroundColor: settingsAndConstants.pressColor}}>
            <View style={{flex: 5}}>
                <Button mode='text' compact={true}>
                    <Text>{text}</Text>
                </Button>
            </View>
            <View style={{flex: 1, backgroundColor: settingsAndConstants.themeColor}}/>
        </View>
    } else {
        return <View style={{flex: 1, backgroundColor: settingsAndConstants.barColor}}>
            <Button mode='text' onPress={() => onPress()}>
                <Text>{text}</Text>
            </Button>
        </View>
    }
}

export function ViewSwitcher({state, navigation}: any) {
    return <View style={{width: SCREEN_WIDTH, height: barHeight, flexDirection: 'row'}}>
        <Barbutton chosen={state == 'SuperUser.InfoQRCodePage'} text='信息码'
                   onPress={() => navigation.navigate('SuperUser.InfoQRCodePage')}/>
        <Barbutton chosen={state == 'ThirdParty.Overview'} text='第三方工作'
                   onPress={() => navigation.navigate('ThirdParty.Overview')}/>
        <Barbutton chosen={state == 'Admin.Overview'} text='管理员工作'
                   onPress={() => navigation.navigate('Admin.Overview')}/>
    </View>
}