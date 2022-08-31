import {View} from "react-native";
import {SCREEN_WIDTH} from "../../../../Utils/Styles";

const barHeight = 40
export function ViewSwitcher({navigation}:any) {
    return <View style={{width: SCREEN_WIDTH, height: barHeight, flexDirection:'row'}}>
        <View style={{flex: 1, backgroundColor: '#f00'}}/>
        <View style={{flex: 1, backgroundColor: '#0f0'}}/>
        <View style={{flex: 1, backgroundColor: '#00f'}}/>
    </View>
}