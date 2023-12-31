package Impl.Messages.ThirdPartyMessages

import Exceptions.{PermissionDeniedException, TokenNotExistsException}
import Globals.GlobalVariables
import Impl.Messages.MSCommunicationMessages.VaccineAndNucleicAcidMSMessages.MSHospitalUpdateUserRiskLevelMessage
import Impl.Messages.TSMSPMessage
import Impl.TSMSPReply
import Tables.PermissionRoleTable.checkPermission
import Tables.UserIdentityTable
import Types.UserMeta.{Token, UpdateNucleicTest}
import Utils.DBUtils
import Utils.HTTPUtils.sender
import Utils.MessageTypesUtils.EnumAutoConverter._
import org.joda.time.DateTime

import scala.util.Try

case class HospitalUpdateRiskLevelByTokenMessage(userToken: Token, clientToken: Token, riskLevel: String) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val role = UserIdentityTable.getRoleFromToken(userToken).get
    if (!checkPermission(role, UpdateNucleicTest)) {
      throw PermissionDeniedException()
    }
    val clientId = DBUtils.exec(UserIdentityTable.checkUserIdByToken(clientToken)).getOrElse(throw TokenNotExistsException())
    MSHospitalUpdateUserRiskLevelMessage(List(clientId), riskLevel).send(GlobalVariables.VaccineAndNucleicMSIP).get
  }
}
