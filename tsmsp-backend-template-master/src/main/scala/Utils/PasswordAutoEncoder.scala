package Utils

import Types.UserMeta._

import scala.language.implicitConversions

object PasswordAutoEncoder {
  def PasswordEncoder(password: Password, salt: Salt): PasswordHash = PasswordHash((password.token+salt.name).hashCode().toString)
}