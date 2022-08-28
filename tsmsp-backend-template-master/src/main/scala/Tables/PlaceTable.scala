package Tables

import Globals.GlobalVariables
import Types.CustomColumnTypes._
import Types.PlaceMeta._
import slick.jdbc.PostgresProfile.api._
import slick.lifted.Tag

case class PlaceTableRow(
                            id: PlaceId,
                            city: City,
                            district: District,
                            subDistrict: SubDistrict,
                            riskLevel: PlaceRiskLevel
                          )

class PlaceTable(tag : Tag) extends Table[PlaceTableRow](tag, GlobalVariables.mainSchema, "place") {
  def id = column[PlaceId]("place_id", O.PrimaryKey)
  def city = column[City]("city")
  def district = column[District]("district")
  def subDistrict = column[SubDistrict]("sub-district")
  def riskLevel = column[PlaceRiskLevel]("risk_level")
  def * = (id, city, district, subDistrict, riskLevel).mapTo[PlaceTableRow]
}

object PlaceTable {
  val placeTable = TableQuery[PlaceTable]

}
