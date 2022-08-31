package Tables

import Exceptions.PlaceNotExists
import Globals.GlobalVariables
import Types.PlaceMeta._
import Types.{Place, PlaceRiskLevels}
import Utils.CustomColumnTypesUtils._
import Utils.DBUtils
import os.Path
import play.api.libs.json.{JsArray, JsObject, Json}
import slick.jdbc.PostgresProfile.api._
import slick.lifted.Tag

import scala.util.Try


class PlaceTable(tag : Tag) extends Table[Place](tag, GlobalVariables.mainSchema, "place") {
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
  val defaultRiskLevel = PlaceRiskLevels.green

  def addPlace(id : PlaceId, province: Province, city : City, district : District, subDistrict: SubDistrict): DBIO[Int] =
    placeTable += Place(id, province, city, district, subDistrict, PlaceRiskLevel.getType(defaultRiskLevel))

  def initPlace(dataPath : Path) : DBIO[List[Int]] = {
    DBIO.sequence(
      Json.parse(os.read(dataPath)).as[JsArray].value
        .flatMap(provinceJsonValue => (provinceJsonValue \ "children").get.as[List[JsObject]]
          .flatMap(cityJsonValue => (cityJsonValue \ "children").get.as[List[JsObject]]
            .flatMap(districtJsonValue => (districtJsonValue \ "children").get.as[List[JsObject]]
              .map(subDistrictJsonValue =>
                addPlace(
                  PlaceId((subDistrictJsonValue \ "code").get.toString().filterNot(_ == '\"').toLong),
                  Province((provinceJsonValue \ "name").get.toString()),
                  City((cityJsonValue \ "name").get.toString()),
                  District((districtJsonValue \ "name").get.toString()),
                  SubDistrict((subDistrictJsonValue \ "name").get.toString())
                )
              )
            )
          )
      ).toList
    )
  }

  def getDescription(placeId: PlaceId) : Try[String] = Try {
    DBUtils.exec(
      placeTable.filter(_.id === placeId).map(pl => (pl.province, pl.city, pl.district, pl.subDistrict)).result.headOption
    ).getOrElse(
      throw PlaceNotExists()
    ).productIterator.toList.mkString(" ")
  }

  def isEmpty: Try[Boolean] = Try{
    DBUtils.exec(placeTable.size.result)==0
  }
}