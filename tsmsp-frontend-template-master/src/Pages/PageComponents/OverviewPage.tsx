import React from 'react'
import {Button, Text, View} from 'react-native'
import {StatusBar} from "expo-status-bar";
import create from 'zustand'
import {clearUserToken, TokenStore} from "Globals/TokenStore";
import {UserUpdateTraceMessage} from "Impl/Messages/UserUpdateTraceMessage";
import {UserGetTraceMessage} from "Impl/Messages/UserGetTraceMessage";
import {ButtonTemplate, ButtonToSendMessage} from "../../Utils/PageUtils/ButtonUtil";
import {TSMSPReply} from "Impl/Replies/TSMSPReply";
import {PageContainerTemplate} from "Utils/PageUtils/PageContainerUtil";
import {TextTemplate} from "Utils/PageUtils/TextUtil";
import {TextInputTemplate} from "Utils/PageUtils/TextInputUtil";
import {BoundedTraceList} from "Utils/PageUtils/ListUtil";
import {TextClock} from "../../Utils/PageUtils/ClockUtil";
import {SCREEN_WIDTH} from "../../Utils/Styles";
import {QRCodeSize} from "../../Globals/GlobalVariables";
import QRCode from "react-native-qrcode-svg";
import {Card, Paragraph, Title} from "react-native-paper";
import {styles} from 'Utils/Styles'

const registerStore = create(() => ({
    newTrace: "",
    newTraceId: "",
    traceHistory: [["暂无踪迹"]]
}))

const setNewTrace = (newTrace: string) => registerStore.setState({newTrace})
const setNewTraceId = (newTraceId: string) => registerStore.setState({newTraceId})
const setTraceHistory = (traceHistory: string[][]) => registerStore.setState({traceHistory})
const clearTraceInfo = () => registerStore.setState({
    newTrace: "",
    newTraceId: "",
    traceHistory: [["暂无踪迹"]]
})

export function OverviewPage({navigation}: any) {
    const report_type: string = "Self uploaded"
    const {token} = TokenStore()
    const {newTrace, newTraceId, traceHistory} = registerStore()

    const cv = {
        alignItems: 'center',
        justifyContent: "center"
    }
    //Required data:
    const avatar = require('Assets/icon.png');

    return <PageContainerTemplate>
        <View style={{width: SCREEN_WIDTH, height: SCREEN_WIDTH, alignItems: 'center', justifyContent: "center",/*backgroundColor: '#f0f'/**/}}>
            <Card style={{width: '95%', height: '95%', alignItems: 'center'}}>
                <View style={{height: SCREEN_WIDTH * 0.025}}/>
                {/*健康码*/}

                {/*To implement*/}
                <QRCode
                    value={token}
                    logo={avatar}
                    size={SCREEN_WIDTH * 0.9}
                    color="green"
                />

            </Card>
        </View>
        <View style={{
            width: SCREEN_WIDTH,
            height: SCREEN_WIDTH * 0.35,
            flexDirection: 'row', /*backgroundColor: '#00f'/**/
        }}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: "center", /*backgroundColor: '#008'/**/}}>
                <Card style={{width: '90%', height: '90%', alignItems: 'center'}}>
                    {/*核酸疫苗*/}
                    <TextTemplate>核酸疫苗</TextTemplate>
                </Card>
            </View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: "center", /*backgroundColor: '#080'*/}}>
                <Card style={{width: '90%', height: '90%', alignItems: 'center'}}>
                    {/*行程数据*/}
                    <TextTemplate>行程记录</TextTemplate>
                    <BoundedTraceList
                        data={traceHistory}
                        renderItem={({item, index}: any) =>
                            item[0] === "暂无踪迹" ?
                                <Text>暂无踪迹或尚未查询</Text> :
                                <Text>{index}. {item[2]}到访{item[0]}内{item[1]}</Text>
                        } keyExtractor={(item : any, index : number) => index.toString()}/>
                </Card>
            </View>
        </View>
        <View style={{width: SCREEN_WIDTH,alignItems: 'center', justifyContent: "center",/*backgroundColor: '#f0f'/**/}}>
            {/*其他微服务*/}

            <ButtonTemplate
                onPress={() => {
                navigation.navigate('Root', {});
                clearTraceInfo();
                clearUserToken();}}
                text='退出登录'
            />
        </View>

    </PageContainerTemplate>
    /*return <PageContainerTemplate>

        <TextTemplate> 主界面</TextTemplate>
        <TextClock/>
        <TextTemplate>{new Date().toLocaleTimeString()}</TextTemplate>
        <TextInputTemplate placeholder={"访问地点代码"} value={newTraceId} onChangeText={(newText: string)=>setNewTraceId(newText)}/>
        <TextInputTemplate placeholder={"新轨迹地点名称"} value={newTrace} onChangeText={(newText: string)=>setNewTrace(newText)}/>

        <ButtonTemplate
            onPress={() => {
                navigation.navigate('QRCode',{});
                clearTraceInfo();
            }}
            text ='我的健康码'
        />
        <ButtonTemplate
            onPress = {()=> {
                navigation.navigate('ScanQRCode',{})
                clearTraceInfo();
            }}
            text = '地点扫码'
        />

        <ButtonToSendMessage
            icon = 'upload'
            toSendMessage = {new UserUpdateTraceMessage(token, +newTraceId, newTrace, report_type)}
            text = '上传新轨迹'
        />
        <ButtonToSendMessage
            toSendMessage = {new UserGetTraceMessage(
                token,
                (new Date().getTime() - 86400000),
                new Date().getTime())}
            ifSuccess = {(replyJson:TSMSPReply)=> {
                let TraceList: string[][] = JSON.parse(replyJson.message) as string[][];
                setTraceHistory(TraceList)
            }}
            text = '获取我的历史轨迹'
        />
        <ButtonTemplate onPress={() => {
            navigation.navigate('DeleteTrace',{});
            clearTraceInfo();
        }}
            text ='删除记录'/>


        <ButtonTemplate onPress={() => {
            navigation.navigate('DeleteAccount',{})
            clearTraceInfo();
        }}
            text ='注销账户'/>
        <ButtonTemplate onPress={() => {
            navigation.navigate('Password',{});
            clearTraceInfo();
        }}
            text ='修改密码'/>



        <StatusBar style="auto" />
    </PageContainerTemplate>*/
}