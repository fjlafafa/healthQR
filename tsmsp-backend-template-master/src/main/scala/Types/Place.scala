package Types

import Types.PlaceMeta._

case class Place(
                  id : PlaceId,
                  city : City,
                  district : District,
                  subDistrict : SubDistrict,
                  riskLevel: PlaceRiskLevel
                )
