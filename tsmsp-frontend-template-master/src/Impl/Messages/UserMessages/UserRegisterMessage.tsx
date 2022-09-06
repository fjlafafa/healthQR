import {TSMSPMessage} from '../TSMSPMessage'
import {RealName} from "Types/UserMeta/RealName";
import {Password} from "Types/UserMeta/Password";
import {IdentityNumber} from "Types/UserMeta/IdentityNumber";
import {Roles} from "Types/UserMeta/Roles";
import {SecurityQuestion} from "Types/UserMeta/SecurityQuestion";
import {SecurityAnswer} from "Types/UserMeta/SecurityAnswer";

export class UserRegisterMessage extends TSMSPMessage {
    realName: RealName
    password: Password
    identityNumber: IdentityNumber
    permission: Roles
    securityQuestion: SecurityQuestion
    securityAnswer: SecurityAnswer

    constructor(realName: RealName, password: Password, identityNumber: IdentityNumber, securityQuestion: SecurityQuestion, securityAnswer: SecurityAnswer) {
        super()
        this.realName = realName
        this.password = password
        this.identityNumber = identityNumber
        this.permission = Roles.user
        this.securityQuestion = securityQuestion
        this.securityAnswer = securityAnswer
    }
}