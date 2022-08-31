import QRCode from 'react-native-qrcode-svg'
import React from 'react'
import {ButtonTemplate} from 'Utils/PageUtils/ButtonUtil'
import {TokenStore} from 'Globals/TokenStore'
import {ScreenTemplate} from 'Utils/PageUtils/PageContainerUtil'
import {} from 'Utils/PageUtils/PageContainerUtil'
import {PagesID} from "../PagesStack";
//Not Used
export function QRCodePage({navigation}:any) {
    const {token} = TokenStore()
    const avatar = require('Assets/icon.png')
    return (
        <ScreenTemplate>
            <QRCode
                value={token}
                logo={avatar}
                color='blue'
            />
            <ButtonTemplate
                onPress = {()=>navigation.navigate(PagesID.Overview,{})}
                text = '返回主页'/>
        </ScreenTemplate>
    )
}