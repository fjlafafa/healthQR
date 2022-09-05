import {UserId} from "./UserMeta/UserId";
import {UserRiskLevel} from "./UserMeta/UserRiskLevel";
import {VaccinationStatus} from "./UserMeta/VaccinationStatus";
import {DateClass} from "./Templates/DateClass";

export class UserInformation {

    id: UserId
    recentNucleicTestTime: DateClass
    vaccinationStatus: VaccinationStatus
    riskLevel: UserRiskLevel

    constructor(
        id: UserId,
        recentNucleicTestTime: DateClass,
        vaccinationStatus: VaccinationStatus,
        riskLevel: UserRiskLevel
    ) {
        this.id = id
        this.recentNucleicTestTime = recentNucleicTestTime
        this.vaccinationStatus = vaccinationStatus
        this.riskLevel = riskLevel

    }
}