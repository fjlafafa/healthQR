package Tables

import Globals.{GlobalVariables, IdLengths}
import Types.CustomColumnTypes._
import Types.PlaceMeta.{DetailedPlaceDescription, PlaceId}
import Types.TraceMeta.{ReportType, TraceId}
import Types.UserMeta.UserId
import Utils.DBUtils
import Utils.TokenUtils.randomTraceId
import org.joda.time.DateTime
import slick.jdbc.PostgresProfile.api._
import slick.lifted.Tag

import scala.util.Try

case class UserTraceRow(
                        id : TraceId,
                        userId : UserId,
                        time: DateTime,
                        visitPlaceId: PlaceId,
                        detailedPlaceDescription: DetailedPlaceDescription,
                        reportType: ReportType
                       )

class UserTraceTable(tag : Tag) extends Table[UserTraceRow](tag, GlobalVariables.mainSchema, "user_trace") {
  def id = column[TraceId]("trace_id")
  def userId = column[UserId]("user_id")
  def time = column[DateTime]("time")
  def visitPlaceId = column[PlaceId]("visit_place_id")

  def detailedPlaceDescription = column[DetailedPlaceDescription]("detailed_place_description")

  def reportType = column[ReportType]("report_type")
  def * = (id, userId, time, visitPlaceId, detailedPlaceDescription, reportType).mapTo[UserTraceRow]

}

object UserTraceTable {
  val userTraceTable = TableQuery[UserTraceTable]

  def addTrace(userId : UserId, trace : PlaceId, detailedPlaceDescription : DetailedPlaceDescription, reportType: ReportType) : DBIO[Int] =
    userTraceTable += UserTraceRow(randomTraceId(IdLengths.trace), userId, time = DateTime.now(), trace, detailedPlaceDescription, reportType)

  def checkTrace(userId : UserId, startTime : DateTime, endTime : DateTime) : Try[List[UserTraceRow]] = Try {
    DBUtils.exec(userTraceTable.filter(ut => ut.userId === userId && ut.time <= endTime && ut.time >= startTime).sortBy(_.time).result).toList
  }

  def checkAllTrace(userId: UserId): Try[List[UserTraceRow]] = Try {
    DBUtils.exec(userTraceTable.filter(ut => ut.userId === userId).sortBy(_.time).result).toList
  }

  def checkTraceExists(userId: UserId, trace: TraceId): Try[Boolean] = Try(
    DBUtils.exec(userTraceTable.filter(ut => ut.userId === userId && ut.id === trace).size.result) > 0
  )

  def dropTrace(userId: UserId, trace : TraceId): DBIO[Int] =
    userTraceTable.filter(ut => ut.userId === userId && ut.id === trace).delete

}
