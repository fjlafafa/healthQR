package Impl.Messages.MSCommunicationMessages.UserInfoMSMessages

import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import org.joda.time.DateTime
import Tables.UserInformationTable
import Types.UserMeta.UserId
import Types.UserMeta.Temperature
import scala.util.Try
import Process.UserInfoMS.UserInfoMSDBUtils


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