import {Trace} from "../../Types/Trace";
import {Place} from "../../Types/Place";
import {DataTable} from 'react-native-paper'
import {mapRiskToCharacter, PlaceRiskLevel} from "../../Types/PlaceMeta/PlaceRiskLevel";
import {useEffect, useState} from "react";
import {Province} from "../../Types/PlaceMeta/Province";
import { City } from "Types/PlaceMeta/City";
import {SubDistrict} from "../../Types/PlaceMeta/SubDistrict";
import {District} from "../../Types/PlaceMeta/District";
import {PlaceId} from "../../Types/PlaceMeta/PlaceId";
import {SendData} from "../SendDataUtil";
import {UserGetPlaceMessage} from "../../Impl/Messages/UserMessages/UserGetPlaceMessage";
import {View} from "react-native";

function DataRow(props:{token: string,trace:Trace}){
    const [data,setPlaceData]=useState<Place>(new Place(new PlaceId(0),new Province(''),new City(''),new District(''),new SubDistrict(''), PlaceRiskLevel.red))
    useEffect(()=>{SendData(
        new UserGetPlaceMessage(props.token,props.trace.visitPlaceId.id),
        (reply:Place)=>{
            setPlaceData(reply)}
    )},[])

    return <DataTable.Row>
        <DataTable.Cell>{mapRiskToCharacter(data.riskLevel)}</DataTable.Cell>
        <DataTable.Cell numeric>{data.province.name}</DataTable.Cell>
        <DataTable.Cell numeric>{data.city.name}</DataTable.Cell>
        <DataTable.Cell numeric>{data.district.name}</DataTable.Cell>
        <DataTable.Cell numeric>{data.subDistrict.name}</DataTable.Cell>
        <DataTable.Cell numeric>{new Date(props.trace.time.millis).toLocaleDateString()}</DataTable.Cell>
    </DataTable.Row>
}

export function TraceTable(props:{token: string,traceList:Array<Trace>}){
    const datas=props.traceList.map((trace)=>{
        return <DataRow token={props.token} trace={trace}/>
    })
    return <DataTable>
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
        {datas}
    </DataTable>

}