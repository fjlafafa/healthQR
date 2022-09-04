import React from "react";
import {BarCodeScanner} from "expo-barcode-scanner";
import {StyleSheet, Text, View} from "react-native";

export class ScanView extends React.Component<any, any> {
    defaultProps={
        checkData:(dataJson:any)=>true,
        handleData:(dataJson:any)=>{}
    }
    constructor(props:any) {
        super(props)
        this.state={
            permission:null as (boolean | null),
            scanned:false,
        }
    }
    componentDidMount() {
        const getBarCodeScannerPermissions = async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync()
            this.setState({permission:status === 'granted'})
        }

        getBarCodeScannerPermissions()
    }
    render(){

        const handleBarCodeScanned = ({type, data}: any) => {
            this.setState({scanned:true})
            // alert(`Bar code with type ${type} and data ${data} has been scanned!`)
            if (this.props.checkData(data)) {
                this.props.handleData(data)
            } else {
                alert(`格式不正确，请重新扫码！`)
                setTimeout(() => this.setState({scanned:false}), 2000)
            }
        }
        if (this.state.permission == null) {
            return <Text>请求相机权限中</Text>
        } else if (!this.state.permission) {
            return <Text>请设置相机权限开启</Text>
        } else {
            return <View style={{flex: 1, width: 1000,/* backgroundColor: '#ff0'/**/}}>
                <BarCodeScanner
                    onBarCodeScanned={(this.state.scanned ? undefined : handleBarCodeScanned)}
                    style={StyleSheet.absoluteFillObject}/>
            </View>
        }
    }
}