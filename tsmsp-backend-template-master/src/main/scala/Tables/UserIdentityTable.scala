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
  def password = column[Password]("password")
  def realName = column[RealName]("real_name")
  def token = column[Token]("token")
  def refreshTime = column[DateTime]("refresh_time")
  def permission = column[Permission]("permission")
  def * = (userId, identityNumber, password, realName, token, refreshTime, permission).mapTo[UserIdentity]
}

object UserIdentityTable {
  val userIdentityTable = TableQuery[UserIdentityTable]

  def addUser(realName: RealName, password: Password, identityNumber: IdentityNumber, permission : Permission): DBIO[Int] =
    userIdentityTable += UserIdentity(RandomUserId(IdLengths.user), identityNumber, password, realName, Token(""), DateTime.now().minusYears(2), permission)

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

  def checkUserId(token : Token) : Try[UserId] = Try {
    DBUtils.exec(userIdentityTable.filter(ut => ut.token === token && ut.refreshTime >= DateTime.now().minusHours(2)).map(_.userId).result.headOption).getOrElse(
      throw TokenNotExistsException()
    )
  }

  def checkUserExists(realName: RealName): Try[Boolean] = Try(DBUtils.exec(userIdentityTable.filter(_.realName === realName).size.result) > 0)

  def checkPassword(realName: RealName, password: Password): Try[Boolean] = Try(DBUtils.exec(userIdentityTable.filter(u => u.realName === realName && u.password === password).size.result) > 0)

  def checkIdByRealName(realName: RealName): Try[UserId] = Try(
      DBUtils.exec(userIdentityTable.filter(u => u.realName === realName).map(_.userId).result.headOption).getOrElse(
        throw TokenNotExistsException()
      )
  )

  def checkIdByIdentityNumber(identityNumber: IdentityNumber): Try[UserId] = Try(
    DBUtils.exec(userIdentityTable.filter(u => u.identityNumber === identityNumber).map(_.userId).result.headOption).getOrElse(
      throw TokenNotExistsException()
    )
  )

  def checkRealNameById(userId: UserId): Try[RealName] = Try(
      DBUtils.exec(userIdentityTable.filter(u => u.userId === userId).map(_.realName).result.headOption).getOrElse(
        throw TokenNotExistsException()
    )
  )

  def updatePassword(userId: UserId, newPassword: Password): DBIO[Int] = userIdentityTable.filter(_.userId === userId).map(u => u.password).update(newPassword)
}
