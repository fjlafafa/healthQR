package Impl.Messages.UserMessages

import Exceptions.TokenNotExistsException
import Globals.GlobalVariables
import Impl.Messages.MSCommunicationMessages.UserInfoMSMessages.MSUserUpdateTraceMessage
import Impl.Messages.TSMSPMessage
import Impl.TSMSPReply
import Tables.UserIdentityTable
import Types.PlaceMeta.{DetailedPlaceDescription, PlaceId}
import Types.UserMeta.Token
import Utils.DBUtils
import Utils.HTTPUtils.sender
import Utils.ImplicitTypeConverter._
import org.joda.time.DateTime

import scala.util.Try

case class UserUpdateTraceMessage(userToken: Token, placeId: PlaceId, detailedPlaceDescription: DetailedPlaceDescription, reportType: String) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val userId = DBUtils.exec(UserIdentityTable.checkUserIdByToken(userToken)).getOrElse(throw TokenNotExistsException())
    MSUserUpdateTraceMessage(userId, placeId, detailedPlaceDescription, reportType).send(GlobalVariables.UserInfoMSIP).get
  }
}
