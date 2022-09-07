package Impl.Messages.MSCommunicationMessages.UserInfoMSMessages

import Impl.Messages.MSCommunicationMessages.PlaceInfoMSMessages.MSUserGetPlaceRiskLevelMessage
import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Process.UserInfoMS.UserInfoMSDBUtils
import Tables.UserTraceTable
import Types.PlaceMeta.{DetailedPlaceDescription, PlaceId, PlaceRiskLevel}
import Types.TraceMeta.ReportType
import Types.UserMeta.UserId
import org.joda.time.DateTime
import Globals.GlobalVariables._
import Impl.Messages.MSCommunicationMessages.VaccineAndNucleicAcidMSMessages.MSHospitalUpdateUserRiskLevelMessage
import Utils.MessageTypesUtils.EnumAutoConverter._
import Utils.HTTPUtils.sender
import Utils.RiskLevelDiffusionUtils.PlaceRiskLevelToUserRiskLevel

import scala.util.Try

case class MSUserUpdateTraceMessage(userId: UserId, placeId: PlaceId, detailedPlaceDescription: DetailedPlaceDescription, reportType: ReportType) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    UserInfoMSDBUtils.exec(
      UserTraceTable.addTrace(
        userId,
        placeId,
        detailedPlaceDescription,
        reportType))
    val placeRiskLevel: PlaceRiskLevel = MSUserGetPlaceRiskLevelMessage(placeId).send(PlaceInfoMSIP).get.message.filterNot(_ == '\"')
    MSHospitalUpdateUserRiskLevelMessage(List(userId), PlaceRiskLevelToUserRiskLevel(placeRiskLevel)).send(VaccineAndNucleicMSIP)
    TSMSPReply(STATUS_OK, "上传成功！")
  }
}
