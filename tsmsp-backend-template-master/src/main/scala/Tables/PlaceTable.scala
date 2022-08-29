package Tables

import Globals.GlobalVariables
import Types.Place
import Types.PlaceMeta._
import Utils.CustomColumnTypesUtils._
import slick.jdbc.PostgresProfile.api._
import slick.lifted.Tag

class PlaceTable(tag : Tag) extends Table[Place](tag, GlobalVariables.mainSchema, "place") {
  def id = column[PlaceId]("place_id", O.PrimaryKey)
  def city = column[City]("city")
  def district = column[District]("district")
  def subDistrict = column[SubDistrict]("sub-district")
  def riskLevel = column[PlaceRiskLevel]("risk_level")
  def * = (id, city, district, subDistrict, riskLevel).mapTo[Place]
}

object PlaceTable {
  val placeTable = TableQuery[PlaceTable]

}
