package Impl

import com.fasterxml.jackson.annotation.{JsonSubTypes, JsonTypeInfo}

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "type")
@JsonSubTypes(
  Array(
    new JsonSubTypes.Type(value = classOf[AdminTestReply], name = "AdminTestReply")
  )
)
case class TSMSPReply(status : Int, message : String) extends JacksonSerializable
