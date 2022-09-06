import {Trace} from "Types/Trace";
import {Place} from "Types/Place";
import {DataTable} from 'react-native-paper'
import {mapRiskToCharacter, PlaceRiskLevel} from "Types/PlaceMeta/PlaceRiskLevel";
import React, {useEffect, useState} from "react";
import {Province} from "Types/PlaceMeta/Province";
import {City} from "Types/PlaceMeta/City";
import {SubDistrict} from "Types/PlaceMeta/SubDistrict";
import {District} from "Types/PlaceMeta/District";
import {PlaceId} from "Types/PlaceMeta/PlaceId";
import {SendData} from "../SendDataUtil";
import {UserGetPlaceMessage} from "Messages/UserMessages/UserGetPlaceMessage";
import {View} from "react-native";
import {Token} from "Types/UserMeta/Token";
import {SCREEN_WIDTH} from "Utils/SettingsAndConstants";

function DataRow(props: {place: Place}) {
    return <DataTable.Row>
        <DataTable.Cell>{mapRiskToCharacter(props.place.riskLevel)}</DataTable.Cell>
        <DataTable.Cell numeric>{props.place.province.name}</DataTable.Cell>
        <DataTable.Cell numeric>{props.place.city.name}</DataTable.Cell>
        <DataTable.Cell numeric>{props.place.district.name}</DataTable.Cell>
        <DataTable.Cell numeric>{props.place.subDistrict.name}</DataTable.Cell>
    </DataTable.Row>
}

class ListItem extends React.Component<any, any> {
    render() {
        return <DataRow place={this.props.place}/>
    }
}

export function TraceTable(props: { token: Token, traceList: Array<Trace> }) {
    const [placeData, setPlaceData] = useState(Array<Place>())
    const placesId=props.traceList.map((trace:Trace)=>trace.visitPlaceId)

    useEffect(()=>{
        SendData(
            new UserGetPlaceMessage(props.token, placesId),
            (reply: Place[]) => setPlaceData(reply))},[props.traceList])

    const dataItem = placeData.map((place:Place) => {
        return <ListItem key={place.id.id} place={place}/>
    })
    return <View style={{width: SCREEN_WIDTH}}><DataTable>
        <DataTable.Header>
            <DataTable.Title sortDirection='descending'>
                风险
            </DataTable.Title>
            <DataTable.Title numeric>省</DataTable.Title>
            <DataTable.Title numeric>市</DataTable.Title>
            <DataTable.Title numeric>区</DataTable.Title>
            <DataTable.Title numeric>街道</DataTable.Title>
        </DataTable.Header>
        {dataItem}
    </DataTable></View>

}