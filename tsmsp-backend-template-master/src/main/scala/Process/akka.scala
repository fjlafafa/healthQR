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
import scala.util.{Failure, Success}

object Serv {
  case class Request(query: String, replyTo: ActorRef[Response])
  case class Response(result: String)
  def apply(): Behaviors.Receive[Request] =
    Behaviors.receiveMessage[Request] {
      case Request(query, replyTo) =>
        replyTo ! Response(s"$query: Your response")
        Behaviors.same
    }
}

object Client {
  sealed trait Command
  private case class AdaptedResponse(message: String) extends Command
  def apply(server: ActorRef[Request]): Behavior[Command] = {
    Behaviors.setup[Command] {ctx =>
      implicit val timeout: Timeout = 3.seconds
      ctx.ask(server, ref => Serv.Request("request1", ref)) {
        case Success(Serv.Response(message)) => AdaptedResponse(message)
        case Failure(_) => AdaptedResponse("request failed")
      }
      Behaviors.receiveMessage {
        case AdaptedResponse(message) => ctx.log.info(s"response received, message: $message")
          Behaviors.stopped
      }
    }
  }
}

object StartServer {
  def apply(): Behavior[NotUsed] = Behaviors.setup {ctx =>
    val server = ctx.spawn(Serv(), "server")
    val client = ctx.spawn(Client(server), "client")
    Behaviors.empty
  }
  def main(args: Array[String]): Unit = {
    ActorSystem(StartServer(), "system")
  }
}
/*
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
 */