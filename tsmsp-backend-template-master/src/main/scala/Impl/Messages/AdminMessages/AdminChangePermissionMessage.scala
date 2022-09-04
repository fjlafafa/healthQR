package Impl.Messages.AdminMessages

import Impl.Messages.TSMSPMessage
import Impl.TSMSPReply
import org.joda.time.DateTime

import scala.util.Try

case class AdminChangePermissionMessage(adminToken: String, clientToken:String) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {

    }
  }
}
