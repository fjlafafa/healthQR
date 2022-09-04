package Impl.Messages.MSCommunicationMessages.PlaceInfoMSMessages

import Exceptions.NoTraceException
import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.{PlaceTable, UserTraceTable}
import Types.PlaceMeta.PlaceId
import Types.TraceMeta.TraceId
import Types.UserMeta.UserId
import Utils.{DBUtils, IOUtils}
import org.joda.time.DateTime

import scala.util.Try

case class MSUserGetPlaceMessage(visitedPlaceId: Long) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val trace = PlaceTable.getPlace(PlaceId(visitedPlaceId)).get
    TSMSPReply(STATUS_OK, IOUtils.serialize(trace).get)
  }
}
