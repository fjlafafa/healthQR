import {ScreenTemplate, ScrollTemplate} from "../../../../../Utils/PageUtils/PageContainerUtil";
import {Text, View} from "react-native";
import {SCREEN_WIDTH} from "../../../../../Utils/SettingsAndConstants";
import {Card} from "react-native-paper";
import QRCode from "react-native-qrcode-svg";
import {TextTemplate} from "../../../../../Utils/PageUtils/TextUtil";
import {BoundedTraceList} from "../../../../../Utils/PageUtils/ListUtil";
import {ButtonTemplate} from "../../../../../Utils/PageUtils/ButtonUtil";
import {StatusBar} from "expo-status-bar";
import React, {useState} from "react";
import {TokenStore, clearUserToken} from "../../../../../Globals/TokenStore";
import {SendData} from "../../../../../Utils/SendDataUtil";
import {UserGetTraceMessage} from "../../../../../Impl/Messages/UserMessages/UserGetTraceMessage";
import {DAY_MILLIS} from "../../../../../Utils/SettingsAndConstants";
import {ViewSwitcher} from "../HomePagesUtils/BarUtil";
import {Trace} from "../../../../../Types/Trace";
import {useFocusEffect} from "@react-navigation/native";
import {TextClock} from "../../../../../Utils/PageUtils/ClockUtil";
import {DateClass} from "../../../../../Types/Templates/DateClass";
import {VaccinationStatus} from "../../../../../Types/UserMeta/VaccinationStatus";
import {VaccineView} from "./UserOverviewPageUtils/VaccineUtil";
import {NucleicAcidView} from "./UserOverviewPageUtils/NucleicAcidUtil";
import {PlanTraceList} from "./UserOverviewPageUtils/PlanTraceListUtil";
import {Place} from "../../../../../Types/Place";
import {PlaceId} from "../../../../../Types/PlaceMeta/PlaceId";
import {Province} from "Types/PlaceMeta/Province";
import {City} from "Types/PlaceMeta/City";
import {District} from "Types/PlaceMeta/District";
import {SubDistrict} from "../../../../../Types/PlaceMeta/SubDistrict";
import {PlaceRiskLevel} from 'Types/PlaceMeta/PlaceRiskLevel'
import {HealthCode} from "./UserOverviewPageUtils/HealthCodeUtil";
import {UserInformation} from "../../../../../Types/UserInformation";
import {UserId} from "../../../../../Types/UserMeta/UserId";
import {UserRiskLevel} from "../../../../../Types/UserMeta/UserRiskLevel";
import {HeaderTemplate} from "../../../../../Utils/PageUtils/HeaderUtil";
import {TraceTable} from "../../../../../Utils/PageUtils/TraceTableUtil";
import {Token} from "Types/UserMeta/Token";


export function UserOverviewPage({navigation}: any) {
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

    //go back
    const goBack=()=>{
        navigation.navigate('Login')
        clearUserToken()
    }

    return <ScreenTemplate goBack={goBack}>
        <ViewSwitcher state={'User.Overview'} navigation={navigation}/>
        <ScrollTemplate>
            <View style={{
                width: SCREEN_WIDTH,
                height: SCREEN_WIDTH * 0.18,
                alignItems: 'center',
                justifyContent: 'flex-end',/*backgroundColor: '#f0f'/**/
            }}>
                {/*头部钟*/}
                <Card style={{width: '95%', height: '90%', alignItems: 'center',}}>
                    <TextClock/>
                </Card>
            </View>
            <View style={{
                width: SCREEN_WIDTH,
                height: SCREEN_WIDTH,
                alignItems: 'center',
                justifyContent: 'center',/*backgroundColor: '#f0f'/**/
            }}>
                <Card style={{width: '95%', height: '95%', alignItems: 'center'}}>
                    <View style={{height: SCREEN_WIDTH * 0.025}}/>
                    {/*健康码*/}
                    <HealthCode
                        userInfo={new UserInformation(new UserId(123), new DateClass(new Date().getTime()), VaccinationStatus.dual, UserRiskLevel.red)}/>
                </Card>
            </View>
            <View style={{
                width: SCREEN_WIDTH,
                height: SCREEN_WIDTH * 0.35,
                flexDirection: 'row', /*backgroundColor: '#00f'/**/
            }}>
                <View style={{flex: 1, justifyContent: 'center', /*backgroundColor: '#008'/**/}}>

                    {/*核酸疫苗*/}
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <VaccineView vaccinationStatus={VaccinationStatus.none}/>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <NucleicAcidView recentNucleicTestTime={new DateClass(new Date().getTime() - 321211138)}/>
                    </View>
                </View>
                <View style={{flex: 1, justifyContent: 'center', /*backgroundColor: '#080'*/}}>
                    <Card style={{width: '90%', height: '90%', alignItems: 'center', justifyContent: 'center'}}>
                        {/*行程数据 准备加一个查看详情功能*/}
                        <TextTemplate>14天内行程记录</TextTemplate>
                        <PlanTraceList token={token} trace={traceHistory}/>
                    </Card>
                </View>
            </View>
            <View
                style={{
                    width: SCREEN_WIDTH,
                    alignItems: 'center',
                    justifyContent: 'center',/*backgroundColor: '#f0f'/**/
                }}>
                {/*其他微服务*/}
                <HeaderTemplate text='其他微服务'/>

                <ButtonTemplate
                    onPress={() => {
                        navigation.navigate('User.Account')
                    }}
                    text='个人账户'
                />
                <ButtonTemplate
                    onPress={() => goBack()}
                    text='退出登录'
                />
            </View>

            <StatusBar style='auto'/>
        </ScrollTemplate>
    </ScreenTemplate>
}