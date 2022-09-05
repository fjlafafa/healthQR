package Impl.Messages.MSCommunicationMessages.VaccineAndNucleicAcidMSMessages

import Exceptions.TokenNotExistsException
import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.UserInformationTable
import Types.UserMeta.UserId
import Utils.IOUtils
import VaccineAndNucleicMS.VaccineAndNucleicMSDBUtils
import org.joda.time.DateTime

import scala.util.Try

case class MSUserCheckInfoMessage(clientId: UserId) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val userInfo=VaccineAndNucleicMSDBUtils.exec(UserInformationTable.checkInfoById(clientId)).getOrElse(throw TokenNotExistsException())
    TSMSPReply(STATUS_OK, IOUtils.serialize(userInfo).get)
  }
}
