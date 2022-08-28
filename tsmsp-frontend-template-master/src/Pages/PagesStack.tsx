import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React from "react";
import {LoginPage} from "./LoginPage";
import {RegisterPage} from "./RegisterPage";
import {PasswordPage} from "./PasswordPage";
import {TracePage} from "./TracePage";
import {ScanQRCodePage} from "./ScanQRCodePage";
import {QRCodePage} from "./QRCodePage";
import {DeleteTracePage} from "./DeleteTracePage";
import {DeleteAccountPage} from "./ConfirmAccountDeletionPage";
import {AdminPage} from "./AdminPage";

const Stack = createNativeStackNavigator();

/** How to use hierarchical navigator:
 *  -:Same Level ->:Child Level
 * e.g. navigation.navigate('Root', { screen: 'Profile' });
 * e.g. Root - Settings -> Sound -> Media
 * navigation.navigate('Root', {
 *   screen: 'Settings',
 *   params: {
 *     screen: 'Sound',
 *     params: {
 *       screen: 'Media',
 *     },
 *   },
 * });*/
export function PagesStack ({navigation}:any) {
    return (
        <Stack.Navigator>
            <Stack.Group screenOptions={{headerShown: false}}>
                <Stack.Screen name="Root" component={LoginPage}/>
                <Stack.Screen name="Register" component={RegisterPage}/>
                <Stack.Screen name="Password" component={PasswordPage}/>
                <Stack.Screen name="Trace" component={TracePage}/>
                <Stack.Screen name="ScanQRCode" component={ScanQRCodePage}/>
                <Stack.Screen name="QRCode" component={QRCodePage}/>
                <Stack.Screen name="DeleteTrace" component={DeleteTracePage}/>
                <Stack.Screen name="DeleteAccount" component={DeleteAccountPage}/>
                <Stack.Screen name="Admin" component={AdminPage}/>
            </Stack.Group>
        </Stack.Navigator>)
}