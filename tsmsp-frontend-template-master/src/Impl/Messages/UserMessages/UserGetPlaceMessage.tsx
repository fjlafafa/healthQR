import { TSMSPMessage } from "Messages/TSMSPMessage";
import { TSMSPReply } from "Impl/TSMSPReply";
import { Place } from "Types/Place";
import { Token } from "Types/UserMeta/Token";
import { PlaceId } from "Types/PlaceMeta/PlaceId";

export class UserGetPlaceMessage extends TSMSPMessage {
  userToken: Token;
  visitedPlaceId: PlaceId[];
  constructor(userToken: Token, visitedPlaceId: PlaceId[]) {
    super();
    this.userToken = userToken;
    this.visitedPlaceId = visitedPlaceId;
  }
  override getReplyMessage(replyJson: TSMSPReply): Place[] {
    return JSON.parse(replyJson.message) as Place[];
  }
}
