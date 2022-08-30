package Process

import Process.Serv.Request
import Utils.DBUtils
import akka.actor.typed.ActorSystem
import akka.actor.typed.scaladsl.Behaviors
import com.typesafe.scalalogging.Logger


object Server {
  val logger = Logger("MainServer")
  def main(args: Array[String]): Unit = try {
    DBUtils.initDatabase()
    implicit val system: ActorSystem[Request] = ActorSystem(Serv(), "main_server")
    TSMSPPortalHttpServer.startHttpServer(new Routes().routes, system)
  } catch {
    case exception: Exception =>
      logger.error(exception.getMessage)
  }
}

object Dropper {
  def main(args: Array[String]): Unit = try {
    DBUtils.dropDatabases()
  }
}
