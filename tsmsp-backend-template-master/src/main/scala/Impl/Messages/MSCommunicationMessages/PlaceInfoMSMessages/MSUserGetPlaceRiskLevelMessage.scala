package Impl.Messages.MSCommunicationMessages.PlaceInfoMSMessages

import Exceptions.PlaceNotExistsException
import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Process.PlaceInfoMS.PlaceInfoMSDBUtils
import Tables.PlaceTable
import Types.PlaceMeta.PlaceId
import org.joda.time.DateTime
import slick.jdbc.PostgresProfile.api._

import scala.util.Try

case class MSUserGetPlaceRiskLevelMessage(visitedPlaceId: PlaceId) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val riskLevel = PlaceInfoMSDBUtils.exec(
      PlaceTable.getPlaceRiskLevel(visitedPlaceId).transactionally
    ).getOrElse(throw PlaceNotExistsException())
    TSMSPReply(STATUS_OK, riskLevel.v)
  }
}
