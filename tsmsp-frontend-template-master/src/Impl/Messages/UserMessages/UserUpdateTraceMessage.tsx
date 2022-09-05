import {TSMSPMessage} from 'Messages/TSMSPMessage'
import {PlaceId} from "Types/PlaceMeta/PlaceId";
import {DetailedPlaceDescription} from "Types/PlaceMeta/DetailedPlaceDescription";
import {ReportType} from "Types/TraceMeta/ReportType";
import {Token} from "Types/UserMeta/Token";

export class UserUpdateTraceMessage extends TSMSPMessage {
    userToken: Token
    placeId: PlaceId
    detailedPlaceDescription: DetailedPlaceDescription
    reportType: ReportType

    constructor(userToken: Token, trace: PlaceId, detailedPlaceDescription: DetailedPlaceDescription, reportType: ReportType) {
        super()
        this.userToken = userToken
        this.placeId = trace
        this.detailedPlaceDescription = detailedPlaceDescription
        this.reportType = reportType
    }
}