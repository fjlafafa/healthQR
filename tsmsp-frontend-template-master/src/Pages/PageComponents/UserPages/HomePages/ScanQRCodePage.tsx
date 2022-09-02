import React, {useEffect, useState} from 'react'
import {Button, StyleSheet, Text, View} from 'react-native'
import {BarCodeScanner} from 'expo-barcode-scanner'
import {ButtonTemplate} from '../../../../Utils/PageUtils/ButtonUtil'
import {SendData} from '../../../../Utils/SendDataUtil'
import {UserUpdateTraceMessage} from '../../../../Impl/Messages/UserMessages/UserUpdateTraceMessage'
import {TokenStore} from '../../../../Globals/TokenStore'
import {ScreenTemplate} from '../../../../Utils/PageUtils/PageContainerUtil'
import {ViewSwitcher} from "./HomePagesUtils/BarUtil";

export function ScanQRCodePage({navigation}: any) {
    const [hasPermission, setHasPermission] = useState(null as (boolean | null))
    const [scanned, setScanned] = useState(false)
    const {token} = TokenStore()
    const report_type: string = 'Auto recorded'
    const detailed_desc: string = ''


    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync()
            setHasPermission(status === 'granted')
        }

        getBarCodeScannerPermissions()
    }, [])

    const handleBarCodeScanned = ({type, data}: any) => {
        setScanned(true)
        // alert(`Bar code with type ${type} and data ${data} has been scanned!`)
        const placeId = parseInt(data)
        if (isNaN(placeId)) {
            alert(`地点码格式不正确，请重新扫码！`)
            setTimeout(()=>setScanned(false),1000)
        } else {
            SendData(new UserUpdateTraceMessage(token, data, detailed_desc, report_type))
            navigation.navigate('Overview', {})
        }
    }
    return (
        <ScreenTemplate>
            <ViewSwitcher state={'ScanQRCode'} navigation={navigation}/>
            {
                (hasPermission === null) ? (
                    <Text>Requesting for camera permission</Text>
                ) : (
                    (!hasPermission) ? (
                        <ButtonTemplate
                            onPress={() => navigation.navigate('Overview', {})}
                            text='返回主页'
                        />
                    ) : (
                        <View style={{flex: 1, width: 1000, backgroundColor: '#ff0'}}>
                            <BarCodeScanner
                                onBarCodeScanned={(scanned ? undefined : handleBarCodeScanned)}
                                style={StyleSheet.absoluteFillObject}/>
                        </View>))
            }
        </ScreenTemplate>
    )
}