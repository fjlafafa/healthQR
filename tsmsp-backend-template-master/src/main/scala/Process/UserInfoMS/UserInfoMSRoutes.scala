package Process.UserInfoMS

import Impl.Messages.TSMSPMessage
import Process.UserInfoMS.UserInfoMSServer.logger
import Utils.IOUtils
import Utils.IOUtils.{fromObject, fromString}
import akka.actor.typed.scaladsl.AskPattern.Askable
import akka.actor.typed.{ActorSystem, Scheduler}
import akka.http.scaladsl.model.headers.HttpOriginRange
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import akka.util.Timeout
import ch.megard.akka.http.cors.scaladsl.CorsDirectives.cors
import ch.megard.akka.http.cors.scaladsl.settings.CorsSettings
import com.typesafe.scalalogging.Logger

import scala.concurrent.duration.DurationInt
import scala.concurrent.{Await, ExecutionContextExecutor, Future}
import scala.util.{Failure, Try}


/** http不同的路径用于处理不同的通信 */
import scala.util.Success

class UserInfoMSRoutes()(implicit val system: ActorSystem[UserInfoMSMaster.Message]) {
  val settings: CorsSettings.Default = CorsSettings.defaultSettings.copy(
    allowedOrigins = HttpOriginRange.* // * refers to all
  )
  implicit val timeout: Timeout = 10.seconds
  implicit val scheduler: Scheduler = system.scheduler
  implicit val ec: ExecutionContextExecutor = system.executionContext
  val routes: Route = {
    concat(
      (path("api") & cors(settings)) {
        post {
          entity(as[String]) { bytes =>
            Logger("TSMSP-Portal-Route").info("$ api got a post: " + bytes)
            Try {
              val message = IOUtils.deserialize[TSMSPMessage](bytes).get
              //message.handle()
              val ans: Future[UserInfoMSMaster.RouterResponse] = system.ask(ref => UserInfoMSMaster.RouterRequest(message, ref))
              Await.result(ans, timeout.duration).result
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
