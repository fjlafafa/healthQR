package Globals

import os.{Path, pwd}

object DataPaths {
  val PlaceData: Path = pwd / "src" / "main" / "scala" / "Data" / "AdministrativeStructure.json"
}
