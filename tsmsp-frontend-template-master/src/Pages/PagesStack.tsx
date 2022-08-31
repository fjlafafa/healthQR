import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React from 'react'
import {LoginPage} from './PageComponents/LoginPage'
import {RegisterPage} from './PageComponents/RegisterPage'
import {PasswordPage} from './PageComponents/PasswordPage'
import {OverviewPage} from './PageComponents/OverviewPage'
import {ScanQRCodePage} from './PageComponents/ScanQRCodePage'
import {QRCodePage} from './PageComponents/QRCodePage'
import {TracePage} from './PageComponents/TracePage'
import {AccountDeletionPage} from './PageComponents/AccountDeletionPage'
import {AdminPage} from './PageComponents/AdminPage'
import {AllowAdmin} from 'Globals/GlobalVariables'
import {AccountPage} from "./PageComponents/AccountPage";
import {VaccinePage} from "./PageComponents/VaccinePage";
import {GeneratePlaceQRPage} from "./PageComponents/GeneratePlaceQRPage";

const Stack = createNativeStackNavigator()

export enum PagesID {
    Login='Login',
    Register='Register',
    Overview='Overview',
    Account='Account',
    Password='Password',
    ScanQRCode='ScanQRCode',
    Trace='Trace',
    Vaccine='Vaccine',
    DeleteAccount='DeleteAccount',
    Admin='Admin',
    PlaceQR='PlaceQR',
}

export function PagesStack ({navigation}:any) {
    return (
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
                <Stack.Screen name={PagesID.PlaceQR} component={GeneratePlaceQRPage}/>
                {AllowAdmin ? <Stack.Screen name={PagesID.Admin} component={AdminPage}/> : null}
            </Stack.Group>
        </Stack.Navigator>)
}