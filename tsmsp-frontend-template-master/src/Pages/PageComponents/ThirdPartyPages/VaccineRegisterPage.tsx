import {ScreenTemplate} from "../../../Utils/PageUtils/PageContainerUtil";
import {ButtonTemplate, ButtonToSendMessage} from "../../../Utils/PageUtils/ButtonUtil";

export function VaccineRegisterPage({navigation}:any){

    const goBack=()=>navigation.navigate('ThirdParty.Overview')


    return <ScreenTemplate goBack={goBack}>
        <ButtonToSendMessage

            />


    </ScreenTemplate>
}