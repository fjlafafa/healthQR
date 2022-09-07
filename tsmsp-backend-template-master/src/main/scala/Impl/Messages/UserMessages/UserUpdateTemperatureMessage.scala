package Impl.Messages.UserMessages

import Exceptions.TokenNotExistsException
import Globals.GlobalVariables
import Impl.Messages.MSCommunicationMessages.UserInfoMSMessages.MSUserUpdateTemperatureMessage
import Impl.Messages.TSMSPMessage
import Impl.TSMSPReply
import Tables.UserIdentityTable
import Types.UserMeta.Token
import Utils.DBUtils
import Utils.HTTPUtils.sender
import org.joda.time.DateTime
import Types.UserMeta.Temperature

import scala.util.Try

case class UserUpdateTemperatureMessage (userToken: Token, temperature: Temperature, reportType: String) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val userId = DBUtils.exec(UserIdentityTable.checkUserIdByToken(userToken)).getOrElse(throw TokenNotExistsException())
    MSUserUpdateTemperatureMessage(userId, temperature).send(GlobalVariables.UserInfoMSIP).get
  }
}
