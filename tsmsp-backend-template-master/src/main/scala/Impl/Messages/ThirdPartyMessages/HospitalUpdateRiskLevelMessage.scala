package Impl.Messages.ThirdPartyMessages

import Exceptions.TokenNotExistsException
import Globals.GlobalVariables.clientSystem.executionContext
import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.{UserIdentityTable, UserInformationTable}
import Types.UserMeta.{IdentityNumber, UserRiskLevel}
import Utils.DBUtils
import org.joda.time.DateTime

import scala.util.Try

case class HospitalUpdateRiskLevelMessage(identityNumber: String, riskLevel: String) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    DBUtils.exec(
      UserIdentityTable.checkIdByIdentityNumber(IdentityNumber(identityNumber)).flatMap(
        userId =>
          UserInformationTable.updateRiskLevel(userId.getOrElse(throw TokenNotExistsException()), UserRiskLevel.getType(riskLevel))
    ))
    TSMSPReply(STATUS_OK, "风险等级更新成功！")
  }
}
