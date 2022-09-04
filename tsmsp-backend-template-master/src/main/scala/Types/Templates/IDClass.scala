package Types.Templates

import Impl.JacksonSerializable
import Types.PlaceMeta.PlaceId
import Types.TraceMeta.TraceId
import Types.UserMeta.UserId
import com.fasterxml.jackson.annotation.{JsonSubTypes, JsonTypeInfo}

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "type")
@JsonSubTypes(
  Array(
    new JsonSubTypes.Type(value = classOf[TraceId], name = "TraceId"),
    new JsonSubTypes.Type(value = classOf[UserId], name = "UserId"),
    new JsonSubTypes.Type(value = classOf[PlaceId], name = "PlaceId"),
  ))
abstract class IDClass(val id: Long) extends JacksonSerializable
