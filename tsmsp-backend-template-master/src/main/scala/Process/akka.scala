package Process
import Process.Serv.{Request, Response}
import akka.NotUsed
import akka.actor.ActorContext
import akka.actor.typed.ActorRef
import akka.actor.typed.ActorSystem
import akka.actor.typed.Behavior
import akka.actor.typed.scaladsl.Behaviors
import akka.util.Timeout

import scala.concurrent.duration.DurationInt

object Serv {
  case class Request(query: String, replyTo: ActorRef[Response])
  case class Response(result: String)
  def apply(): Behaviors.Receive[Request] =
    Behaviors.receiveMessage[Request] {
      case Request(query, replyTo) =>
        replyTo ! Response("Your response")
        Behaviors.same
    }
}

case class Client() {
  def init(server: ActorRef[Request]): Behavior[Response] = Behaviors.setup {c =>
    server ! Request("request 1", c.self)
    waiting
  }
  val waiting: Behavior[Response] = Behaviors.receivePartial {
    case (ctx, Response(resp_msg)) => ctx.log.info(resp_msg)
      Behaviors.empty
  }
}

object StartUp {
  def apply(): Behavior[Response] = Behaviors.setup {ctx =>
    val server = ctx.spawn(Serv(), "main_server")
    new Client().init(server)
  }
  def main(args: Array[String]): Unit = {
    ActorSystem(StartUp(), "client")
  }
}