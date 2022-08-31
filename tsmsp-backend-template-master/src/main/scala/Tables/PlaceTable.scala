package Tables

import Globals.GlobalVariables
import Types.Place
import Types.PlaceMeta._
import Utils.CustomColumnTypesUtils._
import slick.jdbc.PostgresProfile.api._
import slick.lifted.Tag
import play.api.libs.json.{JsArray, JsObject, JsString, JsValue, Json}
import os.{pwd, read}
import slick.jdbc
import slick.jdbc.PostgresProfile

import scala.+:
import scala.collection.mutable.ListBuffer
import scala.concurrent.Await


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
  val defaultRiskLevel = "Low Risk"

  def addPlace(id : PlaceId, province: Province, city : City, district : District, subDistrict: SubDistrict): DBIO[Int] =
    placeTable += Place(id, province, city, district, subDistrict, PlaceRiskLevel.getType(defaultRiskLevel))

  def initPlace(source : String) : DBIO[List[Int]] = {
    val rawJsonValue : String = os.read(pwd / "src" / "main" / "scala" / "AutoLoadedData" / "AdministrativeStructure.json")
    val jsonValue : JsValue = Json.parse(rawJsonValue)
    val operationListBuffer : ListBuffer[DBIO[Int]] = new ListBuffer[DBIO[Int]]()
    for(provinceJsonValue <- jsonValue.as[List[JsObject]]) {
      val province : Province = Province((provinceJsonValue \ "name").get.toString())
      for(cityJsonValue <- (provinceJsonValue \ "children").get.as[List[JsObject]]) {
        val city : City = City((cityJsonValue \ "name").get.toString())
        for (districtJsonValue <- (cityJsonValue \ "children").get.as[List[JsObject]]) {
          val district: District = District((districtJsonValue \ "name").get.toString())
          for (subDistrictJsonValue <- (districtJsonValue \ "children").get.as[List[JsObject]]) {
            val subDistrict: SubDistrict = SubDistrict((subDistrictJsonValue \ "name").get.toString())
            val codeString : String = (subDistrictJsonValue \ "code").get.toString()
            val placeId = PlaceId((codeString.substring(1, codeString.length() - 1)).toLong)

            operationListBuffer += addPlace(placeId, province, city, district, subDistrict)
          }
        }
      }
    }

    val operationList: List[DBIO[Int]] = operationListBuffer.toList

    DBIO.sequence(operationList)
//    val operationList = jsonValue.as[JsArray].value
//      .map(provinceJsonValue => )
  }
}
