package Impl.Messages.MSCommunicationMessages.UserInfoMSMessages

import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Process.UserInfoMS.UserInfoMSDBUtils
import Tables.UserInformationTable
import Types.UserMeta.{Green, UserId}
import org.joda.time.DateTime

import scala.util.Try

case class MSHospitalUpdatePatientRecoveryMessage(clientId: UserId) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    UserInfoMSDBUtils.exec(UserInformationTable.updateRiskLevel(clientId, Green))
    TSMSPReply(STATUS_OK, "恢复成功！")
  }
}
