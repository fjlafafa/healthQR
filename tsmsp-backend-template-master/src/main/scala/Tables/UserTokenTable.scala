package Tables

import Exceptions.{TokenNotExistsException, UserNotExistsException}
import Globals.GlobalVariables
import Types.UserMeta.UserId
import Utils.{DBUtils, StringUtils}
import org.joda.time.DateTime
import slick.jdbc.PostgresProfile.api._
import slick.lifted.Tag

import scala.util.Try

case class UserTokenRow(
                          userId : Long,
                          token : String,
                          refreshTime : Long
                         )

class UserTokenTable(tag : Tag) extends Table[UserTokenRow](tag, GlobalVariables.mainSchema, "user_token") {
  def userId = column[Long]("user_name", O.PrimaryKey)
  def token = column[String]("token")
  def refreshTime = column[Long]("refresh_time")
  def * = (userId, token, refreshTime).mapTo[UserTokenRow]
}

object UserTokenTable {
  val userTokenTable = TableQuery[UserTokenTable]

  def addRow(userId : UserId) : DBIO[Int] =
    userTokenTable += UserTokenRow(userId.id, "", DateTime.now().minusYears(2).getMillis)

  def checkToken(userId : UserId) : Try[String] = Try {
    val nowTokenPair = DBUtils.exec(userTokenTable.filter(ut => ut.userId === userId.id).map(ut => (ut.token, ut.refreshTime)).result.headOption).getOrElse(throw UserNotExistsException())
    if (nowTokenPair._2 >= DateTime.now().minusHours(2).getMillis) {
      DBUtils.exec(userTokenTable.filter(ut => ut.userId === userId.id).map(_.refreshTime).update(DateTime.now().getMillis))
      nowTokenPair._1
    } else {
      var newToken : String = StringUtils.randomString(30)
      while (DBUtils.exec(userTokenTable.filter(_.token === newToken).size.result) > 0) newToken = StringUtils.randomString(30)
      DBUtils.exec(userTokenTable.filter(_.userId === userId.id).map(ut => (ut.token, ut.refreshTime)).update((newToken, DateTime.now().getMillis)))
      newToken
    }
  }
  def checkUserId(token : String) : Try[UserId] = Try {
    UserId(
      DBUtils.exec(userTokenTable.filter(ut => ut.token === token && ut.refreshTime >= DateTime.now().minusHours(2).getMillis).map(_.userId).result.headOption).getOrElse(
        throw TokenNotExistsException()
      )
    )
  }

  def dropUserName(token: String): DBIO[Int] =
    userTokenTable.filter(ut => ut.token === token).delete

}