package Impl.Messages

import Impl.{STATUS_OK, TSMSPReply}
import Tables.{UserIdentityTable, UserInformationTable}
import Types.UserMeta.IdentityNumber
import Utils.DBUtils
import org.joda.time.DateTime

import scala.util.Try

case class HospitalUpdateNucleicTestMessage(identityNumber : String) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val userId = UserIdentityTable.checkIdByIdentityNumber(IdentityNumber(identityNumber)).get
    DBUtils.exec(UserInformationTable.updateNucleicTest(userId, DateTime.now()))
    TSMSPReply(STATUS_OK,  "核酸记录上传成功！")
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