import {ScreenTemplate} from "../../../Utils/PageUtils/PageContainerUtil";
import {ButtonTemplate} from "../../../Utils/PageUtils/ButtonUtil";
import {ScanView} from "Utils/PageUtils/ScanQRCodeUtil";
import {TraceId} from "Types/TraceMeta/TraceId";
import {SCREEN_WIDTH} from "Utils/SettingsAndConstants";
import QRCode from "react-native-qrcode-svg";
import React from "react";
import {TextTemplate} from "Utils/PageUtils/TextUtil";

export function PermissionPage({navigation}: any) {

    const goBack = () => navigation.navigate('Admin.Overview')

    const testdata = JSON.stringify(new TraceId(123))
    //const testdata='{"fid":{"dick":123321}}'

    return <ScreenTemplate goBack={goBack}>
        <ScanView/>
        <TextTemplate>{testdata}</TextTemplate>
        <QRCode
            value={JSON.stringify(testdata)}
            size={SCREEN_WIDTH * 0.8}
        />
    </ScreenTemplate>
}