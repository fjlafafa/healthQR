import {
    ScreenTemplate,
    ScrollTemplate,
} from "Utils/PageUtils/PageContainerUtil";
import { View } from "react-native";
import {  SCREEN_WIDTH } from "Utils/SettingsAndConstants";
import { Card } from "react-native-paper";
import {ButtonToSendMessage} from "Utils/PageUtils/ButtonUtil";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {  TokenStore } from "Globals/TokenStore";
import { DateClass } from "Types/Templates/DateClass";
import { VaccinationStatus } from "Types/UserMeta/VaccinationStatus";
import { UserInformation } from "Types/UserInformation";
import { UserId } from "Types/UserMeta/UserId";
import { UserRiskLevel } from "Types/UserMeta/UserRiskLevel";
import { Temperature } from "Types/UserMeta/Temperature";
import {LargeVaccineView} from "Pages/PageComponents/UserPages/HomePages/InfoQRCodePage/InfoQRUtils/VaccineUtil";
import {
    LargeNucleicAcidView
} from "Pages/PageComponents/UserPages/HomePages/InfoQRCodePage/InfoQRUtils/NucleicAcidUtil";
import {HealthCode} from "Pages/PageComponents/UserPages/HomePages/OverviewPage/UserOverviewPageUtils/HealthCodeUtil";
import {IdentityNumber} from "Types/UserMeta/IdentityNumber";
import {TextInputTemplate} from "Utils/PageUtils/TextInputUtil";
import {checkIdentityNumber} from "Utils/FormatUtils/IdentityNumberUtil";
import {UserGetOthersInfoMessage} from "Messages/UserMessages/UserGetOthersInfoMessage";

export function HelpingPage({ navigation }: any) {
    const { token } = TokenStore();

    //refreshing
    const [identityNumber, setIdentityNumber]=useState(new IdentityNumber(''))
    const [info, setInfo] = useState(
        new UserInformation(
            new UserId(0),
            new DateClass(0),
            VaccinationStatus.none,
            UserRiskLevel.popUps,
            new Temperature(36.6)
        )
    );
    //go back
    const goBack = () => {navigation.navigate("User.Overview");};

    return (
        <ScreenTemplate goBack={goBack}>
            <ScrollTemplate>
                <View style={{ height: SCREEN_WIDTH * 0.03 }} />

                <View
                    style={{
                        width: SCREEN_WIDTH,
                        height: SCREEN_WIDTH,
                        alignItems: "center",
                        justifyContent: "center" /*backgroundColor: '#f0f'/**/,
                    }}
                >
                    <Card style={{ width: "95%", height: "95%", alignItems: "center" }}>
                        <View style={{ height: SCREEN_WIDTH * 0.025 }} />
                        {/*健康码*/}
                        <HealthCode userInfo={info} />
                    </Card>
                </View>
                <View
                    style={{
                        width: SCREEN_WIDTH,
                        height: SCREEN_WIDTH * 0.3,
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                        /*backgroundColor: '#f0f'/**/
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            height:'100%',
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <LargeVaccineView vaccinationStatus={info.vaccinationStatus} />
                    </View>
                    <View
                        style={{
                            flex: 1,
                            height:'100%',
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <LargeNucleicAcidView
                            recentNucleicTestTime={info.recentNucleicTestTime}
                        />
                    </View>
                </View>
                <TextInputTemplate label='查询对象身份证号' value={identityNumber.token}
                                   onChangeText={(identity: string) => setIdentityNumber(new IdentityNumber(identity))}/>

                <ButtonToSendMessage
                    icon = 'upload'
                    checkBeforeSendMessage={() => (checkIdentityNumber(identityNumber.token))}
                    checkElse={() => {
                        alert('请重新检查身份证号是否填写正确')
                    }}
                    toSendMessage={new UserGetOthersInfoMessage(token, identityNumber)}
                    ifSuccess={(reply:UserInformation)=>{
                        setInfo(reply)
                    }}
                    text='查看'
                />
                <StatusBar style="auto" />
            </ScrollTemplate>
        </ScreenTemplate>
    );
}
