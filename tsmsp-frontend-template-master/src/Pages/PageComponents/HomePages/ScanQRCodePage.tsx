import React, {useEffect, useState} from 'react'
import {Button, StyleSheet, Text, View} from 'react-native'
import {BarCodeScanner} from 'expo-barcode-scanner'
import {ButtonTemplate} from '../../../Utils/PageUtils/ButtonUtil'
import {SendData} from '../../../Utils/SendDataUtil'
import {UserUpdateTraceMessage} from '../../../Impl/Messages/UserUpdateTraceMessage'
import {TokenStore} from '../../../Globals/TokenStore'
import {ScreenTemplate} from '../../../Utils/PageUtils/PageContainerUtil'
import {PagesID} from "../../PagesID";

export  function ScanQRCodePage({navigation}:any) {
    const [hasPermission, setHasPermission] = useState(null as (boolean |null))
    const [scanned, setScanned] = useState(false)
    const {token} = TokenStore()
    const report_type : string = 'Auto recorded'
    const detailed_desc : string = ''

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync()
            setHasPermission(status === 'granted')
        }

        getBarCodeScannerPermissions()
    }, [])

    const handleBarCodeScanned = ({type, data} : any) => {
        setScanned(true)
        // alert(`Bar code with type ${type} and data ${data} has been scanned!`)
        const placeId = parseInt(data)
        if(isNaN(placeId))
            alert(`地点码格式不正确，请重新扫码！`)
        else
            SendData(new UserUpdateTraceMessage(token, data, detailed_desc, report_type))
    }

    if (hasPermission === null)
        return <Text>Requesting for camera permission</Text>
    else if (!hasPermission)
        return <Text>No access to camera</Text>

    return (
        <ScreenTemplate>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />

            <ButtonTemplate
                onPress = {()=>navigation.navigate(PagesID.Overview,{})}
                text = '返回主页'/>
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </ScreenTemplate>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
})
