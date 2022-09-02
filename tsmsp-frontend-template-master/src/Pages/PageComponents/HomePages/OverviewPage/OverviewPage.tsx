import {ScreenTemplate, ScrollTemplate} from "../../../../Utils/PageUtils/PageContainerUtil";
import {Text, View} from "react-native";
import {SCREEN_WIDTH} from "../../../../Utils/Styles";
import {Appbar, Card} from "react-native-paper";
import QRCode from "react-native-qrcode-svg";
import {TextTemplate} from "../../../../Utils/PageUtils/TextUtil";
import {BoundedTraceList} from "../../../../Utils/PageUtils/ListUtil";
import {ButtonTemplate} from "../../../../Utils/PageUtils/ButtonUtil";
import {StatusBar} from "expo-status-bar";
import React, {useState} from "react";
import {TokenStore} from "../../../../Globals/TokenStore";
import {SendData} from "../../../../Utils/SendDataUtil";
import {UserGetTraceMessage} from "../../../../Impl/Messages/UserMessages/UserGetTraceMessage";
import {ONEDAY} from "../../../../Utils/Constants";
import {ViewSwitcher} from "../HomePagesUtils/BarUtil";
import {Trace} from "../../../../Types/Trace";
import {useFocusEffect} from "@react-navigation/native";


export function OverviewPage({navigation}: any) {
    const {token} = TokenStore()
    const [traceHistory, setTraceHistory] = useState(Array<Trace>())
    //refreshing
    const refresh=() =>
    {
        SendData(
            new UserGetTraceMessage(token, (new Date().getTime() - ONEDAY), new Date().getTime()),
            (reply: Trace[]) => {
                setTraceHistory(reply)
            })
    }
    useFocusEffect(React.useCallback(refresh, []))
    const avatar = require('../../../../Assets/icon.png')
    return <ScreenTemplate>
        <ViewSwitcher state={'Overview'} navigation={navigation}/>
        <ScrollTemplate>
            <View style={{
                width: SCREEN_WIDTH,
                height: SCREEN_WIDTH,
                alignItems: 'center',
                justifyContent: 'center',/*backgroundColor: '#f0f'/**/
            }}>
                <Card style={{width: '95%', height: '95%', alignItems: 'center'}}>
                    <View style={{height: SCREEN_WIDTH * 0.025}}/>
                    {/*健康码*/}

                    {/*To implement*/}
                    <QRCode
                        value={token}
                        logo={avatar}
                        size={SCREEN_WIDTH * 0.9}
                        color='green'
                    />

                </Card>
            </View>
            <View style={{
                width: SCREEN_WIDTH,
                height: SCREEN_WIDTH * 0.35,
                flexDirection: 'row', /*backgroundColor: '#00f'/**/
            }}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', /*backgroundColor: '#008'/**/}}>
                    <Card style={{width: '90%', height: '90%', alignItems: 'center'}}>
                        {/*核酸疫苗*/}
                        <View style={{flex:1, backgroundColor:'#ff0'}}>
                            <TextTemplate>核酸疫苗</TextTemplate>
                        </View>
                        <View style={{flex:1, backgroundColor:'#f00'}}/>
                    </Card>
                </View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', /*backgroundColor: '#080'*/}}>
                    <Card style={{width: '90%', height: '90%', alignItems: 'center'}}>
                        {/*行程数据*/}
                        <TextTemplate>行程记录</TextTemplate>
                        <BoundedTraceList
                            data={traceHistory}
                            renderItem={({item, index}:any) => {
                                return <Text>{index}. {item.time.millis.toString()}到访{item.visitPlaceId.id.toString()}</Text>
                            }}
                            keyExtractor={(item: any, index: number) => index.toString()}/>
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

                <ButtonTemplate
                    onPress={() => {
                        navigation.navigate('ScanQRCode', {})
                    }}
                    text='地点扫码'
                />
                <ButtonTemplate
                    onPress={() => {
                        navigation.navigate('Account', {})
                    }}
                    text='个人账户'
                />
                <ButtonTemplate
                    onPress={() => {
                        navigation.navigate('Trace', {})
                    }}
                    text='踪迹管理'
                />
                <ButtonTemplate
                    onPress={() => {
                        navigation.navigate('Vaccine', {})
                    }}
                    text='核酸疫苗管理'
                />
            </View>

            <StatusBar style='auto'/>
        </ScrollTemplate>
    </ScreenTemplate>
}