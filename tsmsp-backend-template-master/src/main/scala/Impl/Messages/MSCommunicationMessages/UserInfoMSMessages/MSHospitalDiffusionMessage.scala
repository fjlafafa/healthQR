package Impl.Messages.MSCommunicationMessages.UserInfoMSMessages

import Globals.GlobalVariables
import Impl.Messages.MSCommunicationMessages.PlaceInfoMSMessages.MSHospitalUpdatePlaceRiskLevelMessage
import Impl.Messages.MSCommunicationMessages.VaccineAndNucleicAcidMSMessages.MSHospitalUpdateUserRiskLevelMessage
import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Process.UserInfoMS.UserInfoMSDBUtils
import Tables.UserTraceTable
import Types.PlaceMeta.PlaceId
import Types.UserMeta.{UserId, UserRiskLevel}
import Types.{Trace, UserRiskLevels}
import Utils.HTTPUtils.sender
import Utils.MessageTypesUtils.EnumAutoConverter._
import Utils.RiskLevelDiffusionUtils._
import org.joda.time.DateTime

import scala.util.Try

case class MSHospitalDiffusionMessage(diagnosedUserId: List[UserId]) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {

    def DiffusionStep(sourceUserInfo: (List[UserId], UserRiskLevel, List[DateTime])): (List[UserId], UserRiskLevel, List[DateTime]) = {
      val (sourceUserIds, sourceUserRiskLevel, alertTime) = sourceUserInfo
      // Set user level at this step
      MSHospitalUpdateUserRiskLevelMessage(sourceUserIds, sourceUserRiskLevel)
        .send(GlobalVariables.VaccineAndNucleicMSIP)

      // Set place level at this step
      val sourceUserTrace: List[Trace] = {
        (sourceUserIds zip alertTime).flatMap(
          info =>
            UserInfoMSDBUtils.exec(UserTraceTable.checkTrace(info._1, info._2, DateTime.now()))
        )
      }
      val sourcePlaceRiskLevel = UserRiskLevelToPlaceRiskLevel(sourceUserRiskLevel)
      val sourcePlaceId: List[PlaceId] = sourceUserTrace.map(_.visitPlaceId).distinct
      MSHospitalUpdatePlaceRiskLevelMessage(sourcePlaceId, sourcePlaceRiskLevel).send(GlobalVariables.PlaceInfoMSIP)

      val visitSourcePlaceTime: List[DateTime] = sourceUserTrace.map(_.time)
      val visitSourcePlaceFilterStartTime = visitSourcePlaceTime.map(_.minusMinutes(30))
      val visitSourcePlaceFilterEndTime = visitSourcePlaceTime.map(_.minusWeeks(-2))
      val diffusedUserId: List[UserId] = {
        (sourcePlaceId zip (visitSourcePlaceFilterStartTime zip visitSourcePlaceFilterEndTime)).flatMap(
          info =>
            UserInfoMSDBUtils.exec(UserTraceTable.checkUserWithTrace(info._1, info._2._1, info._2._2))
        ).distinct.filterNot(userId => sourceUserIds.contains(userId))
      }
      val diffusedUserRiskLevel = PlaceRiskLevelToUserRiskLevel(sourcePlaceRiskLevel)
      val diffusedUserAlertTime: List[DateTime] =
        (sourcePlaceId zip (visitSourcePlaceFilterStartTime zip visitSourcePlaceFilterEndTime)).flatMap(
          info =>
            UserInfoMSDBUtils.exec(UserTraceTable.getAlertTimeWithTrace(info._1, info._2._1, info._2._2))
        ).distinct

      Tuple3(diffusedUserId, diffusedUserRiskLevel, diffusedUserAlertTime)
    }

    val diagnosedUserRiskLevel = UserRiskLevels.red
    val diagnosedUserAlertTime = List(DateTime.now().minusWeeks(1))
    val diagnosedUserInfo: (List[UserId], UserRiskLevel, List[DateTime]) =
      (diagnosedUserId, diagnosedUserRiskLevel, diagnosedUserAlertTime)

    val closelyRelatedUserInfo = DiffusionStep(diagnosedUserInfo)
    val popUpUserInfo = DiffusionStep(closelyRelatedUserInfo)
    DiffusionStep(popUpUserInfo)

    TSMSPReply(STATUS_OK, "流调大成功！")
  }
}
