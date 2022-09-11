package Impl.Messages.UserMessages

import Exceptions.UserNameAlreadyExistsException
import Globals.GlobalVariables
import Impl.Messages.MSCommunicationMessages.VaccineAndNucleicAcidMSMessages.MSUserRegisterMessage
import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.UserIdentityTable
import Types.UserMeta._
import Utils.HTTPUtils.sender
import Utils.MessageTypesUtils.EnumAutoConverter._
import Utils.MessageTypesUtils.PasswordAutoEncoder._
import Utils.{DBUtils, IOUtils, StringUtils}
import org.joda.time.DateTime
import slick.jdbc.PostgresProfile.api._

import scala.util.Try

case class UserRegisterMessage(realName: RealName, password: Password, identityNumber: IdentityNumber, role: String, securityQuestion: SecurityQuestion, securityAnswer: SecurityAnswer) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    if (UserIdentityTable.checkUserExists(identityNumber).get) throw UserNameAlreadyExistsException()
    else {
      val salt = Salt(StringUtils.randomString(15))
      val userId = DBUtils.exec(
        (UserIdentityTable
          .addUser(
            realName,
            PasswordEncoder(password, salt),
            identityNumber,
            role,
            salt,
            securityQuestion,
            SecurityAnswerEncoder(securityAnswer, salt),
          )
          >>
          UserIdentityTable.checkIdByIdentityNumber(identityNumber)
          ).transactionally
      ).get
      MSUserRegisterMessage(userId).send(GlobalVariables.VaccineAndNucleicMSIP).get
      TSMSPReply(STATUS_OK, IOUtils.serialize(UserIdentityTable.checkToken(userId).get).get)
    }
  }
}
