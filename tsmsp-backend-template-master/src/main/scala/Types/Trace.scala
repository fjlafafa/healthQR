package Types

import Types.PlaceMeta.{DetailedPlaceDescription, PlaceId}
import Types.TraceMeta._
import org.joda.time.DateTime

case class Trace(
                  id : TraceId,
                  time : DateTime,
                  visitPlaceId : PlaceId,
                  detailedPlaceDescription: DetailedPlaceDescription,
                  reportType: ReportType
                )
