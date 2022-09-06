package Utils

import Globals.GlobalVariables
import Tables._
import Types.UserMeta._
import Utils.MessageTypesUtils.PasswordAutoEncoder._
import com.typesafe.config.{Config, ConfigFactory}
import slick.dbio.DBIO
import slick.jdbc.PostgresProfile.api._

import scala.concurrent.Await
import scala.concurrent.duration.Duration


object DBUtils {

  lazy val DBConfig: Config = ConfigFactory
    .parseString(s"""""") withFallback ConfigFactory.load

  lazy val db = Database.forConfig("tsmsp", config = DBConfig)

  def exec[T]: DBIO[T] => T = action => Await.result(db.run(action), Duration.Inf)

  def initDatabase(): Unit = {
    exec(
      DBIO.seq(
        sql"CREATE SCHEMA IF NOT EXISTS #${GlobalVariables.mainSchema.get}".as[Long],
        UserIdentityTable.userIdentityTable.schema.createIfNotExists,
      ).transactionally
    )
    if (!UserIdentityTable.checkUserExists(IdentityNumber("root")).get)
      exec(
        UserIdentityTable.addUser(
          RealName("root"),
          PasswordEncoder(Password("root"), Salt("saltsalt")),
          IdentityNumber("root"), Administrator, Salt("saltsalt"),
          SecurityQuestion("1+1=?"),
          SecurityAnswerEncoder(SecurityAnswer("2"), Salt("saltsalt"))
        ))
  }

  def dropDatabases(): Unit = {
    exec(
      DBIO.seq(
        UserIdentityTable.userIdentityTable.schema.dropIfExists,
        PlaceTable.placeTable.schema.dropIfExists,
        UserTraceTable.userTraceTable.schema.dropIfExists,
        UserInformationTable.userInformationTable.schema.dropIfExists,
        sql"DROP SCHEMA IF EXISTS #${GlobalVariables.mainSchema.get}".as[Long],
      )
    )
  }
}
