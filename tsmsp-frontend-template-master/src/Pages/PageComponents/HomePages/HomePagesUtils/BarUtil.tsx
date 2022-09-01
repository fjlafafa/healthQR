import {View} from "react-native";
import {SCREEN_WIDTH} from "../../../../Utils/Styles";
import {Button} from "react-native-paper";

const barHeight = 40
export function ViewSwitcher({navigation}:any) {
    return <View style={{width: SCREEN_WIDTH, height: barHeight, flexDirection:'row'}}>
        <View style={{flex: 1, backgroundColor: '#f00'}}>
            <Button mode='text'>健康码</Button>
        </View>
        <View style={{flex: 1, backgroundColor: '#0f0'}}>
        </View>
        <View style={{flex: 1, backgroundColor: '#00f'}}>
        </View>
    </View>
}