import React from 'react'
import {ButtonTemplate} from 'Utils/PageUtils/ButtonUtil'
import {TextInputTemplate} from 'Utils/PageUtils/TextInputUtil'
import {ScreenTemplate} from 'Utils/PageUtils/PageContainerUtil'
import {PlaceIdStore, setPlaceId} from "Globals/PlaceIdStore";
import {View} from "react-native";
import {SCREEN_WIDTH} from "Utils/SettingsAndConstants";
import QRCode from "react-native-qrcode-svg";
import {Card} from "react-native-paper";
import {LargeTextTemplate} from "Utils/PageUtils/TextUtil";
import {SmallSpace} from "Utils/PageUtils/SpaceUtil";

//import Select from 'react-select'


export function GeneratePlaceQRPage({navigation}: any) {

    //const values
    const {PlaceId} = PlaceIdStore()
    const avatar = require('Assets/icon.png')

    const goBack = () => navigation.navigate('Admin.Overview')

    return <ScreenTemplate goBack={goBack}>
        <View style={{
            width: SCREEN_WIDTH,
            height: SCREEN_WIDTH,
            alignItems: 'center',
            justifyContent: 'center',
        }}>

            <View style={{height: SCREEN_WIDTH * 0.15}}/>

            <Card style={{width: '95%', height: '13%', alignItems: 'center'}}>
                <SmallSpace/>
                <LargeTextTemplate> 请输入地点代码以查询二维码 </LargeTextTemplate>
            </Card>


            <View style={{height: SCREEN_WIDTH * 0.03}}/>

            <Card style={{width: '95%', height: '12%', alignItems: 'center'}}>
                <SmallSpace/>

                <TextInputTemplate placeholder={'地点代码'} value={PlaceId}
                                   onChangeText={(newText: string) => setPlaceId(newText)}/>
            </Card>

            <SmallSpace/>

            {/*<Select options={options}/>*/}

            <SmallSpace/>

            <Card style={{width: '95%', height: '95%', alignItems: 'center'}}>
                <View style={{height: SCREEN_WIDTH * 0.075}}/>

                <QRCode
                    value={PlaceId}
                    logo={avatar}
                    backgroundColor={"#ffffff"}
                    size={SCREEN_WIDTH * 0.8}
                    color={'#66d398'}/>
            </Card>

            <SmallSpace/>

            <ButtonTemplate
                icon = 'home'
                onPress={() => {
                    navigation.navigate('User.Overview')
                }}
                text='返回主界面'/>

        </View>


    </ScreenTemplate>
}

