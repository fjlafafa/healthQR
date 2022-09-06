package Impl.Messages.TestMessages

import Exceptions.TokenNotExistsException
import Globals.GlobalVariables.clientSystem.executionContext
import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.{UserIdentityTable, UserTraceTable}
import Types.PlaceMeta._
import Types.TraceMeta.{SelfReport, TraceId}
import Types.UserMeta._
import Types.{Place, Trace, UserIdentity, UserInformation}
import Utils.{DBUtils, IOUtils}
import org.joda.time.DateTime

import scala.util.Try

//We can test communication here
case class AdminTestMessage(userToken: Token) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    println("this is a message")
    userToken.token match {
      case "1" => TSMSPReply(STATUS_OK, IOUtils.serialize(Place(PlaceId(1L), Province("Beijing"), City("Beijing"), District("Haidian"), SubDistrict("Hello world?!"), Types.PlaceMeta.Red)).get)
      case "2" => TSMSPReply(STATUS_OK, IOUtils.serialize(Trace(TraceId(1), UserId(2), now, PlaceId(13), DetailedPlaceDescription("rnm"), SelfReport)).get)
      case "3" => TSMSPReply(STATUS_OK, IOUtils.serialize(UserIdentity(UserId(1), IdentityNumber("132"), PasswordHash("fdsa"), RealName("df"), Token("sbsbsbs"), DateTime.now(), NucleicTestResultReporter, Salt("saltsalt"), SecurityQuestion("How are you"), SecurityAnswerHash("I am fine"))).get)
      case "4" => TSMSPReply(STATUS_OK, IOUtils.serialize(UserInformation(UserId(123), now, Types.UserMeta.Triple, PopUps, Temperature(9000))).get)
      case _ =>
        val trace = DBUtils.exec(
          UserIdentityTable.checkUserIdByToken(userToken).flatMap(
            userId => UserTraceTable.checkAllTrace(userId.getOrElse(throw TokenNotExistsException()))
          )
        ).toList
        TSMSPReply(STATUS_OK, IOUtils.serialize(trace).get)
    }
  }
}
