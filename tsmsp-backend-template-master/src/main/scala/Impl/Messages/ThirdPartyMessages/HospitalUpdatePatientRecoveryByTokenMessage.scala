package Impl.Messages.ThirdPartyMessages

import Exceptions.{PermissionDeniedException, TokenNotExistsException}
import Globals.GlobalVariables
import Impl.Messages.MSCommunicationMessages.UserInfoMSMessages.MSHospitalUpdatePatientRecoveryMessage
import Impl.Messages.MSCommunicationMessages.VaccineAndNucleicAcidMSMessages.MSHospitalUpdateVaccinationMessage
import Impl.Messages.TSMSPMessage
import Impl.TSMSPReply
import Tables.PermissionRoleTable.checkPermission
import Tables.UserIdentityTable
import Types.UserMeta.{RecoverPatient, Token, UpdateVaccination}
import Utils.DBUtils
import Utils.HTTPUtils.sender
import org.joda.time.DateTime

import scala.util.Try

case class HospitalUpdatePatientRecoveryByTokenMessage(userToken: Token, clientToken: Token) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val role = UserIdentityTable.getRoleFromToken(userToken).get
    if (!checkPermission(role, RecoverPatient)) {
      throw PermissionDeniedException()
    }
    val clientId = DBUtils.exec(UserIdentityTable.checkUserIdByToken(clientToken)).getOrElse(throw TokenNotExistsException())
    MSHospitalUpdatePatientRecoveryMessage(clientId).send(GlobalVariables.UserInfoMSIP).get
  }
}
