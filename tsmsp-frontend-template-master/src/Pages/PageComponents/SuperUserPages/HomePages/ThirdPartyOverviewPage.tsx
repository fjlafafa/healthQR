import {ScreenTemplate, ScrollTemplate} from "Utils/PageUtils/PageContainerUtil";
import {ButtonTemplate} from "Utils/PageUtils/ButtonUtil";
import {ViewSwitcher} from "Pages/PageComponents/SuperUserPages/HomePages/HomePagesUtils/BarUtil";
import React from "react";

export function ThirdPartyOverviewPage({navigation}: any) {

    const goBack = () => navigation.navigate('SuperUser.InfoQRCodePage')

    return <ScreenTemplate goBack={goBack}>
        <ViewSwitcher state={'ThirdParty.Overview'} navigation={navigation}/>
        <ScrollTemplate>
        <ButtonTemplate
            icon = 'test-tube'
            onPress={() => navigation.navigate('ThirdParty.NucleicAcid')}
            text='核酸'
        />
        <ButtonTemplate
            icon = 'needle'
            onPress={() => navigation.navigate('ThirdParty.VaccineRegister')}
            text='疫苗'
        />
        <ButtonTemplate
            onPress={() => navigation.navigate('ThirdParty.InfoQRCodePage')}
            text='展示信息'
        />
        </ScrollTemplate>
    </ScreenTemplate>
}