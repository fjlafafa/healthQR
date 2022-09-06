import React, {useState} from 'react'
import {ButtonTemplate, ButtonToSendMessage} from 'Utils/PageUtils/ButtonUtil'
import {TextInputTemplate} from 'Utils/PageUtils/TextInputUtil'
import {ScreenTemplate} from 'Utils/PageUtils/PageContainerUtil'
import {View} from "react-native";
import {SCREEN_WIDTH} from "Utils/SettingsAndConstants";
import QRCode from "react-native-qrcode-svg";
import {Card} from "react-native-paper";
import {LargeTextTemplate} from "Utils/PageUtils/TextUtil";
import {SmallSpace} from "Utils/PageUtils/SpaceUtil";
import {PlaceId} from "Types/PlaceMeta/PlaceId";
import {UserGetPlaceMessage} from "Messages/UserMessages/UserGetPlaceMessage";
import {TokenStore} from "Globals/TokenStore";
import {Place} from "Types/Place";
import {Province} from "Types/PlaceMeta/Province";
import {DetailedPlaceDescription} from "Types/PlaceMeta/DetailedPlaceDescription";
import {PlaceRiskLevel} from "Types/PlaceMeta/PlaceRiskLevel";
import {City} from "Types/PlaceMeta/City";
import {District} from "Types/PlaceMeta/District";
import {SubDistrict} from "Types/PlaceMeta/SubDistrict";
import {Token} from "Types/UserMeta/Token";

//import Select from 'react-select'


export function GeneratePlaceQRPage({navigation}: any) {

    //const values
    const [placeId,setPlaceId]=useState(new PlaceId(0))
    const [placeIdShowed,setPlaceIdShowed]=useState(new PlaceId(0))
    const [placeShowed,setPlaceShowed]=useState(new Place(new PlaceId(0),new Province(''),new City(''),new District(''),new SubDistrict(''),PlaceRiskLevel.red))
    const avatar = require('Assets/icon.png')

    const goBack = () => navigation.navigate('Admin.Overview')
    const {token}=TokenStore()

    return <ScreenTemplate goBack={goBack}>
        {/*ts-ignore*/}
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
                                   onChangeText={(newText: string) => {
                                       try {
                                           setPlaceId(new PlaceId(parseInt(newText)))
                                       } catch(e) {
                                           alert('请输入合法字符')
                                       }
                                   }}/>
            </Card>

            <SmallSpace/>

            <SmallSpace/>

            <Card style={{width: '95%', height: '95%', alignItems: 'center'}}>
                <View style={{height: SCREEN_WIDTH * 0.075}}/>

                <QRCode
                    value={JSON.stringify(placeIdShowed)}
                    logo={avatar}
                    backgroundColor={"#ffffff"}
                    size={SCREEN_WIDTH * 0.8}
                    color={'#66d398'}/>
            </Card>

            <SmallSpace/>
            <ButtonToSendMessage
                text={'查验并生成地点码'}
                toSendMessage={new UserGetPlaceMessage(new Token(token),[placeIdShowed])}
                ifSuccess={(place:Place[])=>{
                    setPlaceIdShowed(place[0].id)
                    setPlaceShowed(place[0])
                }
                }/>
            <TextInputTemplate disabled={true} value={placeShowed.province.name+placeShowed.city.name+placeShowed.district.name+placeShowed.subDistrict.name} label={'地点'}/>

        </View>


    </ScreenTemplate>
}

