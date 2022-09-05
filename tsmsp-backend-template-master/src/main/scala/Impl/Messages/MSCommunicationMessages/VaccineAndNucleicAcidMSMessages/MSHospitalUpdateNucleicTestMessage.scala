package Impl.Messages.MSCommunicationMessages.VaccineAndNucleicAcidMSMessages

import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Process.VaccineAndNucleicMS.VaccineAndNucleicMSDBUtils
import Tables.UserInformationTable
import Types.UserMeta.UserId
import org.joda.time.DateTime

import scala.util.Try

case class MSHospitalUpdateNucleicTestMessage(userId: UserId) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    VaccineAndNucleicMSDBUtils.exec(UserInformationTable.updateNucleicTest(userId, now))
    TSMSPReply(STATUS_OK, "核酸记录上传成功！")
  }
}
