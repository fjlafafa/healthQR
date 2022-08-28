package Types.UserMeta

import Impl.JacksonSerializable
import Types.NameClass

case class IdentityNumber(override val name : String) extends NameClass(name)
