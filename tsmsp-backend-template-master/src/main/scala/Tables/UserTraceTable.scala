package Tables

import Globals.{GlobalVariables, IdLengths}
import Types.CustomColumnTypes._
import Types.PlaceMeta.{DetailedPlaceDescription, PlaceId}
import Types.TraceMeta.{ReportType, TraceId}
import Types.UserMeta.UserId
import Utils.DBUtils
import Utils.StringUtils.randomNumber
import org.joda.time.DateTime
import slick.jdbc.PostgresProfile.api._
import slick.lifted.Tag

import scala.util.Try

case class UserTraceRow(
                        id : Long,
                        userId : Long,
                        time: Long,
                        visitPlaceId: Int,
                        detailedPlaceDescription: String,
                        reportType: ReportType
                       )

class UserTraceTable(tag : Tag) extends Table[UserTraceRow](tag, GlobalVariables.mainSchema, "user_trace") {
  def id = column[Long]("trace_id")
  def userId = column[Long]("user_id")
  def time = column[Long]("time")
  def visitPlaceId = column[Int]("visitPlaceId")

  def detailedPlaceDescription = column[String]("detailedPlaceDescription")

  def reportType = column[ReportType]("reportType")
  def * = (id, userId, time, visitPlaceId, detailedPlaceDescription, reportType).mapTo[UserTraceRow]

}

object UserTraceTable {
  val userTraceTable = TableQuery[UserTraceTable]

  def addTrace(userId : UserId, trace : PlaceId, detailedPlaceDescription : DetailedPlaceDescription, reportType: ReportType) : DBIO[Int] =
    userTraceTable += UserTraceRow(randomNumber(IdLengths.trace), userId.id, time = DateTime.now().getMillis, trace.id, detailedPlaceDescription.Name, reportType)

  def checkTrace(userId : UserId, startTime : DateTime, endTime : DateTime) : Try[List[UserTraceRow]] = Try {
    DBUtils.exec(userTraceTable.filter(ut => ut.userId === userId.id && ut.time <= endTime.getMillis && ut.time >= startTime.getMillis).sortBy(_.time).result).toList
  }

  def checkAllTrace(userId: UserId): Try[List[UserTraceRow]] = Try {
    DBUtils.exec(userTraceTable.filter(ut => ut.userId === userId.id).sortBy(_.time).result).toList
  }

  def checkTraceExists(userId: UserId, trace: TraceId): Try[Boolean] = Try(
    DBUtils.exec(userTraceTable.filter(ut => ut.userId === userId.id && ut.id === trace.id).size.result) > 0
  )

  def dropTrace(userId: UserId, trace : TraceId): DBIO[Int] =
    userTraceTable.filter(ut => ut.userId === userId.id && ut.id === trace.id).delete

}
