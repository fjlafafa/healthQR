import {ScreenTemplate} from "Utils/PageUtils/PageContainerUtil";
import {ButtonTemplate} from "Utils/PageUtils/ButtonUtil";

export function ThirdPartyOverviewPage({navigation}: any) {

    const goBack = () => navigation.navigate('Login')

    return <ScreenTemplate goBack={goBack}>
        <ButtonTemplate
            onPress={() => navigation.navigate('ThirdParty.NucleicAcid')}
            text='核酸'
        />
        <ButtonTemplate
            onPress={() => navigation.navigate('ThirdParty.VaccineRegister')}
            text='疫苗'
        />
        <ButtonTemplate
            onPress={() => navigation.navigate('ThirdParty.InfoQRCodePage')}
            text='展示信息'
        />
    </ScreenTemplate>
}