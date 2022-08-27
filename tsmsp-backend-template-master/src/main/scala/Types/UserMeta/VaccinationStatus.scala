package Types.UserMeta

import Impl.JacksonSerializable
import com.fasterxml.jackson.core.{JsonGenerator, JsonParser}
import com.fasterxml.jackson.databind.annotation.{JsonDeserialize, JsonSerialize}
import com.fasterxml.jackson.databind.deser.std.StdDeserializer
import com.fasterxml.jackson.databind.ser.std.StdSerializer
import com.fasterxml.jackson.databind.{DeserializationContext, SerializerProvider}

@JsonSerialize(using = classOf[VaccinationStatusTypeSerializer])
@JsonDeserialize(using = classOf[VaccinationStatusTypeDeserializer])
sealed abstract class VaccinationStatus(val v:String) extends JacksonSerializable
case object Triple extends VaccinationStatus("Three")
case object Dual extends VaccinationStatus("Two")
case object Single extends VaccinationStatus("One")
case object No extends VaccinationStatus("Zero")


object VaccinationStatus{
  def objectList: List[VaccinationStatus] =
    List(Triple, Dual, Single, No)
  def getType(v:String): VaccinationStatus= objectList.filter(_.v==v).head
}

class VaccinationStatusTypeSerializer extends StdSerializer[VaccinationStatus](classOf[VaccinationStatus]) {
  override def serialize(value: VaccinationStatus, gen: JsonGenerator, provider: SerializerProvider): Unit =
    gen.writeString(value.v)
}

class VaccinationStatusTypeDeserializer extends StdDeserializer[VaccinationStatus](classOf[VaccinationStatus]) {
  override def deserialize(p: JsonParser, ctxt: DeserializationContext): VaccinationStatus=
    VaccinationStatus.getType(p.getText)
}