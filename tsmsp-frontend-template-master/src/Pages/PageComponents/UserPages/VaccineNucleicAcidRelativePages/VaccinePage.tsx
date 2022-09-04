import {} from "../../../../Utils/PageUtils/PageContainerUtil";
import {ButtonTemplate} from "../../../../Utils/PageUtils/ButtonUtil";
import {ScreenTemplate} from '../../../../Utils/PageUtils/PageContainerUtil'
import React from "react";

export function VaccinePage ({navigation}:any) {
    const goBack=()=>navigation.navigate('User.RegisterQRCode')
    return <ScreenTemplate goBack={goBack}>
        <ButtonTemplate
        onPress={() => navigation.navigate('User.ModifyVaccine')}
        text = '修改我的疫苗核酸信息'/>

    </ScreenTemplate>
}