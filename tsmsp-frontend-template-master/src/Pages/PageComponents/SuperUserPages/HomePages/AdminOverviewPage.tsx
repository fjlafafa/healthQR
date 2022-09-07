import {
  ScreenTemplate,
  ScrollTemplate,
} from "Utils/PageUtils/PageContainerUtil";
import { ButtonTemplate } from "Utils/PageUtils/ButtonUtil";
import { ViewSwitcher } from "Pages/PageComponents/SuperUserPages/HomePages/HomePagesUtils/BarUtil";
import React from "react";
import {checkPermission, Permissions} from "Types/UserMeta/Roles";
import {RoleStore} from "Globals/RoleStore";

export function AdminOverviewPage({ navigation }: any) {
  const goBack = () => {
    navigation.navigate("SuperUser.InfoQRCodePage");
  };
  const {role}=RoleStore()

  return (
    <ScreenTemplate goBack={goBack}>
      <ViewSwitcher state={"Admin.Overview"} navigation={navigation} />
      <ScrollTemplate>
        <ButtonTemplate
          icon="qrcode"
          onPress={() => navigation.navigate("Admin.GeneratePlaceQR")}
          text="生成地点码"
        />
        <ButtonTemplate
            onPress={() => navigation.navigate('Admin.Permission')}
            text="设置用户权限"
            disabled={!checkPermission(role,Permissions.setThirdParty)}
        />
        <ButtonTemplate
            onPress={() => navigation.navigate('Admin.SetRiskOfUserByManual')}
            text="设置用户风险"
            disabled={!checkPermission(role,Permissions.setRiskOfUser)}
        />
          <ButtonTemplate
              onPress={() => navigation.navigate('Admin.SetRiskOfPlaceByManual')}
              text="设置地点风险"
              disabled={!checkPermission(role,Permissions.setRiskOfPlace)}
          />
      </ScrollTemplate>
    </ScreenTemplate>
  );
}
