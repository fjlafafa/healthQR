import {View, Text} from "react-native";
import {SCREEN_WIDTH, styles} from "../../../../../Utils/Styles";
import {Button} from "react-native-paper";

const barHeight = 45

function Barbutton({chosen,text,onPress}:any){
    if (chosen) {
        return <View style={{flex: 1, backgroundColor: styles.pressColor}}>
            <View style={{flex: 5}}>
            <Button mode='text' compact={true}>
                <Text>{text}</Text>
            </Button>
            </View>
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
        <Barbutton chosen={state=='RegisterQRCode'} text='核酸疫苗码' onPress={()=>navigation.navigate('RegisterQRCode')}/>
    </View>
}