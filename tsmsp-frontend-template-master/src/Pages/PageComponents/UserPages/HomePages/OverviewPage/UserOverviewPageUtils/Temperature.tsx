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

export function TemperatureView(props: { temperature: number }) {
    const temperatureColor = (
        props.temperature < 37 ? '#4ecbae' : 'red'
    )


    return <Card style={{width: '90%', height: '80%', justifyContent: 'center', backgroundColor: temperatureColor}}>
        <Card.Content><Text style={setting.text}>体温情况</Text></Card.Content>
        <Card.Content><Text style={setting.text}>您的体温{props.temperature}太高了</Text></Card.Content>
    </Card>
}