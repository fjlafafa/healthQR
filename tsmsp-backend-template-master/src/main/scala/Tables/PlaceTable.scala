package Tables

import Exceptions.PlaceNotExistsException
import Globals.GlobalVariables
import Process.PlaceInfoMS.PlaceInfoMSDBUtils
import Types.PlaceMeta._
import Types.{Place, PlaceRiskLevels}
import Utils.CustomColumnTypesUtils._
import Utils.EnumUtils.placeRiskLevelGreaterOrEqual
import os.Path
import play.api.libs.json.{JsArray, JsObject, Json}
import slick.jdbc.PostgresProfile.api._
import slick.lifted.Tag

import scala.util.Try


class PlaceTable(tag: Tag) extends Table[Place](tag, GlobalVariables.mainSchema, "place") {
  def id = column[PlaceId]("place_id", O.PrimaryKey)

  def province = column[Province]("province")

  def city = column[City]("city")

  def district = column[District]("district")

  def subDistrict = column[SubDistrict]("sub-district")

  def riskLevel = column[PlaceRiskLevel]("risk_level")

  def * = (id, province, city, district, subDistrict, riskLevel).mapTo[Place]
}

object PlaceTable {
  val placeTable = TableQuery[PlaceTable]
  val defaultRiskLevel: String = PlaceRiskLevels.green

  def addPlace(id: PlaceId, province: Province, city: City, district: District, subDistrict: SubDistrict): DBIO[Int] =
    placeTable += Place(id, province, city, district, subDistrict, PlaceRiskLevel.getType(defaultRiskLevel))

  def initPlace(dataPath: Path): DBIO[List[Int]] = {
    DBIO.sequence(
      Json.parse(os.read(dataPath)).as[JsArray].value
        .flatMap(provinceJsonValue => (provinceJsonValue \ "children").get.as[List[JsObject]]
          .flatMap(cityJsonValue => (cityJsonValue \ "children").get.as[List[JsObject]]
            .flatMap(districtJsonValue => (districtJsonValue \ "children").get.as[List[JsObject]]
              .map(subDistrictJsonValue =>
                addPlace(
                  PlaceId((subDistrictJsonValue \ "code").get.toString().filterNot(_ == '\"').toLong),
                  Province((provinceJsonValue \ "name").get.toString().filterNot(_ == '\"')),
                  City((cityJsonValue \ "name").get.toString().filterNot(_ == '\"')),
                  District((districtJsonValue \ "name").get.toString().filterNot(_ == '\"')),
                  SubDistrict((subDistrictJsonValue \ "name").get.toString().filterNot(_ == '\"'))
                )
              )
            )
          )
        ).toList
    )
  }

  def getDescription(placeId: PlaceId): Try[String] = Try {
    PlaceInfoMSDBUtils.exec(
      placeTable.filter(_.id === placeId).map(pl => (pl.province, pl.city, pl.district, pl.subDistrict)).result.headOption
    ).getOrElse(
      throw PlaceNotExistsException()
    ).productIterator.toList.mkString(" ")
  }

  def getPlace(placeId: PlaceId): Try[Place] = Try {
    PlaceInfoMSDBUtils.exec(
      placeTable.filter(_.id === placeId).result.headOption
    ).getOrElse(
      throw PlaceNotExistsException()
    )
  }

  def updatePlaceRiskLevel(placeId: PlaceId, riskLevel: PlaceRiskLevel): DBIO[Int] =
    placeTable.filter(_.id === placeId).map(_.riskLevel).update(riskLevel)

  //  && placeRiskLevelGreaterOrEqual(riskLevel, pl.riskLevel)
  def increasePlaceRiskLevel(placeIds: List[PlaceId], riskLevel: PlaceRiskLevel): DBIO[List[Int]] =
    DBIO.sequence(
      placeIds.filter(
        placeId =>
          placeRiskLevelGreaterOrEqual(riskLevel,
            PlaceInfoMSDBUtils.exec(placeTable.filter(pl => pl.id === placeId).map(_.riskLevel).result.headOption)
              .getOrElse(throw PlaceNotExistsException())
          ))
        .map(placeId =>
          placeTable.filter(_.id === placeId).map(_.riskLevel).update(riskLevel)
        )
    )

  def getPlaceList(places: List[PlaceId]): Try[List[Place]] = Try {
    places.map(getPlace(_).get)
  }

  def getPlaceRiskLevel(placeId: PlaceId): DBIO[Option[PlaceRiskLevel]] =
    placeTable.filter(_.id === placeId).map(_.riskLevel).result.headOption

  def isEmpty: Try[Boolean] = Try {
    PlaceInfoMSDBUtils.exec(placeTable.size.result) == 0
  }
}