import {TSMSPMessage} from "Messages/TSMSPMessage";
import {Token} from "Types/UserMeta/Token";
import {SecurityQuestion} from "Types/UserMeta/SecurityQuestion";

export class UserUpdateSecurityQuestionMessage extends TSMSPMessage{
    userToken: Token
    securityQuestion:SecurityQuestion

    constructor(userToken: Token, securityQuestion:SecurityQuestion) {
        super();
        this.userToken=userToken
        this.securityQuestion=securityQuestion
    }
}