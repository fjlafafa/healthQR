import QRCode from 'react-native-qrcode-svg'
import React from 'react'
import {ButtonTemplate} from '../../../Utils/PageUtils/ButtonUtil'
import {TokenStore} from '../../../Globals/TokenStore'
import {ScreenTemplate} from '../../../Utils/PageUtils/PageContainerUtil'
import {} from '../../../Utils/PageUtils/PageContainerUtil'
import {ViewSwitcher} from "./HomePagesUtils/BarUtil";
import {View} from "react-native";
import {SCREEN_WIDTH} from "../../../Utils/Styles";
import {Card} from "react-native-paper";

export function RegisterQRCodePage({navigation}:any) {
    const {token} = TokenStore()
    const avatar = require('../../../Assets/icon.png')
    return (<ScreenTemplate>
        <ViewSwitcher state={'RegisterQRCode'} navigation={navigation}/>
            <Card style={{width: '95%', height: '95%', alignItems: 'center'}}>
                <View style={{height: SCREEN_WIDTH * 0.025}}/>
                {/*健康码*/}

                {/*To implement*/}
                <QRCode
                    value={token}
                    logo={avatar}
                    size={SCREEN_WIDTH * 0.9}
                    color='red'
                />

            </Card>
        </ScreenTemplate>
    )
}