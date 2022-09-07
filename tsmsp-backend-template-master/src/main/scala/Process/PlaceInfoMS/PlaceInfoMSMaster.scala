package Process.PlaceInfoMS

import Impl.Messages.TSMSPMessage
import Impl.TSMSPReply
import akka.actor.typed.scaladsl.Behaviors
import akka.actor.typed.{ActorRef, Behavior}

object PlaceInfoMSMaster {
  sealed trait Message

  final case class RouterRequest(query: TSMSPMessage, router: ActorRef[RouterResponse]) extends Message

  final case class WorkerResponse(result: TSMSPReply, router: ActorRef[RouterResponse]) extends Message

  case class WorkerTask(query: TSMSPMessage, router: ActorRef[RouterResponse], master: ActorRef[PlaceInfoMSMaster.Message])

  case class RouterResponse(result: TSMSPReply)

  val workerNumber = 4

  def apply(): Behavior[Message] = {
    Behaviors.setup[Message] { ctx =>
      val workers = for (i <- 0 until workerNumber)
        yield ctx.spawn(PlaceInfoMSWorker(i), "worker" + i)
      Behaviors.receiveMessage[Message] {
        case RouterRequest(query, router) =>
          val r = scala.util.Random
          workers(r.nextInt(workerNumber)) ! WorkerTask(query, router, ctx.self)
          Behaviors.same
        case WorkerResponse(answer, router) =>
          router ! RouterResponse(answer)
          Behaviors.same
      }
    }
  }
}

object PlaceInfoMSWorker {
  case class Answer(result: TSMSPReply)

  def apply(id: Int): Behavior[PlaceInfoMSMaster.WorkerTask] = {
    Behaviors.setup[PlaceInfoMSMaster.WorkerTask] { ctx =>
      Behaviors.receiveMessage[PlaceInfoMSMaster.WorkerTask] {
        case PlaceInfoMSMaster.WorkerTask(query, router, master) =>
          ctx.log.info(s"Worker $id begin working.")
          master ! PlaceInfoMSMaster.WorkerResponse(query.handle(), router)
          ctx.log.info(s"Worker $id finished working.")
          Behaviors.same
      }
    }
  }
}