import {Place} from "../../../../../../Types/Place";
import {evaluateRisk, mapRiskToColor, PlaceRiskLevel} from "../../../../../../Types/PlaceMeta/PlaceRiskLevel";
import {View, Text, ScrollView} from "react-native";
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

class ListItem extends React.Component<any, any>{
    constructor(props:any) {
        super(props)
        this.state={
            data:new Place(new PlaceId(0), new Province(''), new City(''), new District(''), new SubDistrict(''), PlaceRiskLevel.red)
        }
    }
    componentDidMount() {
        SendData(
            new UserGetPlaceMessage(new Token(this.props.token), new PlaceId(this.props.trace.visitPlaceId.id)),
            (reply: Place) => {
                this.setState({data:reply})
            }
        )
    }

    render(){
        return <Text style={{color:mapRiskToColor(this.state.data.riskLevel)}}>{this.state.data.province.name} {this.state.data.city.name} {this.state.data.district.name}</Text>
    }
}
export function PlanTraceList(props: { token:string,trace:Array<Trace> }) {

    return <ScrollView style={{flex:1}}>
        {props.trace.map((a:Trace)=><ListItem key={a.id.id} token={props.token} trace={a}/>)}
    </ScrollView>
}