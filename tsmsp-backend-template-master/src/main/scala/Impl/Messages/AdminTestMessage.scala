package Impl.Messages

import Impl.{STATUS_OK, TSMSPReply}
import Types.Place
import Types.PlaceMeta._
import Utils.IOUtils
import org.joda.time.DateTime

import scala.util.Try

//We can test communication here
case class AdminTestMessage(userToken : String) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    TSMSPReply(STATUS_OK, IOUtils.serialize(Place(PlaceId(1L),Province("Beijing"), City("Beijing"),District("Haidian"),SubDistrict("Hello world?!"),Red)).get)
  }
}
