package Impl

case class AdminTestReply(override val status : Int, override val message : String) extends TSMSPReply(status, message)
