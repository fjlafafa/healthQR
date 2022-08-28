package Tables

import Exceptions.TokenNotExistsException
import Globals.{GlobalVariables, IdLengths}
import Types.CustomColumnTypes._
import Types.UserMeta._
import Utils.DBUtils
import Utils.StringUtils.randomNumber
import slick.jdbc.PostgresProfile.api._
import slick.lifted.Tag

import scala.util.Try

case class UserIdentityRow(
                            id: UserId,
                            realName: RealName,
                            password: Password,
                            identityNumber: IdentityNumber,
                            permission: Permission
                          )

class UserIdentityTable(tag : Tag) extends Table[UserIdentityRow](tag, GlobalVariables.mainSchema, "user_identity") {
  def id = column[UserId]("id", O.PrimaryKey)
  def identityNumber = column[IdentityNumber]("identity_number")
  def password = column[Password]("password")
  def realName = column[RealName]("real_name")
  def permission = column[Permission]("permission")
  def * = (id, realName, password, identityNumber, permission).mapTo[UserIdentityRow]
}

object UserIdentityTable {
  val userIdentityTable = TableQuery[UserIdentityTable]

  def addUser(realName: RealName, password: Password, identityNumber: IdentityNumber, permission : Permission): DBIO[Int] =
    userIdentityTable += UserIdentityRow(UserId(randomNumber(IdLengths.user)), realName, password, identityNumber, permission)

  def dropUser(userId: UserId): DBIO[Int] = userIdentityTable.filter(_.id === userId).delete

  def checkUserExists(realName: RealName): Try[Boolean] = Try(DBUtils.exec(userIdentityTable.filter(_.realName === realName).size.result) > 0)

  def checkPassword(realName: RealName, password: Password): Try[Boolean] = Try(DBUtils.exec(userIdentityTable.filter(u => u.realName === realName && u.password === password).size.result) > 0)

  def checkId(realName: RealName): Try[UserId] = Try(
      DBUtils.exec(userIdentityTable.filter(u => u.realName === realName).map(_.id).result.headOption).getOrElse(
        throw TokenNotExistsException()
      )
  )

  def checkRealName(userId: UserId): Try[RealName] = Try(
      DBUtils.exec(userIdentityTable.filter(u => u.id === userId).map(_.realName).result.headOption).getOrElse(
        throw TokenNotExistsException()
    )
  )

  def updatePassword(userId: UserId, newPassword: Password): DBIO[Int] = userIdentityTable.filter(_.id === userId).map(u => u.password).update(newPassword)
}
