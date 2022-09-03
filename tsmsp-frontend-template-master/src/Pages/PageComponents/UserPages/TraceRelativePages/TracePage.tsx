import {ButtonTemplate} from "../../../../Utils/PageUtils/ButtonUtil";
import {ScreenTemplate} from "../../../../Utils/PageUtils/PageContainerUtil";

export function TracePage({navigation}:any){
    const goBack=()=>navigation.navigate('User.ScanPlaceQRCode')

    return <ScreenTemplate goBack={goBack}>
        <ButtonTemplate
            onPress={()=>navigation.navigate('User.ModifyTrace')}
            text='修改我的行程'
        />
    </ScreenTemplate>
}