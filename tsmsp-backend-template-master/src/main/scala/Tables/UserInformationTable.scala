package Tables

import Exceptions.UserNotExistsException
import Globals.GlobalVariables
import Types.{UserInformation, UserRiskLevels, VaccinationStatuses}
import Types.UserMeta._
import Utils.CustomColumnTypesUtils._
import Utils.DBUtils
import org.joda.time.DateTime
import slick.jdbc.PostgresProfile.api._
import slick.lifted.Tag

class UserInformationTable(tag : Tag) extends Table[UserInformation](tag, GlobalVariables.mainSchema, "user_information") {
  def id = column[UserId]("user_id", O.PrimaryKey)
  def recentNucleicTestTime = column[DateTime]("recent_nucleic_test_time")
  def vaccinationStatus = column[VaccinationStatus]("vaccination_status")
  def riskLevel = column[UserRiskLevel]("risk_level")
  def * = (id, recentNucleicTestTime, vaccinationStatus, riskLevel).mapTo[UserInformation]
}

object UserInformationTable {
  val userInformationTable = TableQuery[UserInformationTable]

  def addUser(userId: UserId): DBIO[Int] =
    userInformationTable += UserInformation(userId, DateTime.now(), VaccinationStatus.getType(VaccinationStatuses.none), UserRiskLevel.getType(UserRiskLevels.green))

  def updateNucleicTest(userId: UserId, time: DateTime): DBIO[Int] =
    userInformationTable.filter(_.id === userId).map(_.recentNucleicTestTime).update(time)

  def updateVaccinationStatus(userId: UserId): DBIO[Int] = {
    userInformationTable.filter(_.id === userId).map(_.vaccinationStatus).update(
      VaccinationStatus.step(
        DBUtils.exec(userInformationTable.filter(_.id === userId).map(_.vaccinationStatus).result.headOption).getOrElse(
          throw UserNotExistsException()
        )
      )
    )
  }

  def updateRiskLevel(userId: UserId, riskLevel: UserRiskLevel): DBIO[Int] =
    userInformationTable.filter(_.id === userId).map(_.riskLevel).update(riskLevel)

  }