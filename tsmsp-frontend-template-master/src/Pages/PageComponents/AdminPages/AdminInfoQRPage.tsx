import React, {useState} from "react";
import {RealName} from "Types/UserMeta/RealName";
import {SendData} from "Utils/SendDataUtil";
import {UserGetRealNameMessage} from "Messages/UserMessages/UserGetRealNameMessage";
import {Token} from "Types/UserMeta/Token";
import {useFocusEffect} from "@react-navigation/native";
import {ViewSwitcher} from "Pages/PageComponents/UserPages/HomePages/HomePagesUtils/BarUtil";
import {View} from "react-native";
import {SCREEN_WIDTH} from "Utils/SettingsAndConstants";
import {Card} from "react-native-paper";
import {RegisterCode} from "Utils/PageUtils/InfoQRCodeUtil";
import {TextTemplate} from "Utils/PageUtils/TextUtil";
import {clearUserToken, TokenStore} from "Globals/TokenStore";
import {ScreenTemplate, ScrollTemplate} from "Utils/PageUtils/PageContainerUtil";
import {ButtonTemplate} from "Utils/PageUtils/ButtonUtil";


export function AdminInfoQRCodePage({navigation}: any) {
    const {token} = TokenStore()
    const [realName, setRealName] = useState(new RealName(''))
    const refresh = () => {
        SendData(
            new UserGetRealNameMessage(new Token(token)),
            (reply: RealName) => {
                setRealName(reply)
            })
    }
    useFocusEffect(React.useCallback(refresh, []))

    const goBack = () => navigation.navigate('Admin.Overview')
    return <ScreenTemplate goBack={goBack}>
        <ScrollTemplate>
            <View style={{
                width: SCREEN_WIDTH,
                height: SCREEN_WIDTH * 1.1,
                alignItems: 'center',
                justifyContent: 'center',/*backgroundColor: '#f0f'/**/
            }}>
                <Card style={{width: '95%', height: '95%', alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{height: SCREEN_WIDTH * 0.025}}/>
                    {/*核酸登记码*/}
                    <View style={{
                        height: SCREEN_WIDTH * 0.9,
                        width: SCREEN_WIDTH * 0.95,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>

                        <RegisterCode
                            userInfo={{realName: realName, token: new Token(token)}}
                        />
                    </View>
                </Card>
            </View>
            <ButtonTemplate
                onPress={()=> {
                    navigation.navigate('Login')
                    clearUserToken()
                }}
                text={'退出登录'}
            />

        </ScrollTemplate>
    </ScreenTemplate>
}