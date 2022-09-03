import {TSMSPMessage} from "../TSMSPMessage";
import {TSMSPReply} from "../../TSMSPReply";
import {Trace} from "../../../Types/Trace";
import {Place} from "../../../Types/Place";

export class UserGetPlaceMessage extends TSMSPMessage {
    userToken : string
    visitedPlaceId: number
    constructor(userToken : string, visitedPlaceId:number) {
        super()
        this.userToken = userToken
        this.visitedPlaceId = visitedPlaceId
    }
    override getReplyMessage(replyJson: TSMSPReply): Place {
        return JSON.parse(replyJson.message) as Place
    }
}