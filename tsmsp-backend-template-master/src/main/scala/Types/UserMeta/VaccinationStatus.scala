package Types.UserMeta

import Impl.JacksonSerializable
import Types.VaccinationStatuses._
import com.fasterxml.jackson.core.{JsonGenerator, JsonParser}
import com.fasterxml.jackson.databind.annotation.{JsonDeserialize, JsonSerialize}
import com.fasterxml.jackson.databind.deser.std.StdDeserializer
import com.fasterxml.jackson.databind.ser.std.StdSerializer
import com.fasterxml.jackson.databind.{DeserializationContext, SerializerProvider}

@JsonSerialize(using = classOf[VaccinationStatusTypeSerializer])
@JsonDeserialize(using = classOf[VaccinationStatusTypeDeserializer])
sealed abstract class VaccinationStatus(val v: String) extends JacksonSerializable

case object Triple extends VaccinationStatus(triple)

case object Dual extends VaccinationStatus(dual)

case object Single extends VaccinationStatus(single)

case object No extends VaccinationStatus(none)


object VaccinationStatus {
  def objectList: List[VaccinationStatus] =
    List(Triple, Dual, Single, No)

  def getType(v: String): VaccinationStatus = objectList.filter(_.v == v).head

  def step: Map[VaccinationStatus, VaccinationStatus] = Map(
    No -> Single,
    Single -> Dual,
    Dual -> Triple,
    Triple -> Triple
  )
}

class VaccinationStatusTypeSerializer extends StdSerializer[VaccinationStatus](classOf[VaccinationStatus]) {
  override def serialize(value: VaccinationStatus, gen: JsonGenerator, provider: SerializerProvider): Unit =
    gen.writeString(value.v)
}

class VaccinationStatusTypeDeserializer extends StdDeserializer[VaccinationStatus](classOf[VaccinationStatus]) {
  override def deserialize(p: JsonParser, ctxt: DeserializationContext): VaccinationStatus =
    VaccinationStatus.getType(p.getText)
}