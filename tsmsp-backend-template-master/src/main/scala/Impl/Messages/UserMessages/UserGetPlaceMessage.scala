package Impl.Messages.UserMessages

import Exceptions.TokenNotExistsException
import Globals.GlobalVariables
import Impl.Messages.MSCommunicationMessages.PlaceInfoMSMessages.MSUserGetPlaceMessage
import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.{PlaceTable, UserIdentityTable}
import Types.PlaceMeta.PlaceId
import Utils.HTTPUtils.sender
import Utils.{DBUtils, IOUtils}
import Utils.ImplicitTypeConverter._
import org.joda.time.DateTime

import scala.util.Try

case class UserGetPlaceMessage(userToken: String, visitedPlaceId: Long) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    DBUtils.exec(UserIdentityTable.checkUserIdByToken(userToken)).getOrElse(throw TokenNotExistsException())
    MSUserGetPlaceMessage(visitedPlaceId).send(GlobalVariables.PlaceInfoMSIP).get
  }
}

