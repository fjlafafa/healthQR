package Impl.Messages.ThirdPartyMessages

import Exceptions.TokenNotExistsException
import Globals.GlobalVariables.clientSystem.executionContext
import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.{UserIdentityTable, UserInformationTable}
import Types.UserMeta.IdentityNumber
import Utils.DBUtils
import org.joda.time.DateTime

import scala.util.Try

case class HospitalUpdateNucleicTestMessage(identityNumber: String) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    DBUtils.exec(
      UserIdentityTable.checkIdByIdentityNumber(IdentityNumber(identityNumber)).flatMap(
        userId =>
          UserInformationTable.updateNucleicTest(userId.getOrElse(throw TokenNotExistsException()), DateTime.now()))
      )
    TSMSPReply(STATUS_OK, "核酸记录上传成功！")
  }
}
