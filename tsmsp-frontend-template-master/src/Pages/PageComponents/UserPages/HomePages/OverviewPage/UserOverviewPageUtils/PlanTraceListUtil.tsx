import {Place} from "../../../../../../Types/Place";
import {evaluateRisk, mapRiskToColor, PlaceRiskLevel} from "../../../../../../Types/PlaceMeta/PlaceRiskLevel";
import {View, Text, ScrollView} from "react-native";
import {Trace} from "Types/Trace";
import {useEffect, useState} from "react";
import {PlaceId} from "Types/PlaceMeta/PlaceId";
import {Province} from "Types/PlaceMeta/Province";
import {City} from "Types/PlaceMeta/City";
import {District} from "Types/PlaceMeta/District";
import {SubDistrict} from "Types/PlaceMeta/SubDistrict";
import {SendData} from "Utils/SendDataUtil";
import {UserGetPlaceMessage} from "Messages/UserMessages/UserGetPlaceMessage";
import {Token} from "Types/UserMeta/Token";

function ListItem (props:{token: string,trace:Trace}) {
    const [data, setPlaceData] = useState<Place>(new Place(new PlaceId(0), new Province(''), new City(''), new District(''), new SubDistrict(''), PlaceRiskLevel.red))
    useEffect(() => {
        SendData(
            new UserGetPlaceMessage(new Token(props.token), new PlaceId(props.trace.visitPlaceId.id)),
            (reply: Place) => {
                setPlaceData(reply)
            }
        )
    }, [])
    return <View key={data.id.id}><Text style={{color:mapRiskToColor(data.riskLevel)}}>{data.province.name} {data.city.name} {data.district.name}</Text></View>
}
export function PlanTraceList(props: { token:string,trace:Array<Trace> }) {

    return <ScrollView style={{flex:1}}>
        {props.trace.map((a:Trace)=><ListItem token={props.token} trace={a}/>)}
    </ScrollView>
}