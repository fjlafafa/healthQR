import {VaccinationStatus} from "Types/UserMeta/VaccinationStatus";
import {View} from "react-native";
import React from "react";
import {DateClass} from "../../../../../../Types/Templates/DateClass";
import {DAY_MILLIS, SCREEN_WIDTH} from 'Utils/Styles'
import { Card, Text } from "react-native-paper";

interface VaccineInfo {
    vaccinationStatus: VaccinationStatus
}
const setting={
    text:{
        fontSize:SCREEN_WIDTH*0.03,
        color:'#fff'
    }
}

export function VaccineView (props: VaccineInfo) {
    const vaccineColor=(
        props.vaccinationStatus===VaccinationStatus.triple?'goldenrod':(
            props.vaccinationStatus===VaccinationStatus.none?'grey':'forestgreen'
        )
    )
    const vaccineNumber=(
        props.vaccinationStatus===VaccinationStatus.triple?3:(
            props.vaccinationStatus===VaccinationStatus.dual?2:(
                props.vaccinationStatus===VaccinationStatus.single?1:0
            )
        )
    )

    return <Card style={{width:'90%',height:'80%', justifyContent: 'center',backgroundColor:vaccineColor}}>
        <Card.Content><Text style={setting.text}>疫苗接种情况</Text></Card.Content>
        <Card.Content><Text style={setting.text}>已接种 {vaccineNumber} 针疫苗</Text></Card.Content>
    </Card>
}