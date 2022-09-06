package Types.UserMeta

import Impl.JacksonSerializable
import Types.Roles._
import com.fasterxml.jackson.core.{JsonGenerator, JsonParser}
import com.fasterxml.jackson.databind.annotation.{JsonDeserialize, JsonSerialize}
import com.fasterxml.jackson.databind.deser.std.StdDeserializer
import com.fasterxml.jackson.databind.ser.std.StdSerializer
import com.fasterxml.jackson.databind.{DeserializationContext, SerializerProvider}

@JsonSerialize(using = classOf[RoleTypeSerializer])
@JsonDeserialize(using = classOf[RoleTypeDeserializer])
sealed abstract class Roles(val v: String) extends JacksonSerializable

case object SuperAdministrator extends Roles(superAdmin)

case object Administrator extends Roles(admin)

case object NormalUser extends Roles(normal)

case object NucleicTestResultReporter extends Roles(nucleic)

case object VaccineInjector extends Roles(vaccine)

case object HospitalWorker extends Roles(hospital)

case object Governor extends Roles(government)


object Roles {
  def objectList: List[Roles] =
    List(SuperAdministrator, Administrator, NormalUser, NucleicTestResultReporter, VaccineInjector, HospitalWorker, Governor)

  def getType(v: String): Roles = objectList.filter(_.v == v).head
}

class RoleTypeSerializer extends StdSerializer[Roles](classOf[Roles]) {
  override def serialize(value: Roles, gen: JsonGenerator, provider: SerializerProvider): Unit =
    gen.writeString(value.v)
}

class RoleTypeDeserializer extends StdDeserializer[Roles](classOf[Roles]) {
  override def deserialize(p: JsonParser, ctxt: DeserializationContext): Roles =
    Roles.getType(p.getText)
}