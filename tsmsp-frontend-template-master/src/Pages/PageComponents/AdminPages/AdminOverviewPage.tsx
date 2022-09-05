import {ScreenTemplate} from "Utils/PageUtils/PageContainerUtil";
import {ButtonTemplate} from "Utils/PageUtils/ButtonUtil";

export function AdminOverviewPage({navigation}: any) {
    const goBack = () => {
        navigation.navigate('Login')
    }

    return <ScreenTemplate goBack={goBack}>
        <ButtonTemplate
            onPress={() => navigation.navigate('Admin.GeneratePlaceQR')}
            text='生成地点码'
        />
        <ButtonTemplate
            onPress={() => navigation.navigate('Admin.Permission')}
            text='设置用户权限'
        />
        <ButtonTemplate
            onPress={() => navigation.navigate('Admin.InfoQRCodePage')}
            text='展示信息'
        />
    </ScreenTemplate>
}