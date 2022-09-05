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
sealed abstract class Role(val v:String) extends JacksonSerializable
case object SuperAdministrator extends Role(superAdmin)
case object Administrator extends Role(admin)
case object NormalUser extends Role(normal)
case object NucleicTestResultReporter extends Role(nucleic)
case object VaccineInjector extends Role(vaccine)
case object HospitalWorker extends Role(hospital)
case object Governor extends Role(government)


object Role{
  def objectList: List[Role] =
    List(SuperAdministrator, Administrator, NormalUser, NucleicTestResultReporter, VaccineInjector, HospitalWorker, Governor)
  def getType(v:String): Role= objectList.filter(_.v==v).head
}

class RoleTypeSerializer extends StdSerializer[Role](classOf[Role]) {
  override def serialize(value: Role, gen: JsonGenerator, provider: SerializerProvider): Unit =
    gen.writeString(value.v)
}

class RoleTypeDeserializer extends StdDeserializer[Role](classOf[Role]) {
  override def deserialize(p: JsonParser, ctxt: DeserializationContext): Role=
    Role.getType(p.getText)
}