package Impl.Messages.MSCommunicationMessages.VaccineAndNucleicAcidMSMessages

import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.{UserIdentityTable, UserInformationTable}
import Types.UserMeta.{IdentityNumber, UserId}
import Utils.DBUtils
import org.joda.time.DateTime

import scala.util.Try

case class MSHospitalUpdateNucleicTestMessage(userId: UserId) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    DBUtils.exec(UserInformationTable.updateNucleicTest(userId, now))
    TSMSPReply(STATUS_OK, "核酸记录上传成功！")
  }
}