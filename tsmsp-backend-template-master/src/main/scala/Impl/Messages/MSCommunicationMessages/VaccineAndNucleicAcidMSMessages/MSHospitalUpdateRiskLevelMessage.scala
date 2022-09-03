package Impl.Messages.MSCommunicationMessages.VaccineAndNucleicAcidMSMessages

import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.UserInformationTable
import Types.UserMeta.{UserId, UserRiskLevel}
import Utils.DBUtils
import org.joda.time.DateTime

import scala.util.Try

case class MSHospitalUpdateRiskLevelMessage(clientId: UserId, riskLevel: UserRiskLevel) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    DBUtils.exec(UserInformationTable.updateRiskLevel(clientId, riskLevel))
    TSMSPReply(STATUS_OK, "风险等级更新成功！")
  }
}
