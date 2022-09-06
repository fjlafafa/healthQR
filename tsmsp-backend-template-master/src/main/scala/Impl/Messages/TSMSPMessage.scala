package Impl.Messages

import Impl.Messages.AdminMessages.{AdminChangeRoleMessage, GovernorUpdateRiskOfPlaceMessage, GovernorUpdateRiskOfUserMessage}
import Impl.Messages.MSCommunicationMessages.PlaceInfoMSMessages.{MSGovernorUpdateRiskOfPlaceMessage, MSHospitalUpdatePlaceRiskLevelMessage, MSUserGetPlaceMessage}
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
    new JsonSubTypes.Type(value = classOf[UserUpdateSecurityQuestionMessage], name = "UserUpdateSecurityQuestionMessage"),
    new JsonSubTypes.Type(value = classOf[UserUpdateSecurityAnswerMessage], name = "UserUpdateSecurityAnswerMessage"),
    new JsonSubTypes.Type(value = classOf[UserGetIdMessage], name = "UserGetIdMessage"),
    new JsonSubTypes.Type(value = classOf[UserGetIdentityNumberMessage], name = "UserGetIdentityNumberMessage"),
    new JsonSubTypes.Type(value = classOf[UserSendSecurityAnswerMessage], name = "UserSendSecurityAnswerMessage"),
    new JsonSubTypes.Type(value = classOf[UserDeleteAccountMessage], name = "UserDeleteAccountMessage"),
    new JsonSubTypes.Type(value = classOf[UserGetInfoMessage], name = "UserGetInfoMessage"),
    new JsonSubTypes.Type(value = classOf[UserGetOthersInfoMessage], name = "UserGetOthersInfoMessage"),
    new JsonSubTypes.Type(value = classOf[UserGetSecurityQuestionMessage], name = "UserGetSecurityQuestionMessage"),
    new JsonSubTypes.Type(value = classOf[AdminChangeRoleMessage], name = "AdminChangeRoleMessage"),
    new JsonSubTypes.Type(value = classOf[AdminDropDataBasesMessage], name = "AdminDropDataBasesMessage"),
    new JsonSubTypes.Type(value = classOf[AdminTestMessage], name = "AdminTestMessage"),
    new JsonSubTypes.Type(value = classOf[HospitalUpdateNucleicTestByTokenMessage], name = "HospitalUpdateNucleicTestByTokenMessage"),
    new JsonSubTypes.Type(value = classOf[HospitalUpdateVaccinationByTokenMessage], name = "HospitalUpdateVaccinationByTokenMessage"),
    new JsonSubTypes.Type(value = classOf[HospitalUpdateNucleicTestMessage], name = "HospitalUpdateNucleicTestMessage"),
    new JsonSubTypes.Type(value = classOf[HospitalUpdateVaccinationMessage], name = "HospitalUpdateVaccinationMessage"),
    new JsonSubTypes.Type(value = classOf[HospitalUpdateRiskLevelByTokenMessage], name = "HospitalUpdateRiskLevelByTokenMessage"),
    new JsonSubTypes.Type(value = classOf[HospitalUploadPositiveNucleicTestResultMessage], name = "HospitalUploadPositiveNucleicTestResultMessage"),
    new JsonSubTypes.Type(value = classOf[HospitalUpdatePatientRecoveryMessage], name = "HospitalUpdatePatientRecoveryMessage"),
    new JsonSubTypes.Type(value = classOf[HospitalUpdatePatientRecoveryByTokenMessage], name = "HospitalUpdatePatientRecoveryByTokenMessage"),
    new JsonSubTypes.Type(value = classOf[GovernorUpdateRiskOfUserMessage], name = "GovernorUpdateRiskOfUserMessage"),
    new JsonSubTypes.Type(value = classOf[GovernorUpdateRiskOfPlaceMessage], name = "GovernorUpdateRiskOfPlaceMessage"),
    new JsonSubTypes.Type(value = classOf[MSGovernorUpdateRiskOfPlaceMessage], name = "MSGovernorUpdateRiskOfPlaceMessage"),
    new JsonSubTypes.Type(value = classOf[MSGovernorUpdateRiskOfUserMessage], name = "MSGovernorUpdateRiskOfUserMessage"),
    new JsonSubTypes.Type(value = classOf[MSUserDeleteTraceMessage], name = "MSUserDeleteTraceMessage"),
    new JsonSubTypes.Type(value = classOf[MSUserGetTraceMessage], name = "MSUserGetTraceMessage"),
    new JsonSubTypes.Type(value = classOf[MSUserUpdateTraceMessage], name = "MSUserUpdateTraceMessage"),
    new JsonSubTypes.Type(value = classOf[MSHospitalUpdateNucleicTestMessage], name = "MSHospitalUpdateNucleicTestMessage"),
    new JsonSubTypes.Type(value = classOf[MSHospitalUpdateVaccinationMessage], name = "MSHospitalUpdateVaccinationMessage"),
    new JsonSubTypes.Type(value = classOf[MSHospitalUpdateUserRiskLevelMessage], name = "MSHospitalUpdateUserRiskLevelMessage"),
    new JsonSubTypes.Type(value = classOf[MSHospitalUpdatePlaceRiskLevelMessage], name = "MSHospitalUpdatePlaceRiskLevelMessage"),
    new JsonSubTypes.Type(value = classOf[MSHospitalUpdatePatientRecoveryMessage], name = "MSHospitalUpdatePatientRecoveryMessage"),
    new JsonSubTypes.Type(value = classOf[MSUserCheckInfoMessage], name = "MSUserCheckInfoMessage"),
    new JsonSubTypes.Type(value = classOf[MSUserGetPlaceMessage], name = "MSUserGetPlaceMessage"),
    new JsonSubTypes.Type(value = classOf[MSHospitalDiffusionMessage], name = "MSHospitalDiffusionMessage"),
  ))
abstract class TSMSPMessage extends JacksonSerializable {
  def handle(): TSMSPReply = reaction(
    DateTime.now()) match {
    case Success(value) => value
    case Failure(exception) => TSMSPReply(STATUS_ERROR, exception.getMessage)
  }

  def reaction(now: DateTime): Try[TSMSPReply] = Try(TSMSPReply(STATUS_ERROR, "无法识别的消息"))
}
