package Impl.Messages.MSCommunicationMessages.PlaceInfoMSMessages

import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.PlaceTable
import Types.PlaceMeta.PlaceId
import Utils.IOUtils
import org.joda.time.DateTime

import scala.util.Try

case class MSUserGetPlaceMessage(visitedPlaceId: PlaceId) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val trace = PlaceTable.getPlace(visitedPlaceId).get
    TSMSPReply(STATUS_OK, IOUtils.serialize(trace).get)
  }
}
