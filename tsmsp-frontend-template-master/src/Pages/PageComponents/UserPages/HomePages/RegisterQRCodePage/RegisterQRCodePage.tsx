import React from 'react'
import {TokenStore} from '../../../../../Globals/TokenStore'
import {ScreenTemplate, ScrollTemplate} from '../../../../../Utils/PageUtils/PageContainerUtil'
import {ViewSwitcher} from "../HomePagesUtils/BarUtil";
import {View, Text} from "react-native";
import {SCREEN_WIDTH} from "../../../../../Utils/SettingsAndConstants";
import {Card} from "react-native-paper";
import {HeaderTemplate} from "../../../../../Utils/PageUtils/HeaderUtil";
import {HealthCode} from "../OverviewPage/OverviewPageUtils/HealthCodeUtil";
import {UserInformation} from "../../../../../Types/UserInformation";
import {UserId} from "../../../../../Types/UserMeta/UserId";
import {DateClass} from "../../../../../Types/Templates/DateClass";
import {VaccinationStatus} from "../../../../../Types/UserMeta/VaccinationStatus";
import {UserRiskLevel} from "../../../../../Types/UserMeta/UserRiskLevel";
import {TextTemplate} from "../../../../../Utils/PageUtils/TextUtil";
import {RegisterCode} from "./RegisterQRCodeUtil/InfoQRCodeUtil";
import {UserIdentity} from "../../../../../Types/UserIdentity";
import {RealName} from "../../../../../Types/UserMeta/RealName";
import {Password} from "../../../../../Types/UserMeta/Password";
import {IdentityNumber} from "../../../../../Types/UserMeta/IdentityNumber";
import {Permission} from "../../../../../Types/UserMeta/Permission";
import {Token} from "../../../../../Types/UserMeta/Token";

export function RegisterQRCodePage({navigation}:any) {
    const {token} = TokenStore()
    const avatar = require('../../../../../Assets/icon.png')
    return (<ScreenTemplate>
        <ViewSwitcher state={'RegisterQRCode'} navigation={navigation}/>
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
                        <RegisterCode
                            userInfo={new UserIdentity(new UserId(1),new RealName('shabra'),new Password('0'),new IdentityNumber('114514121211138'),Permission.normal)}/>
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
            </ScrollTemplate>
        </ScreenTemplate>
    )
}