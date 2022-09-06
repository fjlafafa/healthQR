package Types.UserMeta

import Types.Templates.TokenClass

case class SecurityAnswerHash(override val token : String) extends TokenClass(token)
