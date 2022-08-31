package Impl.Messages

import Impl.{STATUS_OK, TSMSPReply}
import Tables.{UserIdentityTable, UserInformationTable}
import Types.UserMeta.{IdentityNumber, UserRiskLevel}
import Utils.DBUtils
import org.joda.time.DateTime

import scala.util.Try

case class HospitalUpdateRiskLevelMessage(identityNumber : String, riskLevel : String) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val userId = UserIdentityTable.checkIdByIdentityNumber(IdentityNumber(identityNumber)).get
    DBUtils.exec(UserInformationTable.updateRiskLevel(userId, UserRiskLevel.getType(riskLevel)))
    // TODO: 动态更新全体用户风险等级？
    TSMSPReply(STATUS_OK,  "风险等级更新成功！")
  }
}


//case class UserUpdatePasswordMessage(userToken : String, password : Password) extends TSMSPMessage {
//  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
//    val userId = UserTokenTable.checkUserId(userToken).get
//    DBUtils.exec(UserIdentityTable.updatePassword(userId, password))
//    val userRealName = UserIdentityTable.checkRealName(userId).get
//    TSMSPReply(STATUS_OK,  userRealName.name)
//  }
//}