import {Place} from "../../../../../../Types/Place";
import {evaluateRisk, mapRiskToColor} from "../../../../../../Types/PlaceMeta/PlaceRiskLevel";
import {View, Text, ScrollView} from "react-native";

export function PlanTraceList(props: { tracePlace:Array<Place> }) {
    const sortedTrace=props.tracePlace.sort((a:Place,b:Place)=>{
        const an=evaluateRisk(a.riskLevel)
        const bn=evaluateRisk(b.riskLevel)
        if (an>bn)
            return -1
        else if (an==bn)
            return 0
        else
            return 1
    })
    const items=sortedTrace.map((a:Place)=>{
            return <View key={a.id.id}><Text style={{color:mapRiskToColor(a.riskLevel)}}>{a.province.name} {a.city.name} {a.district.name}</Text></View>
    })
    return <ScrollView style={{flex:1}}>
        {items}
    </ScrollView>
}