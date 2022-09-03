package Utils

import Globals.{DataPaths, GlobalVariables}
import Tables._
import com.typesafe.config.{Config, ConfigFactory}
import com.typesafe.scalalogging.Logger
import slick.dbio.DBIO
import slick.jdbc.PostgresProfile.api._

import scala.concurrent.Await
import scala.concurrent.duration.Duration
import scala.util.{Failure, Success, Try}


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
      ).transactionally
    )
    if(PlaceTable.isEmpty.get){
      Try {
        exec(PlaceTable.initPlace(DataPaths.PlaceData).transactionally)
      } match {
        case Success(value) => Logger("DataInitialization").info(s"Successfully initialize place table!")
        case Failure(exception) => Logger("DataInitialization").info(s"Place initialization failure, return $exception")
        }
     }
    }

  def dropDatabases():Unit={
    exec(
      DBIO.seq(
        UserIdentityTable.userIdentityTable.schema.dropIfExists,
        sql"DROP SCHEMA IF EXISTS #${GlobalVariables.mainSchema.get}".as[Long],
      )
    )
  }
}
