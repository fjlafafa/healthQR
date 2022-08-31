package Tables

import Globals.{GlobalVariables, IdLengths}
import Types.PlaceMeta.{DetailedPlaceDescription, PlaceId}
import Types.Trace
import Types.TraceMeta.{ReportType, TraceId}
import Types.UserMeta.UserId
import Utils.CustomColumnTypesUtils._
import Utils.DBUtils
import Utils.TokenUtils.randomTraceId
import org.joda.time.DateTime
import slick.jdbc.PostgresProfile.api._
import slick.lifted.Tag

import scala.util.Try

class UserTraceTable(tag : Tag) extends Table[Trace](tag, GlobalVariables.mainSchema, "user_trace") {
  def id = column[TraceId]("trace_id", O.PrimaryKey)
  def userId = column[UserId]("user_id")
  def time = column[DateTime]("time")
  def visitPlaceId = column[PlaceId]("visit_place_id")

  def detailedPlaceDescription = column[DetailedPlaceDescription]("detailed_place_description")

  def reportType = column[ReportType]("report_type")
  def * = (id, userId, time, visitPlaceId, detailedPlaceDescription, reportType).mapTo[Trace]

}

object UserTraceTable {
  val userTraceTable = TableQuery[UserTraceTable]

  def addTrace(userId : UserId, trace : PlaceId, detailedPlaceDescription : DetailedPlaceDescription, reportType: ReportType) : DBIO[Int] =
    userTraceTable +=Trace(randomTraceId(IdLengths.trace), userId, time = DateTime.now(), trace, detailedPlaceDescription, reportType)

  def checkTrace(userId : UserId, startTime : DateTime, endTime : DateTime) : Try[List[Trace]] = Try {
    DBUtils.exec(userTraceTable.filter(ut => ut.userId === userId && ut.time <= endTime && ut.time >= startTime).sortBy(_.time).result).toList
  }

  def checkAllTrace(userId: UserId): Try[List[Trace]] = Try {
    DBUtils.exec(userTraceTable.filter(ut => ut.userId === userId).sortBy(_.time).result).toList
  }

  def checkTraceExists(userId: UserId, trace: TraceId): Try[Boolean] = Try(
    DBUtils.exec(userTraceTable.filter(ut => ut.userId === userId && ut.id === trace).size.result) > 0
  )

  def dropTrace(userId: UserId, trace : TraceId): DBIO[Int] =
    userTraceTable.filter(ut => ut.userId === userId && ut.id === trace).delete

}
