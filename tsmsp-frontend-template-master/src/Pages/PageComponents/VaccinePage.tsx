import {PageContainerTemplate} from "../../Utils/PageUtils/PageContainerUtil";
import {ButtonTemplate} from "../../Utils/PageUtils/ButtonUtil";
import React from "react";

export function VaccinePage ({navigation}:any) {
    return <PageContainerTemplate>
        <ButtonTemplate
        onPress={() => {
            navigation.navigate('Overview',{})
        }}
        text = '返回主界面'/>

    </PageContainerTemplate>
}