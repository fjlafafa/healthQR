package Types.Templates

import Impl.JacksonSerializable
import Types.UserMeta.Temperature
import com.fasterxml.jackson.annotation.{JsonSubTypes, JsonTypeInfo}

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "type")
@JsonSubTypes(
  Array(
    new JsonSubTypes.Type(value = classOf[Temperature], name = "Temperature"),
  )
)
abstract class NumberClass(val num: Double) extends JacksonSerializable