package Impl.Messages
import Exceptions.UserNameAlreadyExistsException
import Impl.{STATUS_OK, TSMSPReply}
import Tables.{UserTable, UserTokenTable}
import Utils.DBUtils
import org.joda.time.DateTime

import scala.util.Try

case class UserUpdatePasswordMessage(userToken : String, password : String) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    // TODO: update password properly
    val userName = UserTokenTable.checkUserName(userToken).get
    TSMSPReply(STATUS_OK, "I received this request.")
    //DBUtils.exec(UserTable.updatePassword(userName, password).get)
    //TSMSPReply(STATUS_OK,  UserTokenTable.checkToken(userName).get)
  }
}
