package Process.VaccineAndNucleicMS

import Impl.Messages.TSMSPMessage
import Impl.TSMSPReply
import akka.actor.typed.scaladsl.Behaviors
import akka.actor.typed.{ActorRef, Behavior}

object VaccineAndNucleicMSMaster {
  sealed trait Message
  final case class RouterRequest(query: TSMSPMessage, router: ActorRef[RouterResponse]) extends Message
  final case class WorkerResponse(result: TSMSPReply, router: ActorRef[RouterResponse]) extends Message
  case class WorkerTask(query: TSMSPMessage, router: ActorRef[RouterResponse], master: ActorRef[VaccineAndNucleicMSMaster.Message])
  case class RouterResponse(result: TSMSPReply)
  val workerNumber = 4
  def apply(): Behavior[Message] = {
    Behaviors.setup[Message] {ctx =>
      val workers = for (i <- 0 until workerNumber)
        yield ctx.spawn(VaccineAndNucleicMSWorker(i), "worker"+i)
      Behaviors.receiveMessage[Message] {
        case RouterRequest(query, router) =>
          val r = scala.util.Random
          workers(r.nextInt(workerNumber - 1)) ! WorkerTask(query, router, ctx.self)
          Behaviors.same
        case WorkerResponse(answer, router) =>
          router ! RouterResponse(answer)
          Behaviors.same
      }
    }
  }
}

object VaccineAndNucleicMSWorker {
  case class Answer(result: TSMSPReply)
  def apply(id: Int): Behavior[VaccineAndNucleicMSMaster.WorkerTask] = {
    Behaviors.setup[VaccineAndNucleicMSMaster.WorkerTask] {ctx =>
      Behaviors.receiveMessage[VaccineAndNucleicMSMaster.WorkerTask] {
        case VaccineAndNucleicMSMaster.WorkerTask(query, router, master) =>
          ctx.log.info(s"Worker $id begin working.")
          master ! VaccineAndNucleicMSMaster.WorkerResponse(query.handle(), router)
          ctx.log.info(s"Worker $id finished working.")
          Behaviors.same
      }
    }
  }
}