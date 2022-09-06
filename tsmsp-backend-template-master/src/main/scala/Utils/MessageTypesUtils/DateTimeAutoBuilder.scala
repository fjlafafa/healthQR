package Utils.MessageTypesUtils

import org.joda.time.DateTime

import scala.language.implicitConversions

object DateTimeAutoBuilder {

  implicit def LongToDateTime(millisecond: Long): DateTime = new DateTime(millisecond)

  implicit def DateTimeToLong(time: DateTime): Long = time.getMillis

  implicit def ListOfDateTimeToLong(time: List[DateTime]): List[Long] = time.map(_.getMillis)

  implicit def ListOfLongToDateTime(milliseconds: List[Long]): List[DateTime] = milliseconds.map(millisecond => new DateTime(millisecond))

}
