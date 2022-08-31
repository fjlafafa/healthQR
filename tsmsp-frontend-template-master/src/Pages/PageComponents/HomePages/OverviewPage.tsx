import {ScreenTemplate, ScrollTemplate} from "../../../Utils/PageUtils/PageContainerUtil";
import {Text, View} from "react-native";
import {SCREEN_WIDTH} from "../../../Utils/Styles";
import {Appbar, Card} from "react-native-paper";
import QRCode from "react-native-qrcode-svg";
import {TextTemplate} from "../../../Utils/PageUtils/TextUtil";
import {BoundedTraceList} from "../../../Utils/PageUtils/ListUtil";
import {ButtonTemplate} from "../../../Utils/PageUtils/ButtonUtil";
import {PagesID} from "../../PagesID";
import {StatusBar} from "expo-status-bar";
import React from "react";
import {TokenStore} from "../../../Globals/TokenStore";
import {SendData} from "../../../Utils/SendDataUtil";
import {UserGetTraceMessage} from "../../../Impl/Messages/UserGetTraceMessage";
import {ONEDAY} from "../../../Utils/Constants";
import {TSMSPReply} from "../../../Impl/Replies/TSMSPReply";
import create from "zustand";


const registerStore = create(() => ({
    traceHistory: [['暂无踪迹']]
}))

const setTraceHistory = (traceHistory: string[][]) => registerStore.setState({traceHistory})
const clearTraceInfo = () => registerStore.setState({
    traceHistory: [['暂无踪迹']]
})

var last_fresh_time = 0

export function OverviewPage({navigation}: any) {
    const {token} = TokenStore()
    const {traceHistory} = registerStore()
    //refreshing
    if (new Date().getTime() - last_fresh_time > 10000) {
        SendData(new UserGetTraceMessage(token, (new Date().getTime() - ONEDAY), new Date().getTime()),
            (reply: TSMSPReply) => {
                let TraceList: string[][] = JSON.parse(reply.message) as string[][]
                setTraceHistory(TraceList)
            })
        last_fresh_time = new Date().getTime()
    }

    //Required data:
    const avatar = require('Assets/icon.png')
    return <ScreenTemplate>
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
                            renderItem={({item, index}: any) =>
                                item[0] === '暂无踪迹' ?
                                    <Text>暂无踪迹或尚未查询</Text> :
                                    <Text>{index}. {item[2]}到访{item[0]}内{item[1]}</Text>
                            } keyExtractor={(item: any, index: number) => index.toString()}/>
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
                        navigation.navigate(PagesID.ScanQRCode, {})
                        clearTraceInfo()
                    }}
                    text='地点扫码'
                />
                <ButtonTemplate
                    onPress={() => {
                        navigation.navigate(PagesID.Account, {})
                        clearTraceInfo()
                    }}
                    text='个人账户'
                />
                <ButtonTemplate
                    onPress={() => {
                        navigation.navigate(PagesID.Trace, {})
                        clearTraceInfo()
                    }}
                    text='踪迹管理'
                />
                <ButtonTemplate
                    onPress={() => {
                        navigation.navigate(PagesID.Vaccine, {})
                        clearTraceInfo()
                    }}
                    text='核酸疫苗管理'
                />
            </View>

            <StatusBar style='auto'/>
        </ScrollTemplate>
    </ScreenTemplate>
}