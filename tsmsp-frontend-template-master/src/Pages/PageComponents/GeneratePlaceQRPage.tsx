import React from 'react'
import Text from 'react-native-paper'
import {StatusBar} from 'expo-status-bar'
import create from 'zustand'
import {setUserToken} from 'Globals/TokenStore'
import {UserLoginMessage} from 'Impl/Messages/UserLoginMessage'
import {ButtonTemplate, ButtonToSendMessage} from 'Utils/PageUtils/ButtonUtil'
import {TextClock} from 'Utils/PageUtils/ClockUtil'
import {AllowAdmin} from 'Globals/GlobalVariables'
import {TSMSPReply} from 'Impl/Replies/TSMSPReply'
import {TextInputTemplate} from 'Utils/PageUtils/TextInputUtil'
import {ScreenTemplate} from 'Utils/PageUtils/PageContainerUtil'
import {TextTemplate} from '../../Utils/PageUtils/TextUtil'
import {Dimensions, View} from 'react-native'
import {Appbar, Button, Dialog, Paragraph, Portal, Provider} from 'react-native-paper'
import {myscreen, SCREEN_WIDTH} from '../../Utils/Styles'
import {PagesID} from "../PagesID";
import {} from "../../Globals/PlaceIdStore";

export function GeneratePlaceQRPage({ navigation }: any){
    z<TextInputTemplate placeholder={'地点id'} value={placeId} onChangeText={(newText: string)=>setPlaceId(newText)}/>




}
