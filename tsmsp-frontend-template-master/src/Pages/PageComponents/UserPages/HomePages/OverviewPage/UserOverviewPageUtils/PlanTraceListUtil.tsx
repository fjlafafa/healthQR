import {Place} from "Types/Place";
import {evaluateRisk, mapRiskToColor, PlaceRiskLevel} from "Types/PlaceMeta/PlaceRiskLevel";
import {ScrollView, Text} from "react-native";
import {Trace} from "Types/Trace";
import React, {useEffect, useState} from "react";
import {PlaceId} from "Types/PlaceMeta/PlaceId";
import {Province} from "Types/PlaceMeta/Province";
import {City} from "Types/PlaceMeta/City";
import {District} from "Types/PlaceMeta/District";
import {SubDistrict} from "Types/PlaceMeta/SubDistrict";
import {SendData} from "Utils/SendDataUtil";
import {UserGetPlaceMessage} from "Messages/UserMessages/UserGetPlaceMessage";
import {Token} from "Types/UserMeta/Token";

class ListItem extends React.Component<any, any> {
    render() {
        return <Text
            style={{color: mapRiskToColor(this.props.place.riskLevel)}}>{this.props.place.province.name} {this.props.place.city.name} {this.props.place.district.name}</Text>
    }
}
export function PlanTraceList(props: { token:Token,trace:Array<Trace> }) {
    const [places,setPlaces]=useState(Array<Place>())
    const placesId=props.trace.map((trace:Trace)=>trace.visitPlaceId)
    useEffect(()=>{
        SendData(new UserGetPlaceMessage(props.token,placesId),
            (replyMessage:Place[])=>setPlaces(replyMessage))},
        [props.trace])
    const sortedPlaces=places.sort((a:Place,b:Place)=>{
        if(evaluateRisk(a.riskLevel)>evaluateRisk(b.riskLevel)) return -1
        if(evaluateRisk(a.riskLevel)==evaluateRisk(b.riskLevel)) return 0
        if(evaluateRisk(a.riskLevel)<evaluateRisk(b.riskLevel)) return 1
        return 0
    })

    return <ScrollView style={{flex: 1}}>
        {sortedPlaces.map((a: Place) => <ListItem key={a.id.id} place={a}/>)}
    </ScrollView>
}