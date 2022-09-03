import React, {useEffect, useState} from "react";
import {TokenStore} from "../../../../../../Globals/TokenStore";
import {BarCodeScanner} from "expo-barcode-scanner";
import {SendData} from "../../../../../../Utils/SendDataUtil";
import {UserUpdateTraceMessage} from "../../../../../../Impl/Messages/UserMessages/UserUpdateTraceMessage";
import {StyleSheet, Text, View} from "react-native";
import {ScanView} from "../../../../../../Utils/PageUtils/ScanQRCodeUtil";

export function PlaceScanView(props: any) {
    const report_type: string = 'Auto recorded'
    const detailed_desc: string = ''
    return <ScanView
        checkData={(data: any) => !isNaN(parseInt(data))}
        handleData={(data: any) => {
            SendData(new UserUpdateTraceMessage(props.token, data, detailed_desc, report_type))
        }
        }/>
}

/*
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
        setTimeout(() => setScanned(false), 1000)
    } else {
    }
}

if (hasPermission == null) {
    return <Text>请求相机权限中</Text>
} else if (!hasPermission) {
    return <Text>请设置相机权限开启</Text>
} else {
    return <View style={{flex: 1, width: 1000,/* backgroundColor: '#ff0'}}>
<BarCodeScanner
onBarCodeScanned={(scanned ? undefined : handleBarCodeScanned)}
style={StyleSheet.absoluteFillObject}/>
</View>
}
}
}*/