package Utils

import Types.UserMeta._

object PasswordAutoEncoder {
  implicit def PasswordEncoder(password: Password): PasswordHash = PasswordHash(password.token.hashCode().toString)
}