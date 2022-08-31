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
import {PagesID} from "./PagesID";
import {OverviewPage} from "./PageComponents/HomePages/OverviewPage";

const Stack = createNativeStackNavigator()

export function PagesStack({navigation}: any) {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Group screenOptions={{headerShown: false}}>
                    <Stack.Screen name={PagesID.Login} component={LoginPage}/>
                    <Stack.Screen name={PagesID.Register} component={RegisterPage}/>
                    <Stack.Screen name={PagesID.Overview} component={OverviewPage}/>
                    <Stack.Screen name={PagesID.Account} component={AccountPage}/>
                    <Stack.Screen name={PagesID.Password} component={PasswordPage}/>
                    <Stack.Screen name={PagesID.ScanQRCode} component={ScanQRCodePage}/>
                    <Stack.Screen name={PagesID.Trace} component={TracePage}/>
                    <Stack.Screen name={PagesID.Vaccine} component={VaccinePage}/>
                    <Stack.Screen name={PagesID.DeleteAccount} component={AccountDeletionPage}/>
                    {AllowAdmin ? <Stack.Screen name={PagesID.Admin} component={AdminPage}/> : null}
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>)
}