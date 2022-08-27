package Types.UserMeta

import Impl.JacksonSerializable
import com.fasterxml.jackson.core.{JsonGenerator, JsonParser}
import com.fasterxml.jackson.databind.annotation.{JsonDeserialize, JsonSerialize}
import com.fasterxml.jackson.databind.deser.std.StdDeserializer
import com.fasterxml.jackson.databind.ser.std.StdSerializer
import com.fasterxml.jackson.databind.{DeserializationContext, SerializerProvider}

@JsonSerialize(using = classOf[UserRiskLevelTypeSerializer])
@JsonDeserialize(using = classOf[UserRiskLevelTypeDeserializer])
sealed abstract class UserRiskLevel(val v:String) extends JacksonSerializable
case object Red extends UserRiskLevel("Dangerous")
case object Yellow extends UserRiskLevel("Closedly Related")
case object PopUps extends UserRiskLevel("Vulnerable")
case object Green extends UserRiskLevel("Safe")


object UserRiskLevel{
  def objectList: List[UserRiskLevel] =
    List(Red, Yellow, PopUps, Green)
  def getType(v:String): UserRiskLevel= objectList.filter(_.v==v).head
}

class UserRiskLevelTypeSerializer extends StdSerializer[UserRiskLevel](classOf[UserRiskLevel]) {
  override def serialize(value: UserRiskLevel, gen: JsonGenerator, provider: SerializerProvider): Unit =
    gen.writeString(value.v)
}

class UserRiskLevelTypeDeserializer extends StdDeserializer[UserRiskLevel](classOf[UserRiskLevel]) {
  override def deserialize(p: JsonParser, ctxt: DeserializationContext): UserRiskLevel=
    UserRiskLevel.getType(p.getText)
}