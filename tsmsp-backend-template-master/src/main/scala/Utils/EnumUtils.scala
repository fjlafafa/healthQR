package Utils

import Types.PlaceMeta.PlaceRiskLevel
import Types.UserMeta.UserRiskLevel
import Types.{PlaceRiskLevels, UserRiskLevels}

object EnumUtils {
  def userRiskLevelGreaterOrEqual(userRiskLevel_a: UserRiskLevel, userRiskLevel_b: UserRiskLevel): Boolean = {
    if (userRiskLevel_a.v == userRiskLevel_b.v) return true
    else if (userRiskLevel_a.v == UserRiskLevels.red) return true
    else if (userRiskLevel_a.v == UserRiskLevels.yellow) {
      if (userRiskLevel_b.v != UserRiskLevels.red) return true
    }
    else if (userRiskLevel_a.v == UserRiskLevels.popUps)
      if (userRiskLevel_b.v == UserRiskLevels.green) return true

    false
  }

  def placeRiskLevelGreaterOrEqual(placeRiskLevel_a: PlaceRiskLevel, placeRiskLevel_b: PlaceRiskLevel): Boolean = {
    if (placeRiskLevel_a.v == placeRiskLevel_b.v) true
    else if (placeRiskLevel_a.v == PlaceRiskLevels.red) true
    else if (placeRiskLevel_a.v == PlaceRiskLevels.yellow && placeRiskLevel_b.v == PlaceRiskLevels.green) true
    else false
  }
}
