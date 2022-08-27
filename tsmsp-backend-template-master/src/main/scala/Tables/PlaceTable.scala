package Tables

import Globals.GlobalVariables
import Types.CustomColumnTypes._
import Types.PlaceMeta.PlaceRiskLevel
import slick.jdbc.PostgresProfile.api._
import slick.lifted.Tag

case class PlaceTableRow(
                            id: Long,
                            city: String,
                            district: String,
                            subDistrict: String,
                            riskLevel: PlaceRiskLevel
                          )

class PlaceTable(tag : Tag) extends Table[PlaceTableRow](tag, GlobalVariables.mainSchema, "place") {
  def id = column[Long]("place_id", O.PrimaryKey)
  def city = column[String]("city")
  def district = column[String]("district")
  def subDistrict = column[String]("sub-district")
  def riskLevel = column[PlaceRiskLevel]("risk level")
  def * = (id, city, district, subDistrict, riskLevel).mapTo[PlaceTableRow]
}

object PlaceTable {
  val placeTable = TableQuery[PlaceTable]

}
