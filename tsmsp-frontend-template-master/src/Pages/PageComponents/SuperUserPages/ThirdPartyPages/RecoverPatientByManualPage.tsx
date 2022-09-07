import {ScreenTemplate} from "Utils/PageUtils/PageContainerUtil";
import {TextInputTemplate} from "Utils/PageUtils/TextInputUtil";
import {ButtonToSendMessage} from "Utils/PageUtils/ButtonUtil";
import {checkIdentityNumber} from "Utils/FormatUtils/IdentityNumberUtil";
import {HospitalUpdateNucleicTestMessage} from "Messages/ThirdPartyMessages/HospitalUpdateNucleicTestMessage";
import {IdentityNumber} from "Types/UserMeta/IdentityNumber";
import React, {useState} from "react";
import {TokenStore} from "Globals/TokenStore";

export function RecoverPatientByManualPage({navigation}:any){
    const [identity, setIdentity] = useState(new IdentityNumber(''))
    const {token} = TokenStore.getState()
    const goBack = () => navigation.navigate('ThirdParty.Overview')
    return <ScreenTemplate goBack={goBack}>
        <TextInputTemplate label='恢复人身份证号' value={identity.token}
                           onChangeText={(identity: string) => setIdentity(new IdentityNumber(identity))}/>

        <ButtonToSendMessage
            icon = 'upload'
            checkBeforeSendMessage={() => (checkIdentityNumber(identity.token))}
            checkElse={() => {
                alert('请重新检查身份证号是否填写正确')
            }}
            toSendMessage={new HospitalUpdateNucleicTestMessage(token, identity)}
            text='上传'
        />
    </ScreenTemplate>

}