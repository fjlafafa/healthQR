package Utils

import Globals.GlobalVariables
import Tables._
import Types.UserMeta.{Administrator, IdentityNumber, Password, RealName}
import com.typesafe.config.{Config, ConfigFactory}
import slick.dbio.DBIO
import slick.jdbc.PostgresProfile.api._

import scala.concurrent.Await
import scala.concurrent.duration.Duration
import Utils.PasswordAutoEncoder._


object DBUtils {

  lazy val DBConfig: Config = ConfigFactory
    .parseString(s"""""") withFallback ConfigFactory.load

  lazy val db=Database.forConfig("tsmsp", config=DBConfig)

  def exec[T] : DBIO[T] => T = action => Await.result(db.run(action), Duration.Inf)
  def initDatabase():Unit={
    exec(
      DBIO.seq(
        sql"CREATE SCHEMA IF NOT EXISTS #${GlobalVariables.mainSchema.get}".as[Long],
        UserIdentityTable.userIdentityTable.schema.createIfNotExists,
        UserInformationTable.userInformationTable.schema.createIfNotExists,
        UserTraceTable.userTraceTable.schema.createIfNotExists,
        UserIdentityTable.addUser(RealName("root"),Password("root"),IdentityNumber("root"),Administrator),
      ).transactionally
    )
    }

  def dropDatabases():Unit={
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
