package Utils

import Types.TraceMeta._
import org.joda.time.DateTime

object DateTimeAutoBuilder {

  implicit def LongToDateTime(millisecond: Long): DateTime = new DateTime(millisecond)

}