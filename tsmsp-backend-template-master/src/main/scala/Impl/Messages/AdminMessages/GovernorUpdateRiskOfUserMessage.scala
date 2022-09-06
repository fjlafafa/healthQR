package Impl.Messages.AdminMessages

import Exceptions.PermissionDeniedException
import Globals.GlobalVariables
import Impl.Messages.MSCommunicationMessages.UserInfoMSMessages.MSGovernorUpdateRiskOfUserMessage
import Impl.Messages.TSMSPMessage
import Impl.TSMSPReply
import Tables.PermissionRoleTable.checkPermission
import Tables.UserIdentityTable
import Types.PlaceMeta.PlaceRiskLevel
import Types.UserMeta.{IdentityNumber, SetRiskOfUser, Token, UserRiskLevel}
import Utils.DBUtils
import Utils.HTTPUtils.sender
import org.joda.time.DateTime

import scala.util.Try

case class GovernorUpdateRiskOfUserMessage(userToken: Token, identityNumber: IdentityNumber, userRiskLevel: UserRiskLevel) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val role = UserIdentityTable.getRoleFromToken(userToken).get
    if (!checkPermission(role, SetRiskOfUser)) {
      throw PermissionDeniedException()
    }
    val userId = DBUtils.exec(UserIdentityTable.checkIdByIdentityNumber(identityNumber)).get
    MSGovernorUpdateRiskOfUserMessage(userId, userRiskLevel).send(GlobalVariables.UserInfoMSIP).get
  }
}

