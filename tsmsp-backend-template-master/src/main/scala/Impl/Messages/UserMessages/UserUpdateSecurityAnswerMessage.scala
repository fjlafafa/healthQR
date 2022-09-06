package Impl.Messages.UserMessages

import Exceptions.TokenNotExistsException
import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.UserIdentityTable
import Types.UserMeta.{SecurityAnswer, SecurityQuestion, Token}
import Utils.DBUtils
import Utils.MessageTypesUtils.PasswordAutoEncoder.SecurityAnswerEncoder
import org.joda.time.DateTime

import scala.util.Try

case class UserUpdateSecurityAnswerMessage(userToken: Token, securityAnswer:SecurityAnswer) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val userId=DBUtils.exec(UserIdentityTable.checkUserIdByToken(userToken)).getOrElse(throw TokenNotExistsException())
    val salt=DBUtils.exec(UserIdentityTable.checkSaltByUserId(userId)).getOrElse(throw TokenNotExistsException())
    DBUtils.exec(UserIdentityTable.updateSecurityAnswer(userId, SecurityAnswerEncoder(securityAnswer, salt)))
    TSMSPReply(STATUS_OK, "上传安全回答成功")
  }
}
