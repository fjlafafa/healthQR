package Utils

import Types.PlaceMeta.PlaceRiskLevel
import Types.UserMeta.UserRiskLevel
import Types.{PlaceRiskLevels, UserRiskLevels}

object RiskLevelDiffusionUtils {
  def UserRiskLevelToPlaceRiskLevel(userRiskLevel: UserRiskLevel): PlaceRiskLevel = {
    if (userRiskLevel.v == UserRiskLevels.red)
      PlaceRiskLevel.getType(PlaceRiskLevels.red)
    else if (userRiskLevel.v == UserRiskLevels.yellow)
      PlaceRiskLevel.getType(PlaceRiskLevels.yellow)
    else
      PlaceRiskLevel.getType(PlaceRiskLevels.green)
  }

  def PlaceRiskLevelToUserRiskLevel(placeRiskLevel: PlaceRiskLevel): UserRiskLevel = {
    if (placeRiskLevel.v == PlaceRiskLevels.red)
      UserRiskLevel.getType(UserRiskLevels.yellow)
    else if (placeRiskLevel.v == PlaceRiskLevels.yellow)
      UserRiskLevel.getType(UserRiskLevels.popUps)
    else
      UserRiskLevel.getType(UserRiskLevels.green)
  }

}
