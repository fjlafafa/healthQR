import {TSMSPMessage} from '../TSMSPMessage'
import {isNumber} from "../../../Utils/FormatUtils/IdentityNumberUtil";

export class UserUpdateTraceMessage extends TSMSPMessage {
    userToken : string
    userId : number
    detailedPlaceDescription : string
    reportType: string
    constructor(userToken : string, trace : string, detailedPlaceDescription : string, reportType : string) {
        super()
        this.userToken = userToken
        this.userId = parseInt(trace)
        this.detailedPlaceDescription = detailedPlaceDescription
        this.reportType = reportType
    }
}