package Process
import Impl.Messages.TSMSPMessage
import Impl.TSMSPReply
import Utils.IOUtils
import akka.NotUsed
import akka.actor.TypedActor.dispatcher
import akka.actor.{Actor, ActorContext}
import akka.actor.typed.ActorRef
import akka.actor.typed.ActorSystem
import akka.actor.typed.Behavior
import akka.actor.typed.scaladsl.AskPattern.Askable
import akka.actor.typed.scaladsl.Behaviors
import akka.util.Timeout

import scala.concurrent.ExecutionContext
import scala.concurrent.duration.DurationInt
import scala.util.{Failure, Success}

object Master {
  import akka.pattern.{ask, pipe}
  case class Request(query: TSMSPMessage, replyTo: ActorRef[Response])
  case class Response(result: TSMSPReply)
  def apply(): Behavior[Request] = {
    Behaviors.setup[Request] {ctx =>
      implicit val timeout: Timeout = 3.seconds
      implicit val scheduler = ctx.system.scheduler
      val workers = for (i <- 0 to 4)
        yield ctx.spawn(Worker(i), "worker"+i)
      Behaviors.receiveMessage[Request] {
        case Request(query, replyTo) =>
          val r = scala.util.Random
          val ans = workers(r.nextInt(4)).ask(ref => Worker.Task(query, ref))
          ans.onComplete {
            case Success(Worker.Answer(ans)) => replyTo ! Response(ans)
          }
          Behaviors.same
      }
    }
  }
}

object Worker {
  import Impl.Messages.TSMSPMessage
  case class Task(query: TSMSPMessage, replyTo: ActorRef[Answer])
  case class Answer(result: TSMSPReply)
  def apply(id: Int): Behavior[Task] = {
    Behaviors.setup[Task] {ctx =>
      Behaviors.receiveMessage[Task] {
        case Task(query, replyTo) =>
          ctx.log.info(s"Worker $id begin working.")
          replyTo ! Answer(query.handle())
          ctx.log.info(s"Worker $id finished working.")
          Behaviors.same
      }
    }
  }
}
/*
object Client {
  sealed trait Command
  private case class AdaptedResponse(message: String) extends Command
  def apply(server: ActorRef[Master.Request]): Behavior[Command] = {
    Behaviors.setup[Command] {ctx =>
      implicit val timeout: Timeout = 3.seconds
      ctx.ask(server, ref => Master.Request("request1", ref)) {
        case Success(Master.Response(message)) => AdaptedResponse(message)
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
    val server = ctx.spawn(Master(), "server")
    val client = ctx.spawn(Client(server), "client")
    Behaviors.empty
  }
  def main(args: Array[String]): Unit = {
    ActorSystem(StartServer(), "system")
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
    val server = ctx.spawn(Master(), "main_server")
    new Client().init(server)
  }
  def main(args: Array[String]): Unit = {
    ActorSystem(StartUp(), "client")
  }
}
 */