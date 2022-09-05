package Utils

import Types.PlaceMeta._
import Types.TraceMeta._
import Types.UserMeta._

import scala.language.implicitConversions

object EnumAutoConverter {
  //UserMeta
  implicit def StringToPermission(permission: String): Role = Role.getType(permission)
  implicit def StringToUserRiskLevel(userRiskLevel: String): UserRiskLevel = UserRiskLevel.getType(userRiskLevel)
  implicit def StringToVaccinationStatus(vaccinationStatus: String): VaccinationStatus = VaccinationStatus.getType(vaccinationStatus)

  //PlaceMeta
  implicit def StringToPlaceRiskLevel(placeRiskLevel: String): PlaceRiskLevel = PlaceRiskLevel.getType(placeRiskLevel)

  //TraceMeta
  implicit def StringToReportType(placeRiskLevel: String): ReportType = ReportType.getType(placeRiskLevel)

}