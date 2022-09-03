import Globals.GlobalVariables
import Process.TSMSPPortalHttpServer
import akka.actor.typed.ActorSystem
import com.typesafe.scalalogging.Logger

import scala.util.{Failure, Success, Try}


object VaccineAndNucleicMSServer {
  val logger = Logger("VaccineAndNucleicMSServer")
  def main(args: Array[String]): Unit = try {
    VaccineAndNucleicMSDBUtils.initDatabase()
    implicit val system : ActorSystem[VaccineAndNucleicMSMaster.Message] = ActorSystem(VaccineAndNucleicMSMaster(), "vaccineAndNucleicMSServer")
    TSMSPPortalHttpServer.startHttpServer(new VaccineAndNucleicMSRoutes().routes, system, GlobalVariables.VaccineAndNucleicMSPortal)
  } catch {
    case exception: Exception =>
      logger.error(exception.getMessage)
  }
}

object VaccineAndNucleicMSDropper {
  def main(args: Array[String]): Unit = Try {
    VaccineAndNucleicMSDBUtils.dropDatabases()
  } match {
    case Success(value) => println(value)
    case Failure(exception) => println(exception)
  }
}
