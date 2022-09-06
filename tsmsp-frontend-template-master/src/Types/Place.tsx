import { PlaceId } from "Types/PlaceMeta/PlaceId";
import { Province } from "./PlaceMeta/Province";
import { City } from "./PlaceMeta/City";
import { District } from "./PlaceMeta/District";
import { SubDistrict } from "./PlaceMeta/SubDistrict";
import { PlaceRiskLevel } from "./PlaceMeta/PlaceRiskLevel";

export class Place {
  id: PlaceId;
  province: Province;
  city: City;
  district: District;
  subDistrict: SubDistrict;
  riskLevel: PlaceRiskLevel;

  constructor(
    id: PlaceId,
    province: Province,
    city: City,
    district: District,
    subDistrict: SubDistrict,
    riskLevel: PlaceRiskLevel
  ) {
    this.id = id;
    this.province = province;
    this.city = city;
    this.district = district;
    this.subDistrict = subDistrict;
    this.riskLevel = riskLevel;
  }
}
