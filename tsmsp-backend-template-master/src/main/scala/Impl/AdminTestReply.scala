package Impl

import Types.PlaceMeta.PlaceRiskLevel

case class AdminTestReply(override val status: Int, override val messages: String, risk : PlaceRiskLevel) extends TSMSPReply {

}
