package Impl.Messages.UserMessages

import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.{PlaceTable, UserTokenTable, UserTraceTable}
import Types.PlaceMeta.PlaceId
import Types.UserMeta.Token
import Utils.IOUtils
import org.joda.time.DateTime

import scala.util.Try

case class UserGetPlaceMessage(userToken: String, visitedPlaceId: Long) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val userId = UserTokenTable.checkUserId(Token(userToken)).get
    val trace = PlaceTable.getPlace(PlaceId(visitedPlaceId)).get
    TSMSPReply(STATUS_OK, IOUtils.serialize(trace).get)
  }
}

