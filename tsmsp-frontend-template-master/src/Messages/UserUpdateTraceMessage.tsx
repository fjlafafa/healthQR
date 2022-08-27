import {TSMSPMessage} from "Messages/TSMSPMessage";

export class UserUpdateTraceMessage extends TSMSPMessage {
    userToken : string
    trace : number
    detailedPlaceDescription : string
    reportType: string
    constructor(userToken : string, trace : number, detailedPlaceDescription : string, reportType : string) {
        super();
        this.userToken = userToken
        this.trace = trace
        this.detailedPlaceDescription = detailedPlaceDescription
        this.reportType = reportType
    }
}