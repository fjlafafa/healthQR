package Utils.MessageTypesUtils

import Types.UserMeta.{Password, PasswordHash, Salt}

object PasswordAutoEncoder {
  def PasswordEncoder(password: Password, salt: Salt): PasswordHash = PasswordHash((password.token + salt.name).hashCode().toString)
}
