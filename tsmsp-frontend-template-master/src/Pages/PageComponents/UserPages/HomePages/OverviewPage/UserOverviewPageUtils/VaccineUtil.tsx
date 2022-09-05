import {VaccinationStatus} from "Types/UserMeta/VaccinationStatus";
import React from "react";
import {SCREEN_WIDTH} from 'Utils/SettingsAndConstants'
import {Card, Text} from "react-native-paper";

const setting = {
    text: {
        fontSize: SCREEN_WIDTH * 0.03,
        color: '#fff'
    }
}

export function VaccineView(props: { vaccinationStatus: VaccinationStatus }) {
    const vaccineColor = (
        props.vaccinationStatus === VaccinationStatus.triple ? 'goldenrod' : (
            props.vaccinationStatus === VaccinationStatus.none ? 'grey' : 'forestgreen'
        )
    )
    const vaccineNumber = (
        props.vaccinationStatus === VaccinationStatus.triple ? 3 : (
            props.vaccinationStatus === VaccinationStatus.dual ? 2 : (
                props.vaccinationStatus === VaccinationStatus.single ? 1 : 0
            )
        )
    )

    return <Card style={{width: '90%', height: '80%', justifyContent: 'center', backgroundColor: vaccineColor}}>
        <Card.Content><Text style={setting.text}>疫苗接种情况</Text></Card.Content>
        <Card.Content><Text style={setting.text}>已接种 {vaccineNumber} 针疫苗</Text></Card.Content>
    </Card>
}