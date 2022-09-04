import {ButtonTemplate} from "../../../../Utils/PageUtils/ButtonUtil";
import {ScreenTemplate} from "../../../../Utils/PageUtils/PageContainerUtil";
import {TokenStore} from "../../../../Globals/TokenStore";
import React, {useState} from "react";
import {Trace} from "../../../../Types/Trace";
import {SendData} from "../../../../Utils/SendDataUtil";
import {UserGetTraceMessage} from "../../../../Impl/Messages/UserMessages/UserGetTraceMessage";
import {DAY_MILLIS} from "Utils/SettingsAndConstants";
import {useFocusEffect} from "@react-navigation/native";
import {HeaderTemplate} from "../../../../Utils/PageUtils/HeaderUtil";
import {TraceTable} from "../../../../Utils/PageUtils/TraceTableUtil";
import {Token} from "Types/UserMeta/Token";

export function TracePage({navigation}:any){
    const {token} = TokenStore()

    //refreshing
    const [traceHistory, setTraceHistory] = useState(Array<Trace>())
    const refresh = () => {
        SendData(
            new UserGetTraceMessage(new Token(token), (new Date().getTime() - DAY_MILLIS), new Date().getTime()),
            (reply: Trace[]) => {
                setTraceHistory(reply)
            })
    }
    useFocusEffect(React.useCallback(refresh, []))

    const goBack=()=>navigation.navigate('User.ScanPlaceQRCode')

    return <ScreenTemplate goBack={goBack}>
        <HeaderTemplate text='我的行程表'/>
        <TraceTable token={token} traceList={traceHistory}/>
        <ButtonTemplate
            onPress={()=>navigation.navigate('User.ModifyTrace')}
            text='修改我的行程'
        />
    </ScreenTemplate>
}