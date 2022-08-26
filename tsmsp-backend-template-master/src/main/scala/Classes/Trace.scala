package Classes

import Classes.PlaceMeta.{DetailedPlaceDescription, PlaceId}
import Classes.TraceMeta._
import org.joda.time.DateTime

case class Trace(
                  id : TraceId,
                  time : DateTime,
                  visitPlaceId : PlaceId,
                  detailedPlaceDescription: DetailedPlaceDescription,
                  reportType: ReportType
                )
