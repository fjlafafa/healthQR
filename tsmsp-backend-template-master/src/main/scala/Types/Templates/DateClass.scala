package Types.Templates
//Not Used

import Impl.JacksonSerializable
import com.fasterxml.jackson.core.{JsonGenerator, JsonParser}
import com.fasterxml.jackson.databind.annotation.{JsonDeserialize, JsonSerialize}
import com.fasterxml.jackson.databind.deser.std.StdDeserializer
import com.fasterxml.jackson.databind.ser.std.StdSerializer
import com.fasterxml.jackson.databind.{DeserializationContext, SerializerProvider}
import org.joda.time.DateTime

@JsonSerialize(using = classOf[DateTimeSerializer])
@JsonDeserialize(using = classOf[DateTimeDeserializer])
case class DateClass(date: DateTime) extends JacksonSerializable

class DateTimeSerializer extends StdSerializer[DateClass](classOf[DateClass]) {
  override def serialize(value: DateClass, gen: JsonGenerator, provider: SerializerProvider): Unit =
    gen.writeString(value.date.getMillis.toString)
}

//???
class DateTimeDeserializer extends StdDeserializer[DateClass](classOf[DateClass]) {
  override def deserialize(p: JsonParser, ctxt: DeserializationContext): DateClass =
    DateClass(new DateTime(p.getText))
}