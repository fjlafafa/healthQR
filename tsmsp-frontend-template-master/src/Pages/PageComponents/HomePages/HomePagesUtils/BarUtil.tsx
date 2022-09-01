import {View} from "react-native";
import {SCREEN_WIDTH, styles} from "../../../../Utils/Styles";
import {Button, Text} from "react-native-paper";
import {PagesID} from "../../../PagesID";

const barHeight = 40

function Barbutton({chosen,text,onPress}:any){
    if (chosen) {
        return <View style={{flex: 1, backgroundColor: styles.pressColor}}>
            <Button mode='text'>
                <Text style={{flex: 5}}>{text}</Text>
                <View style={{flex: 1, backgroundColor: styles.themeColor}}/>
            </Button>
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
        <Barbutton chosen={state==PagesID.Overview} text='健康码主页' onPress={navigation.navigate(PagesID.Overview)}/>
        <Barbutton chosen={state==PagesID.Overview} text='地点扫码' onPress={navigation.navigate(PagesID.Overview)}/>
        <Barbutton chosen={state==PagesID.Overview} text='核酸等级码' onPress={navigation.navigate(PagesID.Overview)}/>
    </View>
}