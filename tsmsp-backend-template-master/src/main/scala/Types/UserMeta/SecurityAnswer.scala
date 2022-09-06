package Types.UserMeta

import Types.Templates.TokenClass

case class SecurityAnswer(override val token : String) extends TokenClass(token)
