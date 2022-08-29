package Tables

import Globals.GlobalVariables
import Types.CustomColumnTypes._
import Types.UserMeta._
import org.joda.time.DateTime
import slick.jdbc.PostgresProfile.api._
import slick.lifted.Tag

case class UserInformationRow(
                               id : UserId,
                               recentNucleicTestTime : DateTime,
                               vaccinationStatus : VaccinationStatus,
                               riskLevel : UserRiskLevel
                  )

class UserInformationTable(tag : Tag) extends Table[UserInformationRow](tag, GlobalVariables.mainSchema, "user_information") {
  def id = column[UserId]("user_id", O.PrimaryKey)
  def recentNucleicTestTime = column[DateTime]("recent_nucleic_test_time")
  def vaccinationStatus = column[VaccinationStatus]("vaccination_status")
  def riskLevel = column[UserRiskLevel]("risk_level")
  def * = (id, recentNucleicTestTime, vaccinationStatus, riskLevel).mapTo[UserInformationRow]
}

object UserInformationTable {
  val userInformationTable = TableQuery[UserInformationTable]

//  def addNucleicTest(userName: String, password: String, realName: String): Try[DBIO[Int]] = Try(userInformationTable += UserInformationRow(userName, password, realName))
//
//  def updateVaccinationStatus(userName: String): Try[DBIO[Int]] = Try(userInformationTable.filter(u => u.id === userName).delete)
//
//  def updateRiskLevel(userName: String): Try[Boolean] = Try(DBUtils.exec(userInformationTable.filter(_.id === userName).size.result) > 0)

  }