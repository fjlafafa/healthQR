import {TSMSPMessage} from '../TSMSPMessage'
import {isNumber} from "../../../Utils/FormatUtils/IdentityNumberUtil";

export class UserUpdateTraceMessage extends TSMSPMessage {
    userToken : string
    traceId : number
    detailedPlaceDescription : string
    reportType: string
    constructor(userToken : string, trace : string, detailedPlaceDescription : string, reportType : string) {
        super()
        this.userToken = userToken
        this.traceId = parseInt(trace)
        this.detailedPlaceDescription = detailedPlaceDescription
        this.reportType = reportType
    }
}