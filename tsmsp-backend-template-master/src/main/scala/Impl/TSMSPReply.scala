package Impl

import com.fasterxml.jackson.annotation.JsonSubTypes

@JsonSubTypes(
  Array(new JsonSubTypes.Type (value = classOf[AdminTestReply], name = "AdminTestReply"),
  )
)
case class TSMSPReply(status : Int, message : String) extends JacksonSerializable
