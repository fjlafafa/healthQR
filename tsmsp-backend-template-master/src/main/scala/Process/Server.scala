package Process

import Globals.GlobalVariables
import Utils.DBUtils
import akka.actor.typed.ActorSystem
import akka.actor.typed.scaladsl.Behaviors
import com.typesafe.scalalogging.Logger

import scala.util.{Failure, Success, Try}


object Server {
  val logger = Logger("MainServer")
  def main(args: Array[String]): Unit = try {
    DBUtils.initDatabase()
    implicit val system : ActorSystem[Nothing] = ActorSystem[Nothing](Behaviors.empty[Nothing], "main_server")
    TSMSPPortalHttpServer.startHttpServer(new Routes().routes, system, GlobalVariables.listenPortal)
  } catch {
    case exception: Exception =>
      logger.error(exception.getMessage)
  }
}

object Dropper {
  def main(args: Array[String]): Unit = Try {
    DBUtils.dropDatabases()
  } match {
    case Success(value) => println(value)
    case Failure(exception) => println(exception)
  }
}
