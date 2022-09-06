package Types.UserMeta

import Types.Templates.TokenClass

case class IdentityNumber(override val token: String) extends TokenClass(token)
