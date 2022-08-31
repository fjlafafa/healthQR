package Types.TraceMeta

import Impl.JacksonSerializable
import Types.ReportTypes._
import com.fasterxml.jackson.core.{JsonGenerator, JsonParser}
import com.fasterxml.jackson.databind.annotation.{JsonDeserialize, JsonSerialize}
import com.fasterxml.jackson.databind.deser.std.StdDeserializer
import com.fasterxml.jackson.databind.ser.std.StdSerializer
import com.fasterxml.jackson.databind.{DeserializationContext, SerializerProvider}

@JsonSerialize(using = classOf[ReportTypeTypeSerializer])
@JsonDeserialize(using = classOf[ReportTypeTypeDeserializer])
sealed abstract class ReportType(val v:String) extends JacksonSerializable
case object ScanQRCodeReport extends ReportType(auto)
case object SelfReport extends ReportType(self)


object ReportType{
  def objectList: List[ReportType] =
    List(ScanQRCodeReport, SelfReport)
  def getType(v:String): ReportType= objectList.filter(_.v==v).head
}

class ReportTypeTypeSerializer extends StdSerializer[ReportType](classOf[ReportType]) {
  override def serialize(value: ReportType, gen: JsonGenerator, provider: SerializerProvider): Unit =
    gen.writeString(value.v)
}

class ReportTypeTypeDeserializer extends StdDeserializer[ReportType](classOf[ReportType]) {
  override def deserialize(p: JsonParser, ctxt: DeserializationContext): ReportType=
    ReportType.getType(p.getText)
}