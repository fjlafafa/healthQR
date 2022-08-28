import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {LoginPage} from "Pages/LoginPage";
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from "@react-navigation/native";
import {RegisterPage} from "Pages/RegisterPage";
import {PasswordPage} from "Pages/PasswordPage";
import {TracePage} from "Pages/TracePage";
import {ScanQRCodePage} from "Pages/ScanQRCodePage";
import {QRCodePage} from "Pages/QRCodePage";
import {DeleteTracePage} from "Pages/DeleteTracePage";
import {DeleteAccountPage} from "Pages/ConfirmAccountDeletionPage";
import { loadAsync, useFonts } from 'expo-font';
import {AdminPage} from "./src/Pages/AdminPage";

const Stack = createNativeStackNavigator();

export default function App() {
  loadAsync({'Arial': require('Assets/fonts/Arial.ttf'),});
  useFonts({'Arial': require('Assets/fonts/Arial.ttf'),});
  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Root" component={LoginPage}
                      options={{ headerShown: false }}
        />
        <Stack.Screen name="Register" component={RegisterPage}
                      options={{ headerShown: false }}
        />
        <Stack.Screen name="Password" component={PasswordPage}
                      options={{ headerShown: false }}
        />
        <Stack.Screen name="Trace" component={TracePage}
                      options={{ headerShown: false }}
        />
        <Stack.Screen name="ScanQRCode" component={ScanQRCodePage}
                      options={{ headerShown: false }}
        />
        <Stack.Screen name="QRCode" component={QRCodePage}
                      options={{ headerShown: false }}
        />
        <Stack.Screen name="DeleteTrace" component={DeleteTracePage}
                      options={{ headerShown: false }}
        />
        <Stack.Screen name="DeleteAccount" component={DeleteAccountPage}
                      options={{ headerShown: false }}
        />
        <Stack.Screen name="Admin" component={AdminPage}
                      options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}

function PB(){
  return <View style={styles.container}>
    <Text>404 Not Found!</Text>
    <StatusBar style="auto" />
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
