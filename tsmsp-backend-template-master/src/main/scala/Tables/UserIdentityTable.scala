package Tables

import Exceptions.TokenNotExistsException
import Globals.{GlobalVariables, IdLengths}
import Types.UserIdentity
import Types.UserMeta._
import Utils.CustomColumnTypesUtils._
import Utils.DBUtils
import Utils.TokenUtils.randomUserId
import slick.jdbc.PostgresProfile.api._
import slick.lifted.Tag

import scala.util.Try

class UserIdentityTable(tag : Tag) extends Table[UserIdentity](tag, GlobalVariables.mainSchema, "user_identity") {
  def id = column[UserId]("user_id", O.PrimaryKey)
  def identityNumber = column[IdentityNumber]("identity_number")
  def password = column[Password]("password")
  def realName = column[RealName]("real_name")
  def permission = column[Permission]("permission")
  def * = (id, realName, password, identityNumber, permission).mapTo[UserIdentity]
}

object UserIdentityTable {
  val userIdentityTable = TableQuery[UserIdentityTable]

  def addUser(realName: RealName, password: Password, identityNumber: IdentityNumber, permission : Permission): DBIO[Int] =
    userIdentityTable += UserIdentity(randomUserId(IdLengths.user), realName, password, identityNumber, permission)

  def dropUser(userId: UserId): DBIO[Int] = userIdentityTable.filter(_.id === userId).delete

  def checkUserExists(realName: RealName): Try[Boolean] = Try(DBUtils.exec(userIdentityTable.filter(_.realName === realName).size.result) > 0)

  def checkPassword(realName: RealName, password: Password): Try[Boolean] = Try(DBUtils.exec(userIdentityTable.filter(u => u.realName === realName && u.password === password).size.result) > 0)

  def checkIdByRealName(realName: RealName): DBIO[Option[UserId]] =
    userIdentityTable.filter(u => u.realName === realName).map(_.id).result.headOption

  def checkIdByIdentityNumber(identityNumber: IdentityNumber): DBIO[Option[UserId]] =
    userIdentityTable.filter(u => u.identityNumber === identityNumber).map(_.id).result.headOption

  def checkRealNameById(userId: UserId): DBIO[Option[RealName]] =
      userIdentityTable.filter(u => u.id === userId).map(_.realName).result.headOption

  def updatePassword(userId: UserId, newPassword: Password): DBIO[Int] = userIdentityTable.filter(_.id === userId).map(u => u.password).update(newPassword)
}
