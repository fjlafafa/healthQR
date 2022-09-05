package Impl.Messages.ThirdPartyMessages

import Exceptions.{PermissionDeniedException, TokenNotExistsException}
import Globals.GlobalVariables
import Impl.Messages.MSCommunicationMessages.VaccineAndNucleicAcidMSMessages.MSHospitalUpdateRiskLevelMessage
import Impl.Messages.TSMSPMessage
import Impl.TSMSPReply
import Tables.UserIdentityTable
import Types.UserMeta.{IdentityNumber, NucleicTestResultReporter, Token}
import Utils.DBUtils
import Utils.EnumAutoConverter._
import Utils.HTTPUtils.sender
import org.joda.time.DateTime

import scala.util.Try

case class HospitalUpdateRiskLevelByTokenMessage(userToken: Token, clientToken: Token, riskLevel: String) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val permission = UserIdentityTable.getPermissionFromToken(userToken).get
    if (permission != NucleicTestResultReporter) {
      throw PermissionDeniedException()
    }
    val clientId = DBUtils.exec(UserIdentityTable.checkUserIdByToken(clientToken)).getOrElse(throw TokenNotExistsException())
    MSHospitalUpdateRiskLevelMessage(clientId, riskLevel).send(GlobalVariables.VaccineAndNucleicMSIP).get
  }
}
