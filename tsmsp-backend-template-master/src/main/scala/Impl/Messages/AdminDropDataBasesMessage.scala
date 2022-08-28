package Impl.Messages
import Exceptions.FailToDropDatabasesException
import Impl.{STATUS_OK, TSMSPReply}
import Utils.DBUtils
import org.joda.time.DateTime

import scala.util.Try

case class AdminDropDataBasesMessage(userToken : String) extends TSMSPMessage {
  //Not implemented: check user token
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    //Not implemented
    //DBUtils.dropDatabases()
    //DBUtils.initDatabase()
    TSMSPReply(STATUS_OK, "清空数据库成功")
  }
}
