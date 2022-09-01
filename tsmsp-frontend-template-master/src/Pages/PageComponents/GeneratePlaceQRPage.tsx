import React from 'react'
import {StatusBar} from 'expo-status-bar'
import create from 'zustand'
import {ButtonTemplate, ButtonToSendMessage} from 'Utils/PageUtils/ButtonUtil'
import {TSMSPReply} from '../../Impl/TSMSPReply'
import {TextInputTemplate} from 'Utils/PageUtils/TextInputUtil'
import {ScreenTemplate} from 'Utils/PageUtils/PageContainerUtil'
import {setPlaceId, PlaceIdStore} from "../../Globals/PlaceIdStore";
import {PagesID} from "../PagesID";
import {} from "../../Globals/PlaceIdStore";
import {View} from "react-native";
import {SCREEN_WIDTH} from "../../Utils/Styles";
import QRCode from "react-native-qrcode-svg";
import {Card} from "react-native-paper";
import {LargeTextTemplate} from "../../Utils/PageUtils/TextUtil";
import {SmallSpace} from "../../Utils/PageUtils/SpaceUtil";



export function GeneratePlaceQRPage({ navigation }: any){

    //const values
    const {id} = PlaceIdStore()
    const avatar = require('Assets/icon.png')

    return <ScreenTemplate>
        <View style={{
            width: SCREEN_WIDTH,
            height: SCREEN_WIDTH,
            alignItems: 'center',
            justifyContent: 'center',
        }}>

            <View style={{height: SCREEN_WIDTH * 0.15 }}/>

            <Card style={{width: '95%', height: '13%', alignItems: 'center'}}>
                <SmallSpace/>
                <LargeTextTemplate>  请输入地点代码以查询二维码 </LargeTextTemplate>
            </Card>

            <View style={{ height: SCREEN_WIDTH * 0.03}}/>

            <Card style={{width: '95%', height: '12%', alignItems: 'center'}}>
                <SmallSpace/>

                <TextInputTemplate placeholder={'地点代码'} value={id} onChangeText={(newText: string)=>setPlaceId(newText)}/>
            </Card>

            <SmallSpace/>

            <ButtonTemplate
                onPress={() => {
                    navigation.navigate(PagesID.PlaceQR,{})
                }}
                text = '刷新二维码'/>

            <Card style={{width: '95%', height: '95%', alignItems: 'center'}}>
                <View style={{height: SCREEN_WIDTH * 0.075}}/>

                <QRCode
                    value={id}
                    logo={avatar}
                    backgroundColor={"#ffffff"}
                    size={SCREEN_WIDTH * 0.8}
                    color= {'#66d398'}/>
            </Card>

            <SmallSpace/>

            <ButtonTemplate
                onPress={() => {
                    navigation.navigate(PagesID.Overview,{})
                }}
                text = '返回主界面'/>

        </View>




    </ScreenTemplate>
}

