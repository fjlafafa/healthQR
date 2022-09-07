import { TSMSPMessage } from "Messages/TSMSPMessage";
import { Token } from "Types/UserMeta/Token";
import { IdentityNumber } from "Types/UserMeta/IdentityNumber";
import { PlaceRiskLevel } from "Types/PlaceMeta/PlaceRiskLevel";
import { PlaceId } from "Types/PlaceMeta/PlaceId";

export class GovernorUpdateRiskOfPlaceMessage extends TSMSPMessage {
  userToken: Token;
  placeId: PlaceId;
  placeRiskLevel: PlaceRiskLevel;
  constructor(
    userToken: Token,
    placeId: PlaceId,
    placeRiskLevel: PlaceRiskLevel
  ) {
    super();
    this.userToken = userToken;
    this.placeId = placeId;
    this.placeRiskLevel = placeRiskLevel;
  }
}
