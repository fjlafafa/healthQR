package Impl.Messages.MSCommunicationMessages.UserInfoMSMessages

import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Process.UserInfoMS.UserInfoMSDBUtils
import Tables.UserInformationTable
import Types.UserMeta.{Temperature, UserId}
import org.joda.time.DateTime

import scala.util.Try


case class MSUserUpdateTemperatureMessage(userId: UserId, temperature: Temperature) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    UserInfoMSDBUtils.exec(
      UserInformationTable.updateTemperature(
        userId,
        now,
        temperature))
    TSMSPReply(STATUS_OK, "上传成功！")
  }
}