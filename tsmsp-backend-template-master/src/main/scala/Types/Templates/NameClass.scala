package Types.Templates

import Impl.JacksonSerializable
import Types.PlaceMeta.{City, DetailedPlaceDescription, District, Province, SubDistrict}
import Types.UserMeta.RealName
import com.fasterxml.jackson.annotation.{JsonSubTypes, JsonTypeInfo}

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "type")
@JsonSubTypes(
  Array(
    new JsonSubTypes.Type(value = classOf[SubDistrict], name = "SubDistrict"),
    new JsonSubTypes.Type(value = classOf[City], name = "City"),
    new JsonSubTypes.Type(value = classOf[DetailedPlaceDescription], name = "DetailedPlaceDescription"),
    new JsonSubTypes.Type(value = classOf[District], name = "District"),
    new JsonSubTypes.Type(value = classOf[Province], name = "Province"),
    new JsonSubTypes.Type(value = classOf[RealName], name = "RealName"),
  ))
abstract class NameClass(val name: String) extends JacksonSerializable
