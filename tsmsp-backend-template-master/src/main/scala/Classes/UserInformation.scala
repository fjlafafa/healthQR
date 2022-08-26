package Classes

import Classes.UserMeta._
import org.joda.time.DateTime

case class UserInformation(
                            id : UserId,
                            recentNucleicTestTime: DateTime,
                            vaccinationStatus: VaccinationStatus,
                            riskLevel: UserRiskLevel
                )
