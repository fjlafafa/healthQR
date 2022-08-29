package Types.UserMeta

import Types.Templates.NameClass

case class RealName(override val name : String) extends NameClass(name)
