import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {LoginPage} from "Pages/LoginPage";
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from "@react-navigation/native";
import {RegisterPage} from "Pages/RegisterPage";
import {TracePage} from "Pages/TracePage";
import {ScanQRCodePage} from "Pages/ScanQRCodePage";
import {QRCodePage} from "Pages/QRCodePage";

const Stack = createNativeStackNavigator();

export default function App() {
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
        <Stack.Screen name="Trace" component={TracePage}
                      options={{ headerShown: false }}
        />
        <Stack.Screen name="ScanQRCode" component={ScanQRCodePage}
                      options={{ headerShown: false }}
        />
        <Stack.Screen name="QRCode" component={QRCodePage}
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
