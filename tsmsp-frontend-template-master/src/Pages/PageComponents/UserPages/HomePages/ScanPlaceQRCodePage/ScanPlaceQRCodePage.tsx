import React, {useEffect, useState} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {Button} from 'react-native-paper'
import {BarCodeScanner} from 'expo-barcode-scanner'
import {ButtonTemplate} from '../../../../../Utils/PageUtils/ButtonUtil'
import {SendData} from '../../../../../Utils/SendDataUtil'
import {UserUpdateTraceMessage} from '../../../../../Impl/Messages/UserMessages/UserUpdateTraceMessage'
import {TokenStore} from '../../../../../Globals/TokenStore'
import {ScreenTemplate, ScrollTemplate} from '../../../../../Utils/PageUtils/PageContainerUtil'
import {ViewSwitcher} from "../HomePagesUtils/BarUtil";
import {SCREEN_WIDTH} from "../../../../../Utils/SettingsAndConstants";
import {PlaceScanView} from "./ScanPlaceQRCodeUtils/ScanViewUtil";
import {HeaderTemplate} from "../../../../../Utils/PageUtils/HeaderUtil";

export function ScanPlaceQRCodePage({navigation}: any) {
    const [cameraOn, setCamera]=useState(false)
    const {token} = TokenStore()

    const goBack=()=>navigation.navigate('User.Overview')

    return (
        <ScreenTemplate goBack={goBack}>
            <ViewSwitcher state={'User.ScanPlaceQRCode'} navigation={navigation}/>
            <ScrollTemplate>
                <View style={{
                    width: SCREEN_WIDTH,
                    height: SCREEN_WIDTH * 1.4,
                    alignItems: 'center',
                    justifyContent: 'center',/*backgroundColor: '#f0f'/**/
                }}>
                    {cameraOn?<PlaceScanView token={token}/>:<Button mode='text' onPress={()=>{setCamera(true)}}>点击开启地点扫码</Button>}
                </View>
                <ButtonTemplate onPress={()=>{
                    if(cameraOn)
                        setCamera(false)
                    else
                        setCamera(true)
                }}>
                    {cameraOn?<Text>点击关闭地点扫码</Text>:<Text>点击开启地点扫码</Text>}
                </ButtonTemplate>
                <HeaderTemplate text='行程相关微服务'/>
                <ButtonTemplate
                    onPress={()=>navigation.navigate('User.Trace')}
                    text='我的行程'
                />
            </ScrollTemplate>
        </ScreenTemplate>
    )
}