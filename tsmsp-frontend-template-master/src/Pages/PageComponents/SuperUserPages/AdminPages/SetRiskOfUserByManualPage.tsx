import {TokenStore} from "Globals/TokenStore";
import React, {useState} from "react";
import {UserId} from "Types/UserMeta/UserId";
import {UserRiskLevel} from "Types/UserMeta/UserRiskLevel";
import {View} from "react-native";
import {TextInputTemplate} from "Utils/PageUtils/TextInputUtil";
import {ButtonGroup} from "Utils/PageUtils/ButtonGroupUtil";
import {Roles} from "Types/UserMeta/Roles";
import {ButtonToSendMessage} from "Utils/PageUtils/ButtonUtil";
import {GovernorUpdateRiskOfUserMessage} from "Messages/AdminMessages/GovernorUpdateRiskOfUserMessage";
import {ScreenTemplate} from "Utils/PageUtils/PageContainerUtil";
import {IdentityNumber} from "Types/UserMeta/IdentityNumber";

export function SetRiskOfUserByManualPage({navigation}:any) {

    const goBack = () => navigation.navigate('Admin.Overview')
    const {token} = TokenStore()
    const [userId, setUserId] = useState(new IdentityNumber(''))
    const [riskLevel, setUserRiskLevel] = useState(UserRiskLevel.red)

    return <ScreenTemplate goBack={goBack}>
        <View style={{height: 30}}/>
        <TextInputTemplate label='用户身份证号' value={userId.token}
                           onChangeText={(id: string) => setUserId(new IdentityNumber(id))}/>

        <ButtonGroup chosen={riskLevel.toString()} subprops={[
            {
                name: UserRiskLevel.green.toString(),
                onPress: () => setUserRiskLevel(UserRiskLevel.green),
            }, {
                name: UserRiskLevel.popUps.toString(),
                onPress: () => setUserRiskLevel(UserRiskLevel.popUps),
            }, {
                name: UserRiskLevel.yellow.toString(),
                onPress: () => setUserRiskLevel(UserRiskLevel.yellow),
            }, {
                name: UserRiskLevel.red.toString(),
                onPress: () => setUserRiskLevel(UserRiskLevel.red),
            }
        ]}/>
        <ButtonToSendMessage
            icon='upload'
            toSendMessage={new GovernorUpdateRiskOfUserMessage(token, userId, riskLevel)}
            text='上传'
        />
    </ScreenTemplate>
}