package Types.UserMeta

import Types.Templates.TokenClass

case class Password(override val token : String) extends TokenClass(token)
