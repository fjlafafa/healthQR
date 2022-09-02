import {} from "../../../../Utils/PageUtils/PageContainerUtil";
import {ButtonTemplate} from "../../../../Utils/PageUtils/ButtonUtil";
import {ScreenTemplate} from '../../../../Utils/PageUtils/PageContainerUtil'
import React from "react";

export function VaccinePage ({navigation}:any) {
    return <ScreenTemplate>
        <ButtonTemplate
        onPress={() => {
            navigation.navigate('Overview',{})
        }}
        text = '返回主界面'/>

    </ScreenTemplate>
}