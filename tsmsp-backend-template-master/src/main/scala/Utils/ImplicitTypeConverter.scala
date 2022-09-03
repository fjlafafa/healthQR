package Utils

import Types.PlaceMeta._
import Types.TraceMeta._
import Types.UserMeta._

object ImplicitTypeConverter {

  // NameClass

  // UserMeta
  implicit def StringToRealName(name: String): RealName = RealName(name)

  // PlaceMeta
  implicit def StringToProvince(name: String): Province = Province(name)
  implicit def StringToCity(name: String): City = City(name)
  implicit def StringToDistrict(name: String): District = District(name)
  implicit def StringToSubDistrict(name: String): SubDistrict = SubDistrict(name)
  implicit def StringToDetailedPlaceDescription(name: String): DetailedPlaceDescription = DetailedPlaceDescription(name)


  // IdClass

  //UserMeta
  implicit def LongToUserId(id: Long): UserId = UserId(id)

  //PlaceMeta
  implicit def LongToPlaceId( id :Long):PlaceId = PlaceId(id)

  //TraceMeta
  implicit def LongToTraceId(id: Long): TraceId = TraceId(id)


  //TokenClass

  //UserMeta
  implicit def StringToIdentityNumber( token : String ): IdentityNumber = IdentityNumber(token)
  implicit def StringToToken(token: String): Token = Token(token)
  implicit def StringToPassword(token: String): Password = Password(token.hashCode().toString)


  //Enumeration

  //UserMeta
  implicit def StringToPermission(permission: String): Permission = Permission.getType(permission)
  implicit def StringToUserRiskLevel(userRiskLevel: String): UserRiskLevel = UserRiskLevel.getType(userRiskLevel)
  implicit def StringToVaccinationStatus(vaccinationStatus: String): VaccinationStatus = VaccinationStatus.getType(vaccinationStatus)

  //PlaceMeta
  implicit def StringToPlaceRiskLevel(placeRiskLevel: String): PlaceRiskLevel = PlaceRiskLevel.getType(placeRiskLevel)

  //TraceMeta
  implicit def StringToReportType(placeRiskLevel: String): ReportType = ReportType.getType(placeRiskLevel)

}