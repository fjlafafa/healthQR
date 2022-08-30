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

const Stack = createNativeStackNavigator()

export function PagesStack ({navigation}:any) {
    return (
        <Stack.Navigator>
            <Stack.Group screenOptions={{headerShown: false}}>
                <Stack.Screen name='Login' component={LoginPage}/>
                <Stack.Screen name='Register' component={RegisterPage}/>
                <Stack.Screen name='Overview' component={OverviewPage}/>
                <Stack.Screen name='Account' component={AccountPage}/>
                <Stack.Screen name='Password' component={PasswordPage}/>
                <Stack.Screen name='ScanQRCode' component={ScanQRCodePage}/>
                <Stack.Screen name='Trace' component={TracePage}/>
                <Stack.Screen name='Vaccine' component={VaccinePage}/>
                <Stack.Screen name='DeleteAccount' component={AccountDeletionPage}/>
                {AllowAdmin ? <Stack.Screen name='Admin' component={AdminPage}/> : null}
            </Stack.Group>
        </Stack.Navigator>)
}