package Types

import Types.PlaceMeta._

case class Place(
                  id : PlaceId,
                  province : Province,
                  city : City,
                  district : District,
                  subDistrict : SubDistrict,
                  riskLevel: PlaceRiskLevel
                )
