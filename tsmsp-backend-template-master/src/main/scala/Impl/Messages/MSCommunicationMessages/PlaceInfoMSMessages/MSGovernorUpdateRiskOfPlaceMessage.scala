package Impl.Messages.MSCommunicationMessages.PlaceInfoMSMessages

import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Process.PlaceInfoMS.PlaceInfoMSDBUtils
import Tables.PlaceTable
import Types.PlaceMeta.{PlaceId, PlaceRiskLevel}
import org.joda.time.DateTime

import scala.util.Try

case class MSGovernorUpdateRiskOfPlaceMessage(placeId:PlaceId, placeRiskLevel:PlaceRiskLevel) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    PlaceInfoMSDBUtils.exec(PlaceTable.updatePlaceRiskLevel(placeId, placeRiskLevel))
    TSMSPReply(STATUS_OK, "地点风险等级更新成功！")
  }
}

