import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React from "react";
import {LoginPage} from "./PageComponents/LoginPage";
import {RegisterPage} from "./PageComponents/RegisterPage";
import {PasswordPage} from "./PageComponents/PasswordPage";
import {OverviewPage} from "./PageComponents/OverviewPage";
import {ScanQRCodePage} from "./PageComponents/ScanQRCodePage";
import {QRCodePage} from "./PageComponents/QRCodePage";
import {DeleteTracePage} from "./PageComponents/DeleteTracePage";
import {DeleteAccountPage} from "./PageComponents/ConfirmAccountDeletionPage";
import {AdminPage} from "./PageComponents/AdminPage";
import {AllowAdmin} from "Globals/GlobalVariables";

const Stack = createNativeStackNavigator();

export function PagesStack ({navigation}:any) {
    return (
        <Stack.Navigator>
            <Stack.Group screenOptions={{headerShown: false}}>
                <Stack.Screen name="Root" component={LoginPage}/>
                <Stack.Screen name="Register" component={RegisterPage}/>
                <Stack.Screen name="Password" component={PasswordPage}/>
                <Stack.Screen name="Overview" component={OverviewPage}/>
                <Stack.Screen name="ScanQRCode" component={ScanQRCodePage}/>
                <Stack.Screen name="QRCode" component={QRCodePage}/>
                <Stack.Screen name="DeleteTrace" component={DeleteTracePage}/>
                <Stack.Screen name="DeleteAccount" component={DeleteAccountPage}/>
                {AllowAdmin ? <Stack.Screen name="Admin" component={AdminPage}/> : null}
            </Stack.Group>
        </Stack.Navigator>)
}