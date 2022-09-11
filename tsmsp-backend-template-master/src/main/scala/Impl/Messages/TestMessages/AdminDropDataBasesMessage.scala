package Impl.Messages.TestMessages

import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Types.UserMeta.Token
import org.joda.time.DateTime

import scala.util.Try

case class AdminDropDataBasesMessage(userToken: Token) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    //Not implemented
    TSMSPReply(STATUS_OK, "清空数据库成功")
  }
}
