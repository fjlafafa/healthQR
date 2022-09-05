package Utils

import org.joda.time.DateTime

import scala.language.implicitConversions

object DateTimeAutoBuilder {

  implicit def LongToDateTime(millisecond: Long): DateTime = new DateTime(millisecond)

}