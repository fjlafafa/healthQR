package Impl.Messages.ThirdPartyMessages

import Exceptions.{PermissionDeniedException, TokenNotExistsException}
import Globals.GlobalVariables
import Impl.Messages.MSCommunicationMessages.UserInfoMSMessages.MSHospitalDiffusionMessage
import Impl.Messages.TSMSPMessage
import Impl.TSMSPReply
import Tables.PermissionRoleTable.checkPermission
import Tables.UserIdentityTable
import Types.UserMeta._
import Utils.{DBUtils, IOUtils}
import Utils.HTTPUtils.sender
import org.joda.time.DateTime

import scala.util.Try

case class HospitalUploadPositiveNucleicTestResultByTokenMessage(userToken: Token, clientToken: Token) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val role = UserIdentityTable.getRoleFromToken(userToken).get
    if (!checkPermission(role, UpdateNucleicTest)) {
      throw PermissionDeniedException()
    }

    val diagnosedUserId: List[UserId] = List(DBUtils.exec(
      UserIdentityTable.checkUserIdByToken(clientToken)
    ).getOrElse(throw TokenNotExistsException()))
    println(IOUtils.serialize(diagnosedUserId))
    MSHospitalDiffusionMessage(diagnosedUserId).send(GlobalVariables.UserInfoMSIP).get
  }
}
