import {View, Text} from "react-native";
import {SCREEN_WIDTH, styles} from "../../../../Utils/Styles";
import {Button} from "react-native-paper";

const barHeight = 40

function Barbutton({chosen,text,onPress}:any){
    if (chosen) {
        return <View style={{flex: 1, backgroundColor: styles.pressColor}}>
            <Button mode='text' compact={true} style={{flex: 5}}>
                <Text>{text}</Text>
            </Button>
            <View style={{flex: 1, backgroundColor: styles.themeColor}}/>
        </View>
    } else {
        return <View style={{flex: 1, backgroundColor: styles.barColor}}>
            <Button mode='text' onPress={()=>onPress()}>
                <Text>{text}</Text>
            </Button>
        </View>
    }
}
export function ViewSwitcher({state, navigation}:any) {
    return <View style={{width: SCREEN_WIDTH, height: barHeight, flexDirection:'row'}}>
        <Barbutton chosen={state=='Overview'} text='健康码主页' onPress={()=>navigation.navigate('Overview')}/>
        <Barbutton chosen={state=='ScanQRCode'} text='地点扫码' onPress={()=>navigation.navigate('ScanQRCode')}/>
        <Barbutton chosen={state=='Overview'} text='核酸等级码' onPress={()=>navigation.navigate('Overview')}/>
    </View>
}