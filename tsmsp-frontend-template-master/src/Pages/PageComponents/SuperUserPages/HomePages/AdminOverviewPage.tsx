import {ScreenTemplate, ScrollTemplate} from "Utils/PageUtils/PageContainerUtil";
import {ButtonTemplate} from "Utils/PageUtils/ButtonUtil";
import {ViewSwitcher} from "Pages/PageComponents/SuperUserPages/HomePages/HomePagesUtils/BarUtil";
import React from "react";

export function AdminOverviewPage({navigation}: any) {
    const goBack = () => {
        navigation.navigate('SuperUser.InfoQRCodePage')
    }

    return <ScreenTemplate goBack={goBack}>
        <ViewSwitcher state={'Admin.Overview'} navigation={navigation}/>
        <ScrollTemplate>
        <ButtonTemplate
            icon = 'qrcode'
            onPress={() => navigation.navigate('Admin.GeneratePlaceQR')}
            text='生成地点码'
        />
        <ButtonTemplate
            icon = 'account-cog'
            onPress={() => navigation.navigate('Admin.Permission')}
            text='设置用户权限'
        />
        </ScrollTemplate>
    </ScreenTemplate>
}