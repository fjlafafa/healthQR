import {TSMSPMessage} from 'Messages/TSMSPMessage'
import {Token} from "Types/UserMeta/Token";
import {IdentityNumber} from "Types/UserMeta/IdentityNumber";
import {PlaceRiskLevel} from "Types/PlaceMeta/PlaceRiskLevel";

export class GovernorUpdateRiskOfPlaceMessage extends TSMSPMessage {
    userToken: Token
    identityNumber: IdentityNumber
    placeRiskLevel: PlaceRiskLevel
    constructor(userToken: Token, identityNumber: IdentityNumber, placeRiskLevel: PlaceRiskLevel) {
        super()
        this.userToken = userToken
        this.identityNumber = identityNumber
        this.placeRiskLevel = placeRiskLevel
    }
}