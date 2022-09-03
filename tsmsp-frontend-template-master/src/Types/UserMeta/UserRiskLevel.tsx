import {PlaceRiskLevel} from "../PlaceMeta/PlaceRiskLevel";

export enum UserRiskLevel{
    red = "Dangerous",
    yellow = "Closely Related",
    popUps = "Vulnerable",
    green = "Safe",
}


export function mapUserRiskToColor(riskLevel:UserRiskLevel){
    if (riskLevel===UserRiskLevel.green) return 'green'
    if (riskLevel===UserRiskLevel.yellow) return 'gold'
    if (riskLevel===UserRiskLevel.popUps) return 'grey'
    return '#d00'
}