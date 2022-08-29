package Types

import Types.PlaceMeta.{DetailedPlaceDescription, PlaceId}
import Types.TraceMeta._
import Types.UserMeta.UserId
import org.joda.time.DateTime

case class Trace(
                  id : TraceId,
                  userId : UserId,
                  time : DateTime,
                  visitPlaceId : PlaceId,
                  detailedPlaceDescription: DetailedPlaceDescription,
                  reportType: ReportType
                )
