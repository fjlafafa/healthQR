import Globals.GlobalVariables
import PlaceInfoMS.PlaceInfoMSDBUtils
import Process.TSMSPPortalHttpServer
import akka.actor.typed.ActorSystem
import com.typesafe.scalalogging.Logger

import scala.util.{Failure, Success, Try}


object PlaceInfoMSServer {
  val logger = Logger("PlaceInfoMSServer")
  def main(args: Array[String]): Unit = try {
    PlaceInfoMSDBUtils.initDatabase()
    implicit val system : ActorSystem[PlaceInfoMSMaster.Message] = ActorSystem(PlaceInfoMSMaster(), "placeInfoMSServer")
    TSMSPPortalHttpServer.startHttpServer(new PlaceInfoMSRoutes().routes, system, GlobalVariables.PlaceInfoMSPortal)
  } catch {
    case exception: Exception =>
      logger.error(exception.getMessage)
  }
}

object PlaceInfoMSDropper {
  def main(args: Array[String]): Unit = Try {
    PlaceInfoMSDBUtils.dropDatabases()
  } match {
    case Success(value) => println(value)
    case Failure(exception) => println(exception)
  }
}
