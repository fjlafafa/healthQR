import React, {useState} from "react";
import {RealName} from "Types/UserMeta/RealName";
import {SendData} from "Utils/SendDataUtil";
import {UserGetRealNameMessage} from "Messages/UserMessages/UserGetRealNameMessage";
import {Token} from "Types/UserMeta/Token";
import {useFocusEffect} from "@react-navigation/native";
import {View} from "react-native";
import {SCREEN_WIDTH} from "Utils/SettingsAndConstants";
import {Card} from "react-native-paper";
import {RegisterCode} from "Utils/PageUtils/InfoQRCodeUtil";
import {clearUserToken, TokenStore} from "Globals/TokenStore";
import {ScreenTemplate, ScrollTemplate} from "Utils/PageUtils/PageContainerUtil";
import {ButtonTemplate} from "Utils/PageUtils/ButtonUtil";
import {ViewSwitcher} from "Pages/PageComponents/SuperUserPages/HomePages/HomePagesUtils/BarUtil";


export function SuperUserInfoPage({navigation}: any) {
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

    const goBack = () => {
        navigation.navigate('Login')
        clearUserToken()
    }
    return <ScreenTemplate goBack={goBack}>
        <ViewSwitcher state={'SuperUser.InfoQRCodePage'} navigation={navigation}/>
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
                onPress={() => {
                    navigation.navigate('Login')
                    clearUserToken()
                }}
                text={'退出登录'}
            />
        </ScrollTemplate>
    </ScreenTemplate>
}