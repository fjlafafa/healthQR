package Tables

import Exceptions.{TokenNotExistsException, UserNotExistsException}
import Globals.IdLengths.userToken
import Globals.{GlobalVariables, IdLengths}
import Types.UserIdentity
import Types.UserMeta._
import Utils.CustomColumnTypesUtils._
import Utils.TokenUtils.{RandomUserId, RandomUserToken}
import Utils.{DBUtils, StringUtils}
import org.joda.time.DateTime
import slick.jdbc.PostgresProfile.api._
import slick.lifted.Tag

import scala.util.Try

class UserIdentityTable(tag : Tag) extends Table[UserIdentity](tag, GlobalVariables.mainSchema, "user_identity") {
  def userId = column[UserId]("user_id", O.PrimaryKey)
  def identityNumber = column[IdentityNumber]("identity_number")
  def password = column[PasswordHash]("password")
  def realName = column[RealName]("real_name")
  def token = column[Token]("token")
  def refreshTime = column[DateTime]("refresh_time")
  def permission = column[Roles]("permission")
  def salt = column[Salt]("Salt")
  def * = (userId, identityNumber, password, realName, token, refreshTime, permission, salt).mapTo[UserIdentity]
}

object UserIdentityTable {
  val userIdentityTable = TableQuery[UserIdentityTable]

  def addUser(realName: RealName, password: PasswordHash, identityNumber: IdentityNumber, permission : Roles, salt: Salt): DBIO[Int] =
    userIdentityTable += UserIdentity(RandomUserId(IdLengths.user), identityNumber, password, realName, Token(""), DateTime.now().minusYears(2), permission, salt)

  def dropUser(userId: UserId): DBIO[Int] = userIdentityTable.filter(_.userId === userId).delete

  def checkToken(userId : UserId) : Try[Token] = Try {
    val nowTokenPair = DBUtils.exec(userIdentityTable.filter(ut => ut.userId === userId).map(ut => (ut.token, ut.refreshTime)).result.headOption).getOrElse(throw UserNotExistsException())
    if (nowTokenPair._2.isAfter(DateTime.now().minusHours(2))) {
      DBUtils.exec(userIdentityTable.filter(ut => ut.userId === userId).map(_.refreshTime).update(DateTime.now()))
      nowTokenPair._1
    } else {
      var newToken = Token(StringUtils.randomString(userToken))
      while (DBUtils.exec(userIdentityTable.filter(_.token === newToken).size.result) > 0) newToken = RandomUserToken(userToken)
      DBUtils.exec(userIdentityTable.filter(_.userId === userId).map(ut => (ut.token, ut.refreshTime)).update((newToken, DateTime.now())))
      newToken
    }
  }

  def checkUserIdByToken(token : Token) : DBIO[Option[UserId]] =
    userIdentityTable.filter(ut => ut.token === token && ut.refreshTime >= DateTime.now().minusHours(2)).map(_.userId).result.headOption

  def checkSaltByIdentityNumber(identityNumber: IdentityNumber):
  DBIO[Option[Salt]] = userIdentityTable.filter(_.identityNumber===identityNumber).map(_.salt).result.headOption

  def checkUserExists(identityNumber: IdentityNumber): Try[Boolean] = Try(DBUtils.exec(userIdentityTable.filter(_.identityNumber === identityNumber).size.result) > 0)

  def checkPassword(identityNumber: IdentityNumber, password: PasswordHash): Try[Boolean] = Try(
    DBUtils.exec(userIdentityTable.filter(u => u.identityNumber === identityNumber && u.password === password).size.result) > 0)

  def checkIdByRealName(realName: RealName): DBIO[Option[UserId]] =
    userIdentityTable.filter(u => u.realName === realName).map(_.userId).result.headOption

  def checkIdByIdentityNumber(identityNumber: IdentityNumber): DBIO[Option[UserId]] =
    userIdentityTable.filter(u => u.identityNumber === identityNumber).map(_.userId).result.headOption

  def checkPermissionById(userId: UserId): DBIO[Option[Roles]] =
    userIdentityTable.filter(u => u.userId === userId).map(_.permission).result.headOption

  def checkRealNameById(userId: UserId): DBIO[Option[RealName]] =
    userIdentityTable.filter(u => u.userId === userId).map(_.realName).result.headOption

  def updatePassword(userId: UserId, newPassword: PasswordHash, newSalt: Salt):
  DBIO[Int] = userIdentityTable.filter(_.userId === userId).map(_.password).update(newPassword) >>
    userIdentityTable.filter(_.userId === userId).map(_.salt).update(newSalt)

  def updatePermissionById(userId: UserId, newPermission: Roles):  DBIO[Int] = userIdentityTable.filter(_.userId === userId).map(u => u.permission).update(newPermission)

  def getPermissionFromToken(token: Token): Try[Roles] = Try(
    DBUtils.exec(userIdentityTable.filter(u => u.token === token).map(_.permission).result.headOption).getOrElse(
      throw TokenNotExistsException()
    )
  )
}
