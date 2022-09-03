import Globals.{DataPaths, GlobalVariables}
import Tables._
import com.typesafe.config.{Config, ConfigFactory}
import slick.dbio.DBIO
import slick.jdbc.PostgresProfile.api._

import scala.concurrent.Await
import scala.concurrent.duration.Duration


object UserInfoMSDBUtils {

  lazy val DBConfig: Config = ConfigFactory
    .parseString(s"""""") withFallback ConfigFactory.load

  lazy val db=Database.forConfig("tsmsp", config=DBConfig)

  def exec[T] : DBIO[T] => T = action => Await.result(db.run(action), Duration.Inf)
  def initDatabase():Unit={
    exec(
      DBIO.seq(
        sql"CREATE SCHEMA IF NOT EXISTS #${GlobalVariables.mainSchema.get}".as[Long],
        UserTraceTable.userTraceTable.schema.createIfNotExists,
      ).transactionally
    )
    }

  def dropDatabases():Unit={
    exec(
      DBIO.seq(
        UserTraceTable.userTraceTable.schema.dropIfExists,
        sql"DROP SCHEMA IF EXISTS #${GlobalVariables.mainSchema.get}".as[Long],
      )
    )
  }
}
