//Implementing
export enum PlaceRiskLevel {
  red = "High Risk",
  yellow = "Middle Risk",
  green = "Low Risk",
}

export function evaluateRisk(riskLevel: PlaceRiskLevel) {
  if (riskLevel === PlaceRiskLevel.green) return 1;
  if (riskLevel === PlaceRiskLevel.yellow) return 2;
  return 3;
}

export function mapRiskToColor(riskLevel: PlaceRiskLevel) {
  if (riskLevel === PlaceRiskLevel.green) return "green";
  if (riskLevel === PlaceRiskLevel.yellow) return "gold";
  return "#d00";
}

export function mapRiskToCharacter(riskLevel: PlaceRiskLevel) {
  if (riskLevel === PlaceRiskLevel.green) return "低";
  if (riskLevel === PlaceRiskLevel.yellow) return "中";
  return "高";
}
