package Tables

import Exceptions.{TokenNotExistsException, UserNotExistsException}
import Globals.GlobalVariables
import Globals.IdLengths.userToken
import Types.UserMeta.{Token, UserId}
import Types.UserToken
import Utils.CustomColumnTypesUtils._
import Utils.TokenUtils.randomUserToken
import Utils.{DBUtils, StringUtils}
import org.joda.time.DateTime
import slick.jdbc.PostgresProfile.api._
import slick.lifted.Tag

import scala.util.Try

class UserTokenTable(tag : Tag) extends Table[UserToken](tag, GlobalVariables.mainSchema, "user_token") {
  def userId = column[UserId]("user_name", O.PrimaryKey)
  def token = column[Token]("token")
  def refreshTime = column[DateTime]("refresh_time")
  def * = (userId, token, refreshTime).mapTo[UserToken]
}

object UserTokenTable {
  val userTokenTable = TableQuery[UserTokenTable]

  def addRow(userId : UserId) : DBIO[Int] =
    userTokenTable += UserToken(userId, Token(""), DateTime.now().minusYears(2))

  def checkToken(userId : UserId) : Try[Token] = Try {
    val nowTokenPair = DBUtils.exec(userTokenTable.filter(ut => ut.userId === userId).map(ut => (ut.token, ut.refreshTime)).result.headOption).getOrElse(throw UserNotExistsException())
    if (nowTokenPair._2.isAfter(DateTime.now().minusHours(2))) {
      DBUtils.exec(userTokenTable.filter(ut => ut.userId === userId).map(_.refreshTime).update(DateTime.now()))
      nowTokenPair._1
    } else {
      var newToken = Token(StringUtils.randomString(userToken))
      while (DBUtils.exec(userTokenTable.filter(_.token === newToken).size.result) > 0) newToken = randomUserToken(userToken)
      DBUtils.exec(userTokenTable.filter(_.userId === userId).map(ut => (ut.token, ut.refreshTime)).update((newToken, DateTime.now())))
      newToken
    }
  }
  def checkUserId(token : Token) : Try[UserId] = Try {
      DBUtils.exec(userTokenTable.filter(ut => ut.token === token && ut.refreshTime >= DateTime.now().minusHours(2)).map(_.userId).result.headOption).getOrElse(
        throw TokenNotExistsException()
      )
  }

  def dropUserName(token: Token): DBIO[Int] =
    userTokenTable.filter(ut => ut.token === token).delete

}