package Impl.Messages.ThirdPartyMessages

import Exceptions.{PermissionDeniedException, TokenNotExistsException}
import Globals.GlobalVariables
import Impl.Messages.MSCommunicationMessages.VaccineAndNucleicAcidMSMessages.MSHospitalUpdateNucleicTestMessage
import Impl.Messages.TSMSPMessage
import Impl.TSMSPReply
import Tables.PermissionRoleTable.checkPermission
import Tables.UserIdentityTable
import Types.UserMeta.{IdentityNumber, Token, UpdateNucleicTest}
import Utils.DBUtils
import Utils.HTTPUtils.sender
import org.joda.time.DateTime

import scala.util.Try

case class HospitalUpdateNucleicTestMessage(userToken: Token, identityNumber: IdentityNumber) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val role = UserIdentityTable.getRoleFromToken(userToken).get
    if (!checkPermission(role, UpdateNucleicTest)) {
      throw PermissionDeniedException()
    }
    val clientId = DBUtils.exec(UserIdentityTable.checkIdByIdentityNumber(identityNumber)).getOrElse(throw TokenNotExistsException())
    MSHospitalUpdateNucleicTestMessage(clientId).send(GlobalVariables.VaccineAndNucleicMSIP).get
  }
}
