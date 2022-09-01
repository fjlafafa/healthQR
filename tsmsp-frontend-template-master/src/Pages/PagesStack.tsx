import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React from 'react'
import {LoginPage} from './PageComponents/LoginPage'
import {RegisterPage} from './PageComponents/RegisterPage'
import {PasswordPage} from './PageComponents/PasswordPage'
import {ScanQRCodePage} from './PageComponents/HomePages/ScanQRCodePage'
import {TracePage} from './PageComponents/TracePage'
import {AccountDeletionPage} from './PageComponents/AccountDeletionPage'
import {AdminPage} from './PageComponents/AdminPage'
import {AllowAdmin} from 'Globals/GlobalVariables'
import {AccountPage} from "./PageComponents/AccountPage";
import {VaccinePage} from "./PageComponents/VaccinePage";
import {NavigationContainer} from "@react-navigation/native";

import {OverviewPage} from "./PageComponents/HomePages/OverviewPage/OverviewPage";
import {GeneratePlaceQRPage} from "./PageComponents/GeneratePlaceQRPage";
import {ModifyVaccinePage} from "./PageComponents/ModifyVaccinePage";
import {RegisterQRCodePage} from "./PageComponents/HomePages/RegisterQRCodePage";

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
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>)
}