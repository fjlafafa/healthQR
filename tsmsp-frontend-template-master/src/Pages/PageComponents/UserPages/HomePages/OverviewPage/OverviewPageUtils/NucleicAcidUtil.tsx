import {VaccinationStatus} from "Types/UserMeta/VaccinationStatus";
import {View} from "react-native";
import React from "react";
import {DateClass} from "../../../../../../Types/Templates/DateClass";
import {DAY_MILLIS, SCREEN_WIDTH} from 'Utils/Styles'
import { Card, Text } from "react-native-paper";

interface NucleicAcidInfo {
    recentNucleicTestTime: DateClass
}
const setting={
    text:{
        fontSize:SCREEN_WIDTH*0.03,
        color:'#fff'
    }
}

export function NucleicAcidView (props: NucleicAcidInfo) {
    const millis=new Date().getTime()-props.recentNucleicTestTime.millis
    const nucleicAcidColor=(
        millis<3*DAY_MILLIS?'goldenrod':(
            millis<10*DAY_MILLIS?'forestgreen':'grey'
        )
    )

    const nucleicAcidTime=Math.floor(millis/DAY_MILLIS)

    return <Card style={{width:'90%',height:'80%', justifyContent: 'center', backgroundColor:nucleicAcidColor}}>
        <Card.Content> <Text style={setting.text}>核酸检测结果</Text></Card.Content>
        <Card.Content> <Text style={setting.text}>距离上次核酸检测 {nucleicAcidTime} 天</Text></Card.Content>
    </Card>
}