import Globals.GlobalVariables
import Process.TSMSPPortalHttpServer
import akka.actor.typed.ActorSystem
import com.typesafe.scalalogging.Logger

import scala.util.{Failure, Success, Try}


object UserInfoMSServer {
  val logger = Logger("UserInfoMSServer")
  def main(args: Array[String]): Unit = try {
    UserInfoMSDBUtils.initDatabase()
    implicit val system : ActorSystem[UserInfoMSMaster.Message] = ActorSystem(UserInfoMSMaster(), "userInfoMSServer")
    TSMSPPortalHttpServer.startHttpServer(new UserInfoMSRoutes().routes, system, GlobalVariables.UserInfoMSPortal)
  } catch {
    case exception: Exception =>
      logger.error(exception.getMessage)
  }
}

object UserInfoMSDropper {
  def main(args: Array[String]): Unit = Try {
    UserInfoMSDBUtils.dropDatabases()
  } match {
    case Success(value) => println(value)
    case Failure(exception) => println(exception)
  }
}
