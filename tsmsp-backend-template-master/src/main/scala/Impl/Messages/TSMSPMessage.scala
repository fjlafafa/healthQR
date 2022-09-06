package Impl.Messages

import Impl.Messages.AdminMessages.AdminChangeRoleMessage
import Impl.Messages.MSCommunicationMessages.PlaceInfoMSMessages.MSUserGetPlaceMessage
import Impl.Messages.MSCommunicationMessages.UserInfoMSMessages._
import Impl.Messages.MSCommunicationMessages.VaccineAndNucleicAcidMSMessages._
import Impl.Messages.TestMessages.{AdminDropDataBasesMessage, AdminTestMessage}
import Impl.Messages.ThirdPartyMessages._
import Impl.Messages.UserMessages._
import Impl.{JacksonSerializable, STATUS_ERROR, TSMSPReply}
import com.fasterxml.jackson.annotation.{JsonSubTypes, JsonTypeInfo}
import org.joda.time.DateTime

import scala.util.{Failure, Success, Try}

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "type")
@JsonSubTypes(
  Array(
    new JsonSubTypes.Type(value = classOf[UserGetPlaceMessage], name = "UserGetPlaceMessage"),
    new JsonSubTypes.Type(value = classOf[UserGetTraceMessage], name = "UserGetTraceMessage"),
    new JsonSubTypes.Type(value = classOf[UserLoginMessage], name = "UserLoginMessage"),
    new JsonSubTypes.Type(value = classOf[UserCheckRoleMessage], name = "UserCheckRoleMessage"),
    new JsonSubTypes.Type(value = classOf[UserRegisterMessage], name = "UserRegisterMessage"),
    new JsonSubTypes.Type(value = classOf[UserUpdatePasswordMessage], name = "UserUpdatePasswordMessage"),
    new JsonSubTypes.Type(value = classOf[UserUpdateTraceMessage], name = "UserUpdateTraceMessage"),
    new JsonSubTypes.Type(value = classOf[UserDeleteTraceMessage], name = "UserDeleteTraceMessage"),
    new JsonSubTypes.Type(value = classOf[UserGetRealNameMessage], name = "UserGetRealNameMessage"),
    new JsonSubTypes.Type(value = classOf[UserDeleteAccountMessage], name = "UserDeleteAccountMessage"),
    new JsonSubTypes.Type(value = classOf[UserGetInfoMessage], name = "UserGetInfoMessage"),
    new JsonSubTypes.Type(value = classOf[UserGetSecurityQuestionMessage], name = "UserGetSecurityQuestionMessage"),
    new JsonSubTypes.Type(value = classOf[AdminChangeRoleMessage], name = "AdminChangeRoleMessage"),
    new JsonSubTypes.Type(value = classOf[AdminDropDataBasesMessage], name = "AdminDropDataBasesMessage"),
    new JsonSubTypes.Type(value = classOf[AdminTestMessage], name = "AdminTestMessage"),
    new JsonSubTypes.Type(value = classOf[HospitalUpdateNucleicTestByTokenMessage], name = "HospitalUpdateNucleicTestByTokenMessage"),
    new JsonSubTypes.Type(value = classOf[HospitalUpdateVaccinationByTokenMessage], name = "HospitalUpdateVaccinationByTokenMessage"),
    new JsonSubTypes.Type(value = classOf[HospitalUpdateNucleicTestMessage], name = "HospitalUpdateNucleicTestMessage"),
    new JsonSubTypes.Type(value = classOf[HospitalUpdateVaccinationMessage], name = "HospitalUpdateVaccinationMessage"),
    new JsonSubTypes.Type(value = classOf[HospitalUpdateRiskLevelByTokenMessage], name = "HospitalUpdateRiskLevelByTokenMessage"),
    new JsonSubTypes.Type(value = classOf[HospitalUpdateRiskLevelMessage], name = "HospitalUpdateRiskLevelMessage"),
    new JsonSubTypes.Type(value = classOf[MSUserDeleteTraceMessage], name = "MSUserDeleteTraceMessage"),
    new JsonSubTypes.Type(value = classOf[MSUserGetTraceMessage], name = "MSUserGetTraceMessage"),
    new JsonSubTypes.Type(value = classOf[MSUserUpdateTraceMessage], name = "MSUserUpdateTraceMessage"),
    new JsonSubTypes.Type(value = classOf[MSHospitalUpdateNucleicTestMessage], name = "MSHospitalUpdateNucleicTestMessage"),
    new JsonSubTypes.Type(value = classOf[MSHospitalUpdateVaccinationMessage], name = "MSHospitalUpdateVaccinationMessage"),
    new JsonSubTypes.Type(value = classOf[MSHospitalUpdateRiskLevelMessage], name = "MSHospitalUpdateRiskLevelMessage"),
    new JsonSubTypes.Type(value = classOf[MSUserCheckInfoMessage], name = "MSUserCheckInfoMessage"),
    new JsonSubTypes.Type(value = classOf[MSUserGetPlaceMessage], name = "MSUserGetPlaceMessage"),
  ))
abstract class TSMSPMessage extends JacksonSerializable {
  def handle(): TSMSPReply = reaction(
    DateTime.now()) match {
    case Success(value) => value
    case Failure(exception) => TSMSPReply(STATUS_ERROR, exception.getMessage)
  }

  def reaction(now: DateTime): Try[TSMSPReply] = Try(TSMSPReply(STATUS_ERROR, "无法识别的消息"))
}
