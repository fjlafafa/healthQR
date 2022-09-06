package Impl.Messages.UserMessages

import Exceptions.{PermissionDeniedException, TokenNotExistsException}
import Globals.GlobalVariables
import Impl.Messages.MSCommunicationMessages.VaccineAndNucleicAcidMSMessages.MSUserCheckInfoMessage
import Impl.Messages.TSMSPMessage
import Impl.TSMSPReply
import Tables.UserIdentityTable
import Tables.UserIdentityTable.checkIdByIdentityNumber
import Types.UserMeta.{IdentityNumber, Token}
import Utils.DBUtils
import Utils.HTTPUtils.sender
import org.joda.time.DateTime

import scala.util.Try

case class UserGetOthersInfoMessage(userToken: Token, identityNumber: IdentityNumber) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    DBUtils.exec(UserIdentityTable.checkUserIdByToken(userToken)).getOrElse(throw TokenNotExistsException())
    val year = identityNumber.token.substring(6,10)
    val month = identityNumber.token.substring(10,12)
    val day = identityNumber.token.substring(12,14)
    val dayOfBirth = DateTime.parse(year+'-'+month+'-'+day)
    if (dayOfBirth.isBefore(DateTime.now.minusYears(60)) || dayOfBirth.isAfter(DateTime.now.minusYears(16))) {
      val userId = DBUtils.exec(checkIdByIdentityNumber(identityNumber)).get
      MSUserCheckInfoMessage(userId).send(GlobalVariables.VaccineAndNucleicMSIP).get
    } else {
      throw PermissionDeniedException()
    }
  }
}
