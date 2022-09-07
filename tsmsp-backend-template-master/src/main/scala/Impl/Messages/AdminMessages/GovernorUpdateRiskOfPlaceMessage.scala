package Impl.Messages.AdminMessages

import Exceptions.PermissionDeniedException
import Globals.GlobalVariables
import Impl.Messages.MSCommunicationMessages.PlaceInfoMSMessages.MSGovernorUpdateRiskOfPlaceMessage
import Impl.Messages.TSMSPMessage
import Impl.TSMSPReply
import Tables.PermissionRoleTable.checkPermission
import Tables.UserIdentityTable
import Types.PlaceMeta.{PlaceId, PlaceRiskLevel}
import Types.UserMeta.{SetRiskOfPlace, Token}
import Utils.HTTPUtils.sender
import org.joda.time.DateTime

import scala.util.Try

case class GovernorUpdateRiskOfPlaceMessage(userToken: Token, placeId: PlaceId, placeRiskLevel: PlaceRiskLevel) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val role = UserIdentityTable.getRoleFromToken(userToken).get
    if (!checkPermission(role, SetRiskOfPlace)) {
      throw PermissionDeniedException()
    }
    MSGovernorUpdateRiskOfPlaceMessage(placeId, placeRiskLevel).send(GlobalVariables.PlaceInfoMSIP).get

  }
}
