package Utils

import Globals.GlobalVariables
import Tables._
import Types.UserInformation
import com.typesafe.config.{Config, ConfigFactory}
import slick.dbio.DBIO
import slick.jdbc.PostgresProfile.api._

import scala.concurrent.Await
import scala.concurrent.duration.Duration


object DBUtils {

  lazy val DBConfig: Config = ConfigFactory
    .parseString(s"""""")withFallback(ConfigFactory.load())

  lazy val db=Database.forConfig("tsmsp", config=DBConfig)

  def exec[T] : DBIO[T] => T = action => Await.result(db.run(action), Duration.Inf)
  def initDatabase():Unit={
    exec(
      DBIO.seq(
        sql"CREATE SCHEMA IF NOT EXISTS #${GlobalVariables.mainSchema.get}".as[Long],
        UserIdentityTable.userIdentityTable.schema.createIfNotExists,
        UserTokenTable.userTokenTable.schema.createIfNotExists,
        UserTraceTable.userTraceTable.schema.createIfNotExists,
        UserInformationTable.userInformationTable.schema.createIfNotExists,
        PlaceTable.placeTable.schema.createIfNotExists,
      ).transactionally
    )
  }
  def dropDatabases():Unit={
    exec(
      DBIO.seq(
        UserIdentityTable.userIdentityTable.schema.dropIfExists,
        UserTokenTable.userTokenTable.schema.dropIfExists,
        UserTraceTable.userTraceTable.schema.dropIfExists,
        UserInformationTable.userInformationTable.schema.dropIfExists,
        PlaceTable.placeTable.schema.dropIfExists,
        sql"DROP SCHEMA IF EXISTS #${GlobalVariables.mainSchema.get}".as[Long],
      )
    )
  }
}
