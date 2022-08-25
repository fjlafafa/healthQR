package Impl.Messages

import Impl.{JacksonSerializable, STATUS_ERROR, TSMSPReply}
import com.fasterxml.jackson.annotation.{JsonSubTypes, JsonTypeInfo}
import org.joda.time.DateTime

import scala.util.{Failure, Success, Try}

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "type")
@JsonSubTypes(
  Array(
    new JsonSubTypes.Type(value = classOf[UserGetTraceMessage], name = "UserGetTraceMessage"),
    new JsonSubTypes.Type(value = classOf[UserLoginMessage], name = "UserLoginMessage"),
    new JsonSubTypes.Type(value = classOf[UserRegisterMessage], name = "UserRegisterMessage"),
    new JsonSubTypes.Type(value = classOf[UserUpdatePasswordMessage], name = "UserUpdatePasswordMessage"),
    new JsonSubTypes.Type(value = classOf[UserUpdateTraceMessage], name = "UserUpdateTraceMessage"),
    new JsonSubTypes.Type(value = classOf[UserDeleteTraceMessage], name = "UserDeleteTraceMessage"),
    new JsonSubTypes.Type (value = classOf[UserDeleteAccountMessage], name = "UserDeleteAccountMessage")
  ))
abstract class TSMSPMessage extends JacksonSerializable {
  def handle() : TSMSPReply = reaction(DateTime.now()) match {
    case Success(value) => value
    case Failure(exception) => TSMSPReply(STATUS_ERROR, exception.getMessage)
  }
  def reaction(now : DateTime) : Try[TSMSPReply] = Try(TSMSPReply(STATUS_ERROR, "无法识别的消息"))
}
