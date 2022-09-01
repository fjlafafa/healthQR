package Process
import Impl.Messages.TSMSPMessage
import Impl.TSMSPReply
import akka.actor.typed.{ActorRef, Behavior}
import akka.actor.typed.scaladsl.Behaviors

object Master {
  sealed trait Message
  final case class RouterRequest(query: TSMSPMessage, router: ActorRef[RouterResponse]) extends Message
  final case class WorkerResponse(result: TSMSPReply, router: ActorRef[RouterResponse]) extends Message
  case class WorkerTask(query: TSMSPMessage, router: ActorRef[RouterResponse], master: ActorRef[Master.Message])
  case class RouterResponse(result: TSMSPReply)
  def apply(): Behavior[Message] = {
    Behaviors.setup[Message] {ctx =>
      val workers = for (i <- 0 to 4)
        yield ctx.spawn(Worker(i), "worker"+i)
      Behaviors.receiveMessage[Message] {
        case RouterRequest(query, router) =>
          val r = scala.util.Random
          workers(r.nextInt(4)) ! WorkerTask(query, router, ctx.self)
          Behaviors.same
        case WorkerResponse(answer, router) =>
          router ! RouterResponse(answer)
          Behaviors.same
      }
    }
  }
}

object Worker {
  case class Answer(result: TSMSPReply)
  def apply(id: Int): Behavior[Master.WorkerTask] = {
    Behaviors.setup[Master.WorkerTask] {ctx =>
      Behaviors.receiveMessage[Master.WorkerTask] {
        case Master.WorkerTask(query, router, master) =>
          ctx.log.info(s"Worker $id begin working.")
          master ! Master.WorkerResponse(query.handle(), router)
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