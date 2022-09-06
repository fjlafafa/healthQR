package Types.UserMeta

import Types.Templates.TokenClass

case class PasswordHash(override val token: String) extends TokenClass(token)
