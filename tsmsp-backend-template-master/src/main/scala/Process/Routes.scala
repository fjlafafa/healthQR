package Process

import Impl.Messages.TSMSPMessage
import Impl.{STATUS_ERROR, TSMSPReply}
import Process.Server.logger
import Utils.IOUtils
import Utils.IOUtils.{fromObject, fromString}
import akka.actor.typed.ActorSystem
import akka.actor.typed.scaladsl.AskPattern.Askable
import akka.http.scaladsl.model.headers.HttpOriginRange
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import akka.util.Timeout
import ch.megard.akka.http.cors.scaladsl.CorsDirectives.cors
import ch.megard.akka.http.cors.scaladsl.settings.CorsSettings
import com.typesafe.scalalogging.Logger

import scala.concurrent.Future
import scala.concurrent.duration.DurationInt
import scala.util.{Failure, Try}


/** http不同的路径用于处理不同的通信 */
import scala.util.Success
class Routes()(implicit val system: ActorSystem[Master.Request]) {
  val settings: CorsSettings.Default = CorsSettings.defaultSettings.copy(
    allowedOrigins = HttpOriginRange.* // * refers to all
  )
  implicit val timeout: Timeout = 3.seconds
  implicit val scheduler = system.scheduler
  implicit val ec = system.executionContext
  val routes: Route = {
      concat(
        (path("api") & cors(settings)) {
          post {
            entity(as[String]) { bytes =>
              Logger("TSMSP-Portal-Route").info("$ api got a post: " + bytes)
              Try {
                val message = IOUtils.deserialize[TSMSPMessage](bytes).get
                message.handle()
                /*
                val ans : Future[Master.Response] = system.ask(ref => Master.Request(message, ref))
                var msg : TSMSPReply = TSMSPReply(STATUS_ERROR, "无法识别的消息")
                ans.onComplete {
                  case Success(Master.Response(message)) =>
                    msg = message
                }
                msg
                 */
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
