import { TraceId } from "./TraceMeta/TraceId";
import { UserId } from "./UserMeta/UserId";
import { PlaceId } from "./PlaceMeta/PlaceId";
import { DetailedPlaceDescription } from "./PlaceMeta/DetailedPlaceDescription";
import { ReportType } from "./TraceMeta/ReportType";
import { DateClass } from "./Templates/DateClass";

export class Trace {
  id: TraceId;
  userId: UserId;
  time: DateClass;
  visitPlaceId: PlaceId;
  detailedPlaceDescription: DetailedPlaceDescription;
  reportType: ReportType;

  constructor(
    id: TraceId,
    userId: UserId,
    time: DateClass,
    visitPlaceId: PlaceId,
    detailedPlaceDescription: DetailedPlaceDescription,
    reportType: ReportType
  ) {
    this.id = id;
    this.userId = userId;
    this.time = time;
    this.visitPlaceId = visitPlaceId;
    this.detailedPlaceDescription = detailedPlaceDescription;
    this.reportType = reportType;
  }
}
