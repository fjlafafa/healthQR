package Utils

import Types.UserMeta._

import scala.language.implicitConversions

object PasswordAutoEncoder {
  implicit def PasswordEncoder(password: Password): PasswordHash = PasswordHash(password.token.hashCode().toString)
}