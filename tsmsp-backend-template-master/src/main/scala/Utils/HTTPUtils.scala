package Utils

import Globals.GlobalVariables
import Impl.{JacksonSerializable, TSMSPReply}
import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.model.HttpMethods.POST
import akka.http.scaladsl.model.{HttpRequest, HttpResponse, StatusCodes}
import akka.http.scaladsl.unmarshalling.Unmarshal
import akka.util.Timeout

import java.util.concurrent.TimeUnit
import scala.concurrent.duration.{Duration, DurationInt}
import scala.concurrent.{Await, ExecutionContextExecutor, Future}
import scala.language.postfixOps
import scala.util.Try

object HTTPUtils {

  /**
   * 这三个是akka-http-Client执行时的隐式参数，其中timeout代表了单次请求的时间限制。
   */
  implicit val system:  ActorSystem = GlobalVariables.clientSystem.classicSystem
  implicit val ec: ExecutionContextExecutor = system.dispatcher
  implicit val timeout: Timeout = Timeout(10, TimeUnit.SECONDS)
  case class ConnectionFailedException() extends Exception {
    override def getMessage: String = "网络连接错误！"
  }
  def sendMessage(message : JacksonSerializable, uri : String): Try[TSMSPReply]= Try {
    /**
     * 使用akka自带的自动retry功能，失败时自动重试
     */
    val result: Future[HttpResponse] = akka.pattern.retry(() =>
      Http().singleRequest(HttpRequest(POST,
        uri = uri,
        entity = IOUtils.serialize(message).get)).map {
        case res: HttpResponse if res.status.isSuccess => res
        case res: HttpResponse if res.status.isFailure => throw ConnectionFailedException()
      }, attempts = 10, 1 seconds)(ec, system.scheduler)

    /**
     * 等待HTTP请求执行完毕
     */
    val returnMessage = Await.result(result, timeout.duration)
    if (returnMessage.status != StatusCodes.OK) throw ConnectionFailedException()

    /**
     * HTTP请求收到的回复转化为TSMSPReply
     */
    val waitedOutcome = Await.result(Unmarshal(returnMessage).to[String], Duration.Inf)
    val reply2 = IOUtils.deserialize[TSMSPReply](waitedOutcome).get
    reply2
  }

  /**
   * 隐式转换，给所有继承了JacksonSerializable的子类提供了send方法，可以很方便地调用。
   * @param message
   */
  implicit class sender(message : JacksonSerializable) {
    def send(uri : String) : Try[TSMSPReply] = sendMessage(message, uri)
  }
}
