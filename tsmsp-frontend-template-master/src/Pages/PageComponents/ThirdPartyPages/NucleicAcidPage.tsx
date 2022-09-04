import {ScreenTemplate} from "../../../Utils/PageUtils/PageContainerUtil";

export function NucleicAcidPage({navigation}:any){


    const goBack=()=>navigation.navigate('ThirdParty.Overview')

    return <ScreenTemplate goBack={goBack}>
    </ScreenTemplate>
}