package Process.UserInfoMS

import Globals.MicroserviceSettings.userInfoMSWorkerNumbers
import Impl.Messages.TSMSPMessage
import Impl.TSMSPReply
import akka.actor.typed.scaladsl.Behaviors
import akka.actor.typed.{ActorRef, Behavior}

object UserInfoMSMaster {
  sealed trait Message

  final case class RouterRequest(query: TSMSPMessage, router: ActorRef[RouterResponse]) extends Message

  final case class WorkerResponse(result: TSMSPReply, router: ActorRef[RouterResponse]) extends Message

  case class WorkerTask(query: TSMSPMessage, router: ActorRef[RouterResponse], master: ActorRef[UserInfoMSMaster.Message])

  case class RouterResponse(result: TSMSPReply)

  def apply(): Behavior[Message] = {
    Behaviors.setup[Message] { ctx =>
      val workers = for (i <- 0 until userInfoMSWorkerNumbers)
        yield ctx.spawn(UserInfoMSWorker(i), "worker" + i)
      Behaviors.receiveMessage[Message] {
        case RouterRequest(query, router) =>
          val r = scala.util.Random
          workers(r.nextInt(userInfoMSWorkerNumbers)) ! WorkerTask(query, router, ctx.self)
          Behaviors.same
        case WorkerResponse(answer, router) =>
          router ! RouterResponse(answer)
          Behaviors.same
      }
    }
  }
}

object UserInfoMSWorker {
  def apply(id: Int): Behavior[UserInfoMSMaster.WorkerTask] = {
    Behaviors.setup[UserInfoMSMaster.WorkerTask] { ctx =>
      Behaviors.receiveMessage[UserInfoMSMaster.WorkerTask] {
        case UserInfoMSMaster.WorkerTask(query, router, master) =>
          ctx.log.info(s"Worker $id begin working.")
          master ! UserInfoMSMaster.WorkerResponse(query.handle(), router)
          ctx.log.info(s"Worker $id finished working.")
          Behaviors.same
      }
    }
  }
}