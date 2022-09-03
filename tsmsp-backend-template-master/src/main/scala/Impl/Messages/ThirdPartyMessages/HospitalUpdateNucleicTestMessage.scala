package Impl.Messages.ThirdPartyMessages

import Exceptions.PermissionDeniedException
import Globals.GlobalVariables
import Impl.Messages.MSCommunicationMessages.VaccineAndNucleicAcidMSMessages.MSHospitalUpdateNucleicTestMessage
import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.{UserIdentityTable, UserInformationTable}
import Types.UserMeta.{IdentityNumber, NucleicTestResultReporter, Token}
import Utils.DBUtils
import Utils.HTTPUtils.sender
import org.joda.time.DateTime

import scala.util.Try

case class HospitalUpdateNucleicTestMessage(userToken: Token, identityNumber: IdentityNumber) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val permission = UserIdentityTable.getPermissionFromToken(userToken).get
    if (permission != NucleicTestResultReporter) {
      throw PermissionDeniedException()
    }
    val clientId = UserIdentityTable.checkIdByIdentityNumber(identityNumber).get
    MSHospitalUpdateNucleicTestMessage(clientId).send(GlobalVariables.VaccineAndNucleicMSIP).get
  }
}
