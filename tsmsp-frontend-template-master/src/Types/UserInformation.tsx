import {UserId} from "./UserMeta/UserId";
import {UserRiskLevel} from "./UserMeta/UserRiskLevel";
import {VaccinationStatus} from "./UserMeta/VaccinationStatus";
import {DateClass} from "./Templates/DateClass";
import {Temperature} from "Types/UserMeta/Temperature";

export class UserInformation {

    id: UserId
    recentNucleicTestTime: DateClass
    vaccinationStatus: VaccinationStatus
    riskLevel: UserRiskLevel
    temperature: Temperature


    constructor(
        id: UserId,
        recentNucleicTestTime: DateClass,
        vaccinationStatus: VaccinationStatus,
        riskLevel: UserRiskLevel,
        temperature: Temperature,
    ) {
        this.id = id
        this.recentNucleicTestTime = recentNucleicTestTime
        this.vaccinationStatus = vaccinationStatus
        this.riskLevel = riskLevel
        this.temperature = temperature
    }
}