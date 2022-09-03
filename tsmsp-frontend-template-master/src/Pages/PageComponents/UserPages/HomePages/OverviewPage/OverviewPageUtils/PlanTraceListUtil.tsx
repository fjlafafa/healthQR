import {Place} from "../../../../../../Types/Place";
import {evaluateRisk, mapRiskToColor} from "../../../../../../Types/PlaceMeta/PlaceRiskLevel";
import {View, Text} from "react-native";

interface TraceInfo {
    tracePlace:Array<Place>
}

export function PlanTraceList(props:TraceInfo) {
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
            return <Text style={{color:mapRiskToColor(a.riskLevel)}}>{a.province.name} {a.city.name} {a.district.name}</Text>
        })
    return <View style={{flex:1}}>
        {items}
    </View>
}