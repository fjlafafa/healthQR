package Globals

import akka.actor.typed.ActorSystem
import akka.actor.typed.scaladsl.Behaviors

object GlobalVariables {
  val mainSchema : Option[String] = Some("tsmsp_portal")
  val listenAddress : String = "0.0.0.0"
  val listenPortal : Int = 6070
  lazy val clientSystem : ActorSystem[Nothing] = ActorSystem[Nothing](Behaviors.empty[Nothing], "client-system")
  val PlaceInfoMSPortal : Int = 6071
  val PlaceInfoMSIP : String = "http://localhost:" + PlaceInfoMSPortal.toString + "/api"
  val UserInfoMSPortal : Int = 6072
  val UserInfoMSIP : String = "http://localhost:" + UserInfoMSPortal.toString + "/api"
  val VaccineAndNucleicMSPortal : Int = 6073
  val VaccineAndNucleicMSIP : String = "http://localhost:" + VaccineAndNucleicMSPortal.toString + "/api"
}
 