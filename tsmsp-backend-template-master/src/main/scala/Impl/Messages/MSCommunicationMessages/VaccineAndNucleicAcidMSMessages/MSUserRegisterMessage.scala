package Impl.Messages.MSCommunicationMessages.VaccineAndNucleicAcidMSMessages

import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Process.VaccineAndNucleicMS.VaccineAndNucleicMSDBUtils
import Tables.{UserIdentityTable, UserInformationTable}
import Types.UserMeta.UserId
import org.joda.time.DateTime

import scala.util.Try

case class MSUserRegisterMessage(userId: UserId) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    VaccineAndNucleicMSDBUtils.exec(UserInformationTable.addUser(userId))
    TSMSPReply(STATUS_OK, "")
  }
}
