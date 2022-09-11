package Impl.Messages.MSCommunicationMessages.VaccineAndNucleicAcidMSMessages

import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Process.VaccineAndNucleicMS.VaccineAndNucleicMSDBUtils
import Tables.UserInformationTable
import Types.UserMeta.{UserId, UserRiskLevel}
import org.joda.time.DateTime

import scala.util.Try

case class MSHospitalUpdateUserRiskLevelMessage(clientIds: List[UserId], riskLevel: UserRiskLevel) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    VaccineAndNucleicMSDBUtils.exec(
      UserInformationTable.increaseRiskLevel(clientIds, riskLevel)
    )
    TSMSPReply(STATUS_OK, "风险等级更新成功！")
  }
}
