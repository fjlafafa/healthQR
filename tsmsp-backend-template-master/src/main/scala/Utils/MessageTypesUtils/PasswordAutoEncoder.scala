package Utils.MessageTypesUtils

import Types.UserMeta._

import scala.language.implicitConversions

object PasswordAutoEncoder {
  def PasswordEncoder(password: Password, salt: Salt): PasswordHash = PasswordHash((password.token + salt.name).hashCode().toString)

  def SecurityAnswerEncoder(securityAnswer: SecurityAnswer, salt: Salt): SecurityAnswerHash = SecurityAnswerHash((securityAnswer.token + salt.name).hashCode().toString)
}