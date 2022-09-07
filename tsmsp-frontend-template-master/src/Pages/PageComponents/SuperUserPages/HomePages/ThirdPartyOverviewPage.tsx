import {
  ScreenTemplate,
  ScrollTemplate,
} from "Utils/PageUtils/PageContainerUtil";
import { ButtonTemplate } from "Utils/PageUtils/ButtonUtil";
import { ViewSwitcher } from "Pages/PageComponents/SuperUserPages/HomePages/HomePagesUtils/BarUtil";
import React from "react";
import { checkPermission, Permissions } from "Types/UserMeta/Roles";
import { RoleStore } from "Globals/RoleStore";

export function ThirdPartyOverviewPage({ navigation }: any) {
  const goBack = () => navigation.navigate("SuperUser.InfoQRCodePage");

  const { role } = RoleStore();
  return (
    <ScreenTemplate goBack={goBack}>
      <ViewSwitcher state={"ThirdParty.Overview"} navigation={navigation} />
      <ScrollTemplate>
        <ButtonTemplate
          icon="test-tube"
          onPress={() => navigation.navigate("ThirdParty.NucleicAcid")}
          text="核酸"
          disabled={!checkPermission(role, Permissions.updateNucleicTest)}
        />
        <ButtonTemplate
          icon="test-tube"
          onPress={() => navigation.navigate("ThirdParty.NucleicAcidByManual")}
          text="核酸(手动）"
          disabled={!checkPermission(role, Permissions.updateNucleicTest)}
        />
        <ButtonTemplate
          icon="needle"
          onPress={() => navigation.navigate("ThirdParty.VaccineRegister")}
          text="疫苗"
          disabled={!checkPermission(role, Permissions.updateVaccination)}
        />
        <ButtonTemplate
          icon="needle"
          onPress={() =>
            navigation.navigate("ThirdParty.VaccineRegisterByManual")
          }
          text="疫苗（手动）"
          disabled={!checkPermission(role, Permissions.updateVaccination)}
        />
        <ButtonTemplate
          onPress={() => navigation.navigate("ThirdParty.RecoverPatient")}
          text="康复"
          disabled={!checkPermission(role, Permissions.recoverPatient)}
        />
        <ButtonTemplate
          onPress={() =>
            navigation.navigate("ThirdParty.RecoverPatientByManual")
          }
          text="康复（手动）"
          disabled={!checkPermission(role, Permissions.recoverPatient)}
        />
      </ScrollTemplate>
    </ScreenTemplate>
  );
}
