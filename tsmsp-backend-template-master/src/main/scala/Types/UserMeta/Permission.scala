package Types.UserMeta

import Impl.JacksonSerializable
import Types.Permissions._
import com.fasterxml.jackson.core.{JsonGenerator, JsonParser}
import com.fasterxml.jackson.databind.annotation.{JsonDeserialize, JsonSerialize}
import com.fasterxml.jackson.databind.deser.std.StdDeserializer
import com.fasterxml.jackson.databind.ser.std.StdSerializer
import com.fasterxml.jackson.databind.{DeserializationContext, SerializerProvider}

@JsonSerialize(using = classOf[PermissionTypeSerializer])
@JsonDeserialize(using = classOf[PermissionTypeDeserializer])
sealed abstract class Permission(val v:String) extends JacksonSerializable
case object SetAdmin extends Permission(setAdmin)
case object SetThirdParty extends Permission(setThirdParty)
case object UpdateVaccination extends Permission(updateVaccination)
case object UpdateNucleicTest extends Permission(updateNucleicTest)
case object RecoverPatient extends Permission(recoverPatient)
case object SetRiskOfPlace extends Permission(setRiskOfPlace)
case object SetRiskOfUser extends Permission(setRiskOfUser)


object Permission {
  def objectList: List[Permission] =
    List(SetAdmin, SetThirdParty, UpdateVaccination, UpdateNucleicTest, RecoverPatient, SetRiskOfPlace, SetRiskOfUser)
  def getType(v:String): Permission = objectList.filter(_.v==v).head
}

class PermissionTypeSerializer extends StdSerializer[Permission](classOf[Permission]) {
  override def serialize(value: Permission, gen: JsonGenerator, provider: SerializerProvider): Unit =
    gen.writeString(value.v)
}

class PermissionTypeDeserializer extends StdDeserializer[Permission](classOf[Permission]) {
  override def deserialize(p: JsonParser, ctxt: DeserializationContext): Permission =
    Permission.getType(p.getText)
}