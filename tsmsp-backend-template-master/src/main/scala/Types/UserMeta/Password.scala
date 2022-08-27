package Types.UserMeta

import Impl.JacksonSerializable

case class Password(hashValue : Int) extends JacksonSerializable
