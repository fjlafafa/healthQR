import {ScreenTemplate} from "Utils/PageUtils/PageContainerUtil";
import {identity} from "react-native-svg/lib/typescript/lib/Matrix2D";
import React, {useState} from "react";
import {IdentityNumber} from "Types/UserMeta/IdentityNumber";
import {SecurityQuestion} from "Types/UserMeta/SecurityQuestion";
import {SecurityAnswer} from "Types/UserMeta/SecurityAnswer";
import {TextInputTemplate} from "Utils/PageUtils/TextInputUtil";
import { SendData } from "Utils/SendDataUtil";
import {UserGetSecurityQuestionMessage} from "Messages/UserMessages/UserGetSecurityQuestionMessage";
import {ButtonToSendMessage} from "Utils/PageUtils/ButtonUtil";
import {UserSendSecurityAnswerMessage} from "Messages/UserMessages/UserSendSecurityAnswerMessage";
import {setUserToken} from "Globals/TokenStore";
import {Token} from "Types/UserMeta/Token";
import {UserLogin} from "Utils/LoginUtils";

export function FindPasswordPage({navigation}:any){
    const [identityNumber, setIdentityNumber]=useState(new IdentityNumber(''))
    const [securityQuestion, setSecurityQuestion]=useState(new SecurityQuestion(''))
    const [securityAnswer, setSecurityAnswer]=useState(new SecurityAnswer(''))
    const clearPageInfo=()=>{
        setIdentityNumber(new IdentityNumber(''))
        setSecurityQuestion(new SecurityQuestion(''))
        setSecurityAnswer(new SecurityAnswer(''))
    }

    const goBack=()=>{
        navigation.navigate('Login')
        clearPageInfo()
    }
    return <ScreenTemplate goBack={goBack}>

        <TextInputTemplate label={'身份证号'} value={identityNumber.token}
                           onChangeText={(newText: string) => setIdentityNumber(new IdentityNumber(newText))}/>
        <ButtonToSendMessage
            toSendMessage={new UserGetSecurityQuestionMessage(identityNumber)}
            ifSuccess={(reply:SecurityQuestion)=>setSecurityQuestion(reply)}
            text={'查询身份证号对应安全问题'}
        />

        <TextInputTemplate label={'安全问题'} value={securityQuestion.name}
                           onChangeText={(newText: string) => setSecurityQuestion(new SecurityQuestion(newText))}
                           disabled={true}/>
        <TextInputTemplate label={'安全问题回答'} value={securityAnswer.token}
                           onChangeText={(newText: string) => setSecurityAnswer(new SecurityAnswer(newText))}/>
        <ButtonToSendMessage
            toSendMessage={new UserSendSecurityAnswerMessage(identityNumber,securityAnswer)}
            ifSuccess={(reply:Token)=>{
                setUserToken(reply.token)
                UserLogin(navigation,reply, clearPageInfo)
                alert('请尽快重新设置密码')
            }}
            text={'提交安全问题回答'}
        />
    </ScreenTemplate>
}