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

function DataRow(props: { token: string, trace: Trace }) {
    const [data, setPlaceData] = useState<Place>(new Place(new PlaceId(0), new Province(''), new City(''), new District(''), new SubDistrict(''), PlaceRiskLevel.red))
    useEffect(() => {
        SendData(
            new UserGetPlaceMessage(new Token(props.token), new PlaceId(props.trace.visitPlaceId.id)),
            (reply: Place) => {
                setPlaceData(reply)
            }
        )
    }, [])

    return <DataTable.Row>
        <DataTable.Cell>{mapRiskToCharacter(data.riskLevel)}</DataTable.Cell>
        <DataTable.Cell numeric>{data.province.name}</DataTable.Cell>
        <DataTable.Cell numeric>{data.city.name}</DataTable.Cell>
        <DataTable.Cell numeric>{data.district.name}</DataTable.Cell>
        <DataTable.Cell numeric>{data.subDistrict.name}</DataTable.Cell>
        <DataTable.Cell numeric>{new Date(props.trace.time.millis).toLocaleDateString()}</DataTable.Cell>
    </DataTable.Row>
}

class ListItem extends React.Component<any, any> {
    render() {
        return <DataRow token={this.props.token} trace={this.props.trace}/>
    }
}

export function TraceTable(props: { token: string, traceList: Array<Trace> }) {
    const dataItem = props.traceList.map((trace) => {
        return <ListItem key={trace.id.id} token={props.token} trace={trace}/>
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
            <DataTable.Title numeric>时间</DataTable.Title>
        </DataTable.Header>
        {dataItem}
    </DataTable></View>

}