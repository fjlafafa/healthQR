package Types.UserMeta

import Types.Templates.NumberClass

case class Temperature(override val value: Double) extends NumberClass(value)
