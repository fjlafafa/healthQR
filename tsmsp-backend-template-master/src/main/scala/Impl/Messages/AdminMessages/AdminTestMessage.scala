package Impl.Messages.AdminMessages

import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.{UserIdentityTable, UserTraceTable}
import Types.PlaceMeta._
import Types.TraceMeta.{SelfReport, TraceId}
import Types.UserMeta._
import Types._
import Utils.IOUtils
import org.joda.time.DateTime

import scala.util.Try

//We can test communication here
case class AdminTestMessage(userToken: String) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    userToken match {
      case "1" => TSMSPReply(STATUS_OK, IOUtils.serialize(Place(PlaceId(1L), Province("Beijing"), City("Beijing"), District("Haidian"), SubDistrict("Hello world?!"), Types.PlaceMeta.Red)).get)
      case "2" => TSMSPReply(STATUS_OK, IOUtils.serialize(Trace(TraceId(1), UserId(2), now, PlaceId(13), DetailedPlaceDescription("rnm"), SelfReport)).get)
      case "4" => TSMSPReply(STATUS_OK, IOUtils.serialize(UserInformation(UserId(123), now, Types.UserMeta.Triple, PopUps)).get)
      case _ =>
        val userName = UserIdentityTable.checkUserId(Token(userToken)).get
        val trace = UserTraceTable.checkAllTrace(userName).get
        TSMSPReply(STATUS_OK, IOUtils.serialize(trace).get)
    }
  }
}
