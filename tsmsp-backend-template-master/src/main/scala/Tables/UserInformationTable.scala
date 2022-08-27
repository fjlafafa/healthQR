package Tables

import Globals.GlobalVariables
import Types.CustomColumnTypes._
import Types.UserMeta.{UserRiskLevel, VaccinationStatus}
import org.joda.time.DateTime
import slick.jdbc.PostgresProfile.api._
import slick.lifted.Tag

case class UserInformationRow(
                               id : Long,
                               recentNucleicTestTime : DateTime,
                               vaccinationStatus : VaccinationStatus,
                               riskLevel : UserRiskLevel
                  )

class UserInformationTable(tag : Tag) extends Table[UserInformationRow](tag, GlobalVariables.mainSchema, "user_information") {
  def id = column[Long]("user_id", O.PrimaryKey)
  def recentNucleicTestTime = column[DateTime]("Recent Nucleic Test Time")
  def vaccinationStatus = column[VaccinationStatus]("Vaccination Status")
  def RiskLevel = column[UserRiskLevel]("risk level")
  def * = (id, recentNucleicTestTime, vaccinationStatus, RiskLevel).mapTo[UserInformationRow]
}

object UserInformationTable {
  val userInformationTable = TableQuery[UserIdentityTable]

//  def addNucleicTest(userName: String, password: String, realName: String): Try[DBIO[Int]] = Try(userInformationTable += UserInformationRow(userName, password, realName))
//
//  def updateVaccinationStatus(userName: String): Try[DBIO[Int]] = Try(userInformationTable.filter(u => u.id === userName).delete)
//
//  def updateRiskLevel(userName: String): Try[Boolean] = Try(DBUtils.exec(userInformationTable.filter(_.id === userName).size.result) > 0)

  }