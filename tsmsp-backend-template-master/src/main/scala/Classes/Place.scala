package Classes

import Classes.PlaceMeta.{City, District, PlaceId, SubDistrict, PlaceRiskLevel}

case class Place(
                  id : PlaceId,
                  city : City,
                  district : District,
                  subDistrict : SubDistrict,
                  riskLevel: PlaceRiskLevel
                )
