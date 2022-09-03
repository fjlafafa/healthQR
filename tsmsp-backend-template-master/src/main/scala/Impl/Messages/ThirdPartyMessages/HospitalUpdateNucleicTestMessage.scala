package Impl.Messages.ThirdPartyMessages

import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.{UserIdentityTable, UserInformationTable}
import Utils.DBUtils
import Utils.ImplicitTypeConverter._
import org.joda.time.DateTime

import scala.util.Try

case class HospitalUpdateNucleicTestMessage(identityNumber: String) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val userId = UserIdentityTable.checkIdByIdentityNumber(identityNumber).get
    DBUtils.exec(UserInformationTable.updateNucleicTest(userId, DateTime.now()))
    TSMSPReply(STATUS_OK, "核酸记录上传成功！")
  }
}
