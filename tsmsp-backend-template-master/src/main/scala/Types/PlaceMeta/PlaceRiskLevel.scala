package Types.PlaceMeta

import Impl.JacksonSerializable
import Types.PlaceRiskLevels._
import com.fasterxml.jackson.core.{JsonGenerator, JsonParser}
import com.fasterxml.jackson.databind.annotation.{JsonDeserialize, JsonSerialize}
import com.fasterxml.jackson.databind.deser.std.StdDeserializer
import com.fasterxml.jackson.databind.ser.std.StdSerializer
import com.fasterxml.jackson.databind.{DeserializationContext, SerializerProvider}

@JsonSerialize(using = classOf[PlaceRiskLevelTypeSerializer])
@JsonDeserialize(using = classOf[PlaceRiskLevelTypeDeserializer])
sealed abstract class PlaceRiskLevel(val v:String) extends JacksonSerializable
case object Red extends PlaceRiskLevel(red)
case object Yellow extends PlaceRiskLevel(yellow)
case object Green extends PlaceRiskLevel(green)


object PlaceRiskLevel{
  def objectList: List[PlaceRiskLevel] =
    List(Red, Yellow, Green)
  def getType(v:String): PlaceRiskLevel= objectList.filter(_.v==v).head
}

class PlaceRiskLevelTypeSerializer extends StdSerializer[PlaceRiskLevel](classOf[PlaceRiskLevel]) {
  override def serialize(value: PlaceRiskLevel, gen: JsonGenerator, provider: SerializerProvider): Unit =
    gen.writeString(value.v)
}

class PlaceRiskLevelTypeDeserializer extends StdDeserializer[PlaceRiskLevel](classOf[PlaceRiskLevel]) {
  override def deserialize(p: JsonParser, ctxt: DeserializationContext): PlaceRiskLevel=
    PlaceRiskLevel.getType(p.getText)
}