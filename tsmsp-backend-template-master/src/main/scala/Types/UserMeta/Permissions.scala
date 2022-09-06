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
sealed abstract class Permissions(val v:String) extends JacksonSerializable
case object SetAdmin extends Permissions(setAdmin)
case object SetThirdParty extends Permissions(setThirdParty)
case object UpdateVaccination extends Permissions(updateVaccination)
case object UpdateNucleicTest extends Permissions(updateNucleicTest)
case object RecoverPatient extends Permissions(recoverPatient)
case object SetRiskOfPlace extends Permissions(setRiskOfPlace)
case object SetRiskOfUser extends Permissions(setRiskOfUser)


object Permissions {
  def objectList: List[Permissions] =
    List(SetAdmin, SetThirdParty, UpdateVaccination, UpdateNucleicTest, RecoverPatient, SetRiskOfPlace, SetRiskOfUser)
  def getType(v:String): Permissions = objectList.filter(_.v==v).head
}

class PermissionTypeSerializer extends StdSerializer[Permissions](classOf[Permissions]) {
  override def serialize(value: Permissions, gen: JsonGenerator, provider: SerializerProvider): Unit =
    gen.writeString(value.v)
}

class PermissionTypeDeserializer extends StdDeserializer[Permissions](classOf[Permissions]) {
  override def deserialize(p: JsonParser, ctxt: DeserializationContext): Permissions =
    Permissions.getType(p.getText)
}