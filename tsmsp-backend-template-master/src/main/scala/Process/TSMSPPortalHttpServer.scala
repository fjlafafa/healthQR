package Process

import Globals.GlobalVariables
import akka.actor.typed.ActorSystem
import akka.actor.typed.scaladsl.adapter.TypedActorSystemOps
import akka.http.scaladsl.Http
import akka.http.scaladsl.server.Route
import akka.stream.scaladsl.Sink
import com.typesafe.scalalogging.Logger

import scala.util.{Failure, Success}

object TSMSPPortalHttpServer {
  /** 搭建http服务器，监听相应端口 */
  def startHttpServer(routes: Route, system: ActorSystem[_], portal: Int): Unit = {
    implicit val classicSystem: akka.actor.ActorSystem = system.toClassic
    import system.executionContext
    val futureBinding =
      Http().newServerAt(GlobalVariables.listenAddress, portal).connectionSource().to(Sink.foreach { connection => {
        val remoteIP = connection.remoteAddress.getAddress.toString.replaceAll("/", "")
        Logger("HttpServer").info("Accepted connection from " + remoteIP)
        connection handleWith routes
      }
      }).run()
    futureBinding.onComplete {
      case Success(binding) =>
        val address = binding.localAddress
        Logger("HttpServer").info(s"Server online at http://${address.getHostString}:${address.getPort}/")
      case Failure(ex) =>
        Logger("HttpServer").error("Failed to bind HTTP endpoint, terminating system " + ex.getMessage)
        system.terminate()
    }
  }
}
