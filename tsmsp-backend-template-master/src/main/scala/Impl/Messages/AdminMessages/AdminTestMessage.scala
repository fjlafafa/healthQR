package Impl.Messages.AdminMessages

import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Types.PlaceMeta._
import Types.TraceMeta.{SelfReport, TraceId}
import Types.UserMeta.{Red, _}
import Types.{Place, PlaceRiskLevels, Trace, UserIdentity, UserInformation}
import Utils.IOUtils
import org.joda.time.DateTime

import scala.util.Try

//We can test communication here
case class AdminTestMessage(userToken: String) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    userToken match {
      case "1" => TSMSPReply(STATUS_OK, IOUtils.serialize(Place(PlaceId(1L), Province("Beijing"), City("Beijing"), District("Haidian"), SubDistrict("Hello world?!"), PlaceRiskLevel.getType(PlaceRiskLevels.red))).get)
      case "2" => TSMSPReply(STATUS_OK, IOUtils.serialize(Trace(TraceId(1), UserId(2), now, PlaceId(13), DetailedPlaceDescription("rnm"), SelfReport)).get)
      case "3" => TSMSPReply(STATUS_OK, IOUtils.serialize(UserIdentity(UserId(1), RealName("df"), Password("fdsa"), IdentityNumber("132"), NucleicTestResultReporter)).get)
      case "4" => TSMSPReply(STATUS_OK, IOUtils.serialize(UserInformation(UserId(123), now, Triple, PopUps)).get)
      case "5" => TSMSPReply(STATUS_OK, IOUtils.serialize().get)
    }
  }
}
