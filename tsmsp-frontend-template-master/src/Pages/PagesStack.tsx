import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React from 'react'
import {LoginPage} from './PageComponents/LoginPage'
import {RegisterPage} from './PageComponents/RegisterPage'
import {PasswordPage} from './PageComponents/UserPages/AccountRelativePages/PasswordPage'
import {ScanQRCodePage} from './PageComponents/UserPages/HomePages/ScanQRCodePage'
import {TracePage} from './PageComponents/UserPages/TraceRelativePages/TracePage'
import {AccountDeletionPage} from './PageComponents/UserPages/AccountRelativePages/AccountDeletionPage'
import {AdminPage} from './PageComponents/TestPages/AdminPage'
import {AllowAdmin} from 'Globals/GlobalVariables'
import {AccountPage} from "./PageComponents/UserPages/AccountRelativePages/AccountPage";
import {VaccinePage} from "./PageComponents/UserPages/VaccineNucleicAcidRelativePages/VaccinePage";
import {NavigationContainer} from "@react-navigation/native";

import {OverviewPage} from "./PageComponents/UserPages/HomePages/OverviewPage/OverviewPage";
import {GeneratePlaceQRPage} from "./PageComponents/ThirdPartyPages/GeneratePlaceQRPage";
import {ModifyVaccinePage} from "./PageComponents/UserPages/VaccineNucleicAcidRelativePages/ModifyVaccinePage";
import {RegisterQRCodePage} from "./PageComponents/UserPages/HomePages/RegisterQRCodePage";
import {AdminBrotherPage} from "./PageComponents/TestPages/AdminBrotherPage";

const Stack = createNativeStackNavigator()

export function PagesStack({navigation}: any) {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Group screenOptions={{headerShown: false}}>
                    <Stack.Screen name={'Login'} component={LoginPage}/>
                    <Stack.Screen name={'Register'} component={RegisterPage}/>
                    <Stack.Screen name={'Overview'} component={OverviewPage}/>
                    <Stack.Screen name={'Account'} component={AccountPage}/>
                    <Stack.Screen name={'Password'} component={PasswordPage}/>
                    <Stack.Screen name={'ScanQRCode'} component={ScanQRCodePage}/>
                    <Stack.Screen name={'Trace'} component={TracePage}/>
                    <Stack.Screen name={'Vaccine'} component={VaccinePage}/>
                    <Stack.Screen name={'UpdateVaccine'} component={ModifyVaccinePage}/>
                    <Stack.Screen name={'DeleteAccount'} component={AccountDeletionPage}/>
                    <Stack.Screen name={'PlaceQR'} component={GeneratePlaceQRPage}/>
                    <Stack.Screen name={'RegisterQRCode'} component={RegisterQRCodePage}/>
                    {AllowAdmin ? <Stack.Screen name={'Admin'} component={AdminPage}/> : null}
                    {AllowAdmin ? <Stack.Screen name={'AdminBrother'} component={AdminBrotherPage}/> : null}
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>)
}