import {ScreenTemplate, ScrollTemplate} from "../../../../Utils/PageUtils/PageContainerUtil";
import {Text, View} from "react-native";
import {SCREEN_WIDTH} from "../../../../Utils/Styles";
import {Appbar, Card} from "react-native-paper";
import QRCode from "react-native-qrcode-svg";
import {TextTemplate} from "../../../../Utils/PageUtils/TextUtil";
import {BoundedTraceList} from "../../../../Utils/PageUtils/ListUtil";
import {ButtonTemplate} from "../../../../Utils/PageUtils/ButtonUtil";
import {StatusBar} from "expo-status-bar";
import React from "react";
import {TokenStore} from "../../../../Globals/TokenStore";
import {SendData} from "../../../../Utils/SendDataUtil";
import {UserGetTraceMessage} from "../../../../Impl/Messages/UserMessages/UserGetTraceMessage";
import {ONEDAY} from "../../../../Utils/Constants";
import {TSMSPReply} from "../../../../Impl/TSMSPReply";
import create from "zustand";
import {ViewSwitcher} from "../HomePagesUtils/BarUtil";
import {Trace} from "../../../../Types/Trace";


const registerStore = create(() => ({
    traceHistory: new Array<Trace>()
}))

const setTraceHistory = (traceHistory: Trace[]) => registerStore.setState({traceHistory})
const clearTraceInfo = () => registerStore.setState({
    traceHistory: new Array<Trace>()
})


export function OverviewPage({navigation}: any) {
    const {token} = TokenStore()
    const {traceHistory} = registerStore()
    //refreshing
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () =>
            SendData(new UserGetTraceMessage(token, (new Date().getTime() - ONEDAY), new Date().getTime()),
                (reply: Trace[]) => {
                    setTraceHistory(reply)
                }))
        return ()=>unsubscribe.remove()
    })
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
                        <TextTemplate>核酸疫苗</TextTemplate>
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
                        clearTraceInfo()
                    }}
                    text='地点扫码'
                />
                <ButtonTemplate
                    onPress={() => {
                        navigation.navigate('Account', {})
                        clearTraceInfo()
                    }}
                    text='个人账户'
                />
                <ButtonTemplate
                    onPress={() => {
                        navigation.navigate('Trace', {})
                        clearTraceInfo()
                    }}
                    text='踪迹管理'
                />
                <ButtonTemplate
                    onPress={() => {
                        navigation.navigate('Vaccine', {})
                        clearTraceInfo()
                    }}
                    text='核酸疫苗管理'
                />
            </View>

            <StatusBar style='auto'/>
        </ScrollTemplate>
    </ScreenTemplate>
}