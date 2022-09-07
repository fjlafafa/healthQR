package Impl.Messages.ThirdPartyMessages

import Exceptions.{PermissionDeniedException, TokenNotExistsException}
import Globals.GlobalVariables
import Impl.Messages.MSCommunicationMessages.UserInfoMSMessages.MSHospitalDiffusionMessage
import Impl.Messages.TSMSPMessage
import Impl.TSMSPReply
import Tables.UserIdentityTable
import Types.UserMeta._
import Utils.DBUtils
import Utils.HTTPUtils.sender
import org.joda.time.DateTime

import scala.util.Try

case class HospitalUploadPositiveNucleicTestResultByTokenMessage(userToken: Token, clientToken: Token) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val permission = UserIdentityTable.getRoleFromToken(userToken).get
    if (permission != NucleicTestResultReporter) {
      throw PermissionDeniedException()
    }

    val diagnosedUserId: List[UserId] = List(DBUtils.exec(
      UserIdentityTable.checkUserIdByToken(clientToken)
    ).getOrElse(throw TokenNotExistsException()))
    MSHospitalDiffusionMessage(diagnosedUserId).send(GlobalVariables.UserInfoMSIP).get
  }
}
