package Impl.Messages.MSCommunicationMessages.VaccineAndNucleicAcidMSMessages

import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Process.VaccineAndNucleicMS.VaccineAndNucleicMSDBUtils
import Tables.UserInformationTable
import Types.UserMeta.UserId
import org.joda.time.DateTime

import scala.util.Try

case class MSHospitalUpdateVaccinationMessage(clientId: UserId) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    VaccineAndNucleicMSDBUtils.exec(UserInformationTable.updateVaccinationStatus(clientId))
    TSMSPReply(STATUS_OK, "疫苗记录更新成功！")
  }
}
