package Impl.Messages.UserMessages

import Exceptions.TokenNotExistsException
import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.UserIdentityTable
import Types.UserMeta.{Password, SecurityQuestion, Token}
import Utils.DBUtils
import org.joda.time.DateTime

import scala.util.Try

case class UserUpdateSecurityQuestionMessage(userToken: Token, securityQuestion:SecurityQuestion) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val userId = DBUtils.exec(UserIdentityTable.checkUserIdByToken(userToken)).getOrElse(throw TokenNotExistsException())
    DBUtils.exec(UserIdentityTable.updateSecurityQuestion(userId,securityQuestion))
    TSMSPReply(STATUS_OK, "上传安全问题成功")
  }
}
