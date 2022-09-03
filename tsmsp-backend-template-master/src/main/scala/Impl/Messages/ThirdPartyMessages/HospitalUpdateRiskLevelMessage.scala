package Impl.Messages.ThirdPartyMessages

import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.{UserIdentityTable, UserInformationTable}
import Types.UserMeta.UserRiskLevel
import Utils.DBUtils
import Utils.ImplicitTypeConverter._
import org.joda.time.DateTime

import scala.util.Try

case class HospitalUpdateRiskLevelMessage(identityNumber: String, riskLevel: String) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val userId = UserIdentityTable.checkIdByIdentityNumber(identityNumber).get
    DBUtils.exec(UserInformationTable.updateRiskLevel(userId, UserRiskLevel.getType(riskLevel)))
    TSMSPReply(STATUS_OK, "风险等级更新成功！")
  }
}
