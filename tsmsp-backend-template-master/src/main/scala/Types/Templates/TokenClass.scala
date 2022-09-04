package Types.Templates

import Impl.JacksonSerializable
import Types.UserMeta.{IdentityNumber, Password, PasswordHash, Token}
import com.fasterxml.jackson.annotation.{JsonSubTypes, JsonTypeInfo}

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "type")
@JsonSubTypes(
  Array(
    new JsonSubTypes.Type(value = classOf[Token], name = "Token"),
    new JsonSubTypes.Type(value = classOf[IdentityNumber], name = "IdentityNumber"),
    new JsonSubTypes.Type(value = classOf[PasswordHash], name = "PasswordHash"),
    new JsonSubTypes.Type(value = classOf[Password], name = "Password"),
  ))
abstract class TokenClass(val token: String) extends JacksonSerializable
