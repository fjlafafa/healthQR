import {} from "../../Utils/PageUtils/PageContainerUtil";
import {ButtonTemplate} from "../../Utils/PageUtils/ButtonUtil";
import {ScreenTemplate} from 'Utils/PageUtils/PageContainerUtil'
import React from "react";
import {PagesID} from "../PagesStack";

export function VaccinePage ({navigation}:any) {
    return <ScreenTemplate>
        <ButtonTemplate
        onPress={() => {
            navigation.navigate(PagesID.Overview,{})
        }}
        text = '返回主界面'/>

    </ScreenTemplate>
}