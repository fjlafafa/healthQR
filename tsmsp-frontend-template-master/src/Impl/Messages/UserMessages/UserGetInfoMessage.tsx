import {TSMSPMessage} from "../TSMSPMessage";
import {TSMSPReply} from "../../TSMSPReply";
import {Trace} from "../../../Types/Trace";
import {Place} from "../../../Types/Place";
import {Token} from "Types/UserMeta/Token";
import {PlaceId} from "Types/PlaceMeta/PlaceId";
import {UserInformation} from "Types/UserInformation";

export class UserGetInfoMessage extends TSMSPMessage {
    userToken : Token
    constructor(userToken : Token) {
        super()
        this.userToken = userToken
    }
    override getReplyMessage(replyJson: TSMSPReply): UserInformation {
        return JSON.parse(replyJson.message) as UserInformation
    }
}