package Tables

import Exceptions.UserNotExistsException
import Globals.GlobalVariables
import Process.VaccineAndNucleicMS.VaccineAndNucleicMSDBUtils
import Types.UserMeta._
import Types.{UserInformation, UserRiskLevels, VaccinationStatuses}
import Utils.CustomColumnTypesUtils._
import Utils.EnumUtils.userRiskLevelGreaterOrEqual
import Utils.MessageTypesUtils.EnumAutoConverter._
import org.joda.time.DateTime
import slick.jdbc.PostgresProfile.api._
import slick.lifted.Tag

class UserInformationTable(tag : Tag) extends Table[UserInformation](tag, GlobalVariables.mainSchema, "user_information") {
  def id = column[UserId]("user_id", O.PrimaryKey)
  def recentNucleicTestTime = column[DateTime]("recent_nucleic_test_time")
  def vaccinationStatus = column[VaccinationStatus]("vaccination_status")
  def riskLevel = column[UserRiskLevel]("risk_level")
  def temperature = column[Temperature]("temperature")
  def * = (id, recentNucleicTestTime, vaccinationStatus, riskLevel, temperature).mapTo[UserInformation]
}

object UserInformationTable {
  val userInformationTable = TableQuery[UserInformationTable]

  def addUser(userId: UserId): DBIO[Int] =
    userInformationTable += UserInformation(userId, DateTime.now(), VaccinationStatuses.none, UserRiskLevels.green, Temperature(36.6))

  def checkInfoById(userId: UserId): DBIO[Option[UserInformation]]=
    userInformationTable.filter(_.id===userId).result.headOption

  def updateNucleicTest(userId: UserId, time: DateTime): DBIO[Int] =
    userInformationTable.filter(_.id === userId).map(_.recentNucleicTestTime).update(time)

  def updateTemperature(userId: UserId, time: DateTime,  temperature: Temperature):DBIO[Int] =
    userInformationTable.filter(_.id === userId).map(_.temperature).update(temperature)

  def updateVaccinationStatus(userId: UserId): DBIO[Int] = {
    userInformationTable.filter(_.id === userId).map(_.vaccinationStatus).update(
      VaccinationStatus.step(
        VaccineAndNucleicMSDBUtils.exec(userInformationTable.filter(_.id === userId).map(_.vaccinationStatus).result.headOption).getOrElse(
          throw UserNotExistsException()
        )
      )
    )
  }

  def updateRiskLevel(userId: UserId, riskLevel: UserRiskLevel): DBIO[Int] =
    userInformationTable.filter(_.id === userId).map(_.riskLevel).update(riskLevel)

  def increaseRiskLevel(userIds: List[UserId], riskLevel: UserRiskLevel): DBIO[List[Int]] =
    DBIO.sequence(
      userIds.filter(
        userId =>
          userRiskLevelGreaterOrEqual(riskLevel,
            VaccineAndNucleicMSDBUtils.exec(userInformationTable.filter(_.id === userId).map(_.riskLevel).result.headOption)
              .getOrElse(throw UserNotExistsException())
          ))
        .map(userId =>
          userInformationTable.filter(_.id === userId).map(_.riskLevel).update(riskLevel)
        )
    )
  }