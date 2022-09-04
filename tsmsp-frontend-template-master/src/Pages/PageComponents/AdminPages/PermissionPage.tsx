import {ScreenTemplate} from "../../../Utils/PageUtils/PageContainerUtil";
import {ButtonTemplate} from "../../../Utils/PageUtils/ButtonUtil";

export function PermissionPage({navigation}:any){

    const goBack=()=>navigation.navigate('Admin.Overview')

    return <ScreenTemplate goBack={goBack}>
    </ScreenTemplate>
}