package Utils.MessageTypesUtils

import Types.PlaceMeta.PlaceRiskLevel
import Types.TraceMeta.ReportType
import Types.UserMeta.{Roles, UserRiskLevel, VaccinationStatus}

import scala.language.implicitConversions

object EnumAutoConverter {
  //UserMeta
  implicit def StringToPermission(permission: String): Roles = Roles.getType(permission)

  implicit def StringToUserRiskLevel(userRiskLevel: String): UserRiskLevel = UserRiskLevel.getType(userRiskLevel)

  implicit def StringToVaccinationStatus(vaccinationStatus: String): VaccinationStatus = VaccinationStatus.getType(vaccinationStatus)

  //PlaceMeta
  implicit def StringToPlaceRiskLevel(placeRiskLevel: String): PlaceRiskLevel = PlaceRiskLevel.getType(placeRiskLevel)

  //TraceMeta
  implicit def StringToReportType(placeRiskLevel: String): ReportType = ReportType.getType(placeRiskLevel)

}
