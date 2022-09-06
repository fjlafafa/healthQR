import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React from 'react'
import {LoginPage} from './PageComponents/StartingPages/LoginPage'
import {RegisterPage} from './PageComponents/StartingPages/RegisterPage'
import {PasswordPage} from './PageComponents/AccountPages/PasswordPage'
import {ScanPlaceQRCodePage} from './PageComponents/UserPages/HomePages/ScanPlaceQRCodePage/ScanPlaceQRCodePage'
import {ModifyTracePage} from './PageComponents/UserPages/TraceRelativePages/ModifyTracePage'
import {AccountDeletionPage} from './PageComponents/AccountPages/AccountDeletionPage'
import {AdminPage} from './PageComponents/TestPages/AdminPage'
import {AllowAdmin} from 'Globals/GlobalVariables'
import {AccountOverviewPage} from "./PageComponents/AccountPages/AccountOverviewPage";
import {VaccinePage} from "./PageComponents/UserPages/VaccineNucleicAcidRelativePages/VaccinePage";
import {NavigationContainer} from "@react-navigation/native";

import {UserOverviewPage} from "./PageComponents/UserPages/HomePages/OverviewPage/UserOverviewPage";
import {GeneratePlaceQRPage} from "./PageComponents/SuperUserPages/AdminPages/GeneratePlaceQRPage";
import {ModifyVaccinePage} from "./PageComponents/UserPages/VaccineNucleicAcidRelativePages/ModifyVaccinePage";
import {InfoQRCodePage} from "./PageComponents/UserPages/HomePages/InfoQRCodePage/InfoQRCodePage";
import {AdminBrotherPage} from "./PageComponents/TestPages/AdminBrotherPage";
import {AdminOverviewPage} from "./PageComponents/SuperUserPages/HomePages/AdminOverviewPage";
import {PermissionPage} from "./PageComponents/SuperUserPages/AdminPages/PermissionPage";
import {NucleicAcidPage} from "./PageComponents/SuperUserPages/ThirdPartyPages/NucleicAcidPage";
import {ThirdPartyOverviewPage} from "./PageComponents/SuperUserPages/HomePages/ThirdPartyOverviewPage";
import {VaccineRegisterPage} from "./PageComponents/SuperUserPages/ThirdPartyPages/VaccineRegisterPage";
import {TracePage} from "./PageComponents/UserPages/TraceRelativePages/TracePage";
import {SuperUserInfoPage} from "./PageComponents/SuperUserPages/HomePages/SuperUserInfoPage";
import {FindPasswordPage} from "Pages/PageComponents/StartingPages/FindPasswordPage";
import {SecurityQuestionPage} from "Pages/PageComponents/AccountPages/SecurityQuestionPage";
import {AccountInfoPage} from "Pages/PageComponents/AccountPages/AccountInfoPage";
import {TemperaturePage} from "Pages/PageComponents/UserPages/TemperaturePage";

const Stack = createNativeStackNavigator()

export function PagesStack({navigation}: any) {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Group screenOptions={{headerShown: false}}>
                    <Stack.Screen name={'Start.Login'} component={LoginPage}/>
                    <Stack.Screen name={'Start.FindPassword'} component={FindPasswordPage}/>
                    <Stack.Screen name={'Start.Register'} component={RegisterPage}/>
                    <Stack.Screen name={'User.Overview'} component={UserOverviewPage}/>
                    <Stack.Screen name={'Account.Overview'} component={AccountOverviewPage}/>
                    <Stack.Screen name={'Account.Deletion'} component={AccountDeletionPage}/>
                    <Stack.Screen name={'Account.Password'} component={PasswordPage}/>
                    <Stack.Screen name={'Account.SecurityQuestion'} component={SecurityQuestionPage}/>
                    <Stack.Screen name={'Account.Info'} component={AccountInfoPage}/>
                    <Stack.Screen name={'User.ScanPlaceQRCode'} component={ScanPlaceQRCodePage}/>
                    <Stack.Screen name={'User.Trace'} component={TracePage}/>
                    <Stack.Screen name={'User.ModifyTrace'} component={ModifyTracePage}/>
                    <Stack.Screen name={'User.Vaccine'} component={VaccinePage}/>
                    <Stack.Screen name={'User.ModifyVaccine'} component={ModifyVaccinePage}/>
                    <Stack.Screen name={'User.InfoQRCodePage'} component={InfoQRCodePage}/>
                    <Stack.Screen name={'Admin.GeneratePlaceQR'} component={GeneratePlaceQRPage}/>
                    <Stack.Screen name={'Admin.Overview'} component={AdminOverviewPage}/>
                    <Stack.Screen name={'Admin.Permission'} component={PermissionPage}/>
                    <Stack.Screen name={'ThirdParty.NucleicAcid'} component={NucleicAcidPage}/>
                    <Stack.Screen name={'ThirdParty.Overview'} component={ThirdPartyOverviewPage}/>
                    <Stack.Screen name={'ThirdParty.VaccineRegister'} component={VaccineRegisterPage}/>
                    <Stack.Screen name={'SuperUser.InfoQRCodePage'} component={SuperUserInfoPage}/>
                    <Stack.Screen name={'User.Temperature'} component={TemperaturePage}/>
                    {AllowAdmin ? <Stack.Screen name={'Admin'} component={AdminPage}/> : null}
                    {AllowAdmin ? <Stack.Screen name={'AdminBrother'} component={AdminBrotherPage}/> : null}
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>)
}