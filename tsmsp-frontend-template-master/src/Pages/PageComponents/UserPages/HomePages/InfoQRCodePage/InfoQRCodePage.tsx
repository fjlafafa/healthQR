import React, {useState} from 'react'
import {TokenStore} from '../../../../../Globals/TokenStore'
import {ScreenTemplate, ScrollTemplate} from '../../../../../Utils/PageUtils/PageContainerUtil'
import {ViewSwitcher} from "../HomePagesUtils/BarUtil";
import {View, Text} from "react-native";
import {DAY_MILLIS, SCREEN_WIDTH} from "../../../../../Utils/SettingsAndConstants";
import {Card} from "react-native-paper";
import {HeaderTemplate} from "../../../../../Utils/PageUtils/HeaderUtil";
import {HealthCode} from "../OverviewPage/UserOverviewPageUtils/HealthCodeUtil";
import {UserInformation} from "../../../../../Types/UserInformation";
import {UserId} from "../../../../../Types/UserMeta/UserId";
import {DateClass} from "../../../../../Types/Templates/DateClass";
import {VaccinationStatus} from "../../../../../Types/UserMeta/VaccinationStatus";
import {UserRiskLevel} from "../../../../../Types/UserMeta/UserRiskLevel";
import {TextTemplate} from "../../../../../Utils/PageUtils/TextUtil";
import {RegisterCode} from "Utils/PageUtils/InfoQRCodeUtil";
import {UserIdentity} from "../../../../../Types/UserIdentity";
import {RealName} from "../../../../../Types/UserMeta/RealName";
import {Password} from "../../../../../Types/UserMeta/Password";
import {IdentityNumber} from "../../../../../Types/UserMeta/IdentityNumber";
import {Permission} from "../../../../../Types/UserMeta/Permission";
import {Token} from "../../../../../Types/UserMeta/Token";
import {ButtonTemplate} from "../../../../../Utils/PageUtils/ButtonUtil";
import {SendData} from "Utils/SendDataUtil";
import {UserGetTraceMessage} from "Messages/UserMessages/UserGetTraceMessage";
import {Trace} from "Types/Trace";
import {useFocusEffect} from "@react-navigation/native";
import {UserGetRealNameMessage} from "Messages/UserMessages/UserGetRealNameMessage";

export function InfoQRCodePage({navigation}:any) {
    const {token} = TokenStore()

    const [realName,setRealName]=useState(new RealName(''))
    const refresh = () => {
        SendData(
            new UserGetRealNameMessage(new Token(token)),
            (reply: RealName) => {
                setRealName(reply)
            })
    }
    useFocusEffect(React.useCallback(refresh, []))

    const goBack=()=>navigation.navigate('User.Overview')
    return (<ScreenTemplate goBack={goBack}>
        <ViewSwitcher state={'User.InfoQRCodePage'} navigation={navigation}/>
            <ScrollTemplate>
                <View style={{
                    width: SCREEN_WIDTH,
                    height: SCREEN_WIDTH*1.1,
                    alignItems: 'center',
                    justifyContent: 'center',/*backgroundColor: '#f0f'/**/
                }}>
                    <Card style={{width: '95%', height: '95%', alignItems: 'center',justifyContent:'center'}}>
                        <View style={{height: SCREEN_WIDTH * 0.025}}/>
                        {/*核酸登记码*/}
                        <View style={{height:SCREEN_WIDTH * 0.9,width:SCREEN_WIDTH * 0.95, alignItems: 'center',justifyContent:'center'}}>

                            <RegisterCode
                                userInfo={{realName:realName,token:new Token(token)}}
                            />
                        </View>
                        <View style={{height: '2%'}}/>
                        <TextTemplate>出示此码登记核酸检测/疫苗注射信息</TextTemplate>
                    </Card>
                </View>
                <View style={{
                    width: SCREEN_WIDTH,
                    height: SCREEN_WIDTH*0.3,
                    alignItems: 'center',
                    justifyContent: 'center',/*backgroundColor: '#f0f'/**/
                }}>
                    <Card style={{width: '95%', height: '95%', alignItems: 'center'}}>
                        {/*一些信息提示*/}
                        <Text>你还有很多核酸没检测、很多疫苗没有打，还不能休息哟,,,</Text>
                    </Card>
                </View>
                <HeaderTemplate text='核酸疫苗相关微服务'/>
                {/*一些微服务*/}
                <ButtonTemplate
                    onPress={()=>navigation.navigate('User.Vaccine')}
                    text='我的核酸疫苗'
                />
            </ScrollTemplate>
        </ScreenTemplate>
    )
}