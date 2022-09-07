package Impl.Messages.MSCommunicationMessages.UserInfoMSMessages

import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Process.UserInfoMS.UserInfoMSDBUtils
import Tables.UserInformationTable
import Types.UserMeta.{UserId, UserRiskLevel}
import org.joda.time.DateTime

import scala.util.Try

case class MSGovernorUpdateRiskOfUserMessage(userId: UserId, userRiskLevel: UserRiskLevel) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    UserInfoMSDBUtils.exec(UserInformationTable.updateRiskLevel(userId, userRiskLevel))
    TSMSPReply(STATUS_OK, "用户风险等级更新成功！")
  }
}

