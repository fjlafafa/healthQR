package Types.UserMeta

import Types.IDClass

case class Password(hashValue : Long) extends IDClass(hashValue)
