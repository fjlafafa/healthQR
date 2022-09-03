package Impl.Messages.ThirdPartyMessages

import Exceptions.PermissionDeniedException
import Globals.GlobalVariables
import Impl.Messages.MSCommunicationMessages.VaccineAndNucleicAcidMSMessages.MSHospitalUpdateRiskLevelMessage
import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.{UserIdentityTable, UserInformationTable}
import Types.UserMeta.{IdentityNumber, NucleicTestResultReporter, Token, UserRiskLevel}
import Utils.HTTPUtils.sender
import org.joda.time.DateTime

import scala.util.Try

case class HospitalUpdateRiskLevelMessage(userToken: Token, identityNumber: IdentityNumber, riskLevel: UserRiskLevel) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val permission = UserIdentityTable.getPermissionFromToken(userToken).get
    if (permission != NucleicTestResultReporter) {
      throw PermissionDeniedException()
    }
    val clientId = UserIdentityTable.checkIdByIdentityNumber(identityNumber).get
    MSHospitalUpdateRiskLevelMessage(clientId, riskLevel).send(GlobalVariables.VaccineAndNucleicMSIP).get
  }
}
