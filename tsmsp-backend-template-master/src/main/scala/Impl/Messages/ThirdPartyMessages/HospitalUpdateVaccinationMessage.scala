package Impl.Messages.ThirdPartyMessages

import Exceptions.PermissionDeniedException
import Globals.GlobalVariables
import Impl.Messages.MSCommunicationMessages.VaccineAndNucleicAcidMSMessages.MSHospitalUpdateVaccinationMessage
import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.{UserIdentityTable, UserInformationTable}
import Types.UserMeta.{IdentityNumber, NucleicTestResultReporter, Token}
import Utils.HTTPUtils.sender
import org.joda.time.DateTime

import scala.util.Try

case class HospitalUpdateVaccinationMessage(userToken: Token, identityNumber: String) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val permission = UserIdentityTable.getPermissionFromToken(userToken).get
    if (permission != NucleicTestResultReporter) {
      throw PermissionDeniedException()
    }
    val clientId = UserIdentityTable.checkIdByIdentityNumber(IdentityNumber(identityNumber)).get
    MSHospitalUpdateVaccinationMessage(clientId).send(GlobalVariables.VaccineAndNucleicMSIP).get
  }
}
