package Process

import Globals.GlobalVariables
import Impl.Messages.TSMSPMessage
import Impl.Messages.UserMessages._
import Process.Server.logger
import Utils.HTTPUtils.sender
import Utils.IOUtils
import Utils.IOUtils.{fromObject, fromString}
import akka.actor.typed.ActorSystem
import akka.http.scaladsl.model.headers.HttpOriginRange
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import ch.megard.akka.http.cors.scaladsl.CorsDirectives.cors
import ch.megard.akka.http.cors.scaladsl.settings.CorsSettings
import com.typesafe.scalalogging.Logger

import scala.util.{Failure, Try}


/** http不同的路径用于处理不同的通信 */
import scala.util.Success
class Routes()(implicit val system: ActorSystem[_]) {
  val settings: CorsSettings.Default = CorsSettings.defaultSettings.copy(
    allowedOrigins = HttpOriginRange.* // * refers to all
  )
  val routes: Route = {
      concat(
        (path("api") & cors(settings)) {
          post {
            entity(as[String]) { bytes =>
              Logger("TSMSP-Portal-Route").info("$ api got a post: " + bytes)
              Try {
                //IOUtils.deserialize[TSMSPMessage](bytes).get.send(GlobalVariables.PlaceInfoMSIP).get// Forward all msg to one ms
                IOUtils.deserialize[TSMSPMessage](bytes).get match { // This is gonna be long...
                  case msg: UserLoginMessage => msg.send(GlobalVariables.PlaceInfoMSIP).get
                }
                //message.handle()//Handle the msg here
              } match {
                case Success(value) =>
                  logger.info("处理成功")
                  complete(fromObject(success = true, value))
                case Failure(e: Throwable) =>
                  logger.error(s"出现未知错误${e.getMessage}")
                  complete(fromString(success = true, e.getMessage))
              }
            }
          }
        },
      )
  }
}
