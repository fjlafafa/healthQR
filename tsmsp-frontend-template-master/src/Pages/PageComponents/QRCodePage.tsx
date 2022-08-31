import QRCode from 'react-native-qrcode-svg'
import React from 'react'
import {ButtonTemplate} from 'Utils/PageUtils/ButtonUtil'
import {TokenStore} from 'Globals/TokenStore'
import {ScreenTemplate} from 'Utils/PageUtils/PageContainerUtil'
import {} from 'Utils/PageUtils/PageContainerUtil'
//Not Used
export function QRCodePage({navigation}:any) {
    const {token} = TokenStore()
    const avatar = require('Assets/icon.png')
    return (
        <ScreenTemplate>
            <QRCode
                value={token}
                logo={avatar}
                color='green'
            />
            <ButtonTemplate
                onPress = {()=>navigation.navigate('Overview',{})}
                text = '返回主页'/>
        </ScreenTemplate>
    )
}