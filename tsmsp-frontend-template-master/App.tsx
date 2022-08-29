import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from "@react-navigation/native";
import { loadAsync } from 'expo-font';
import {PagesStack} from "Pages/PagesStack";
import {AppLoading} from "Pages/AppLoading";

export default class App extends React.Component<any,any> {
  state: {loading: boolean}
  constructor(props: any) {
    super(props);
    this.state = {loading: true};
  }
  //Not implemented: Fronts seems not to work now
  async componentWillMount() {
    await loadAsync({
      'Arial': require('Assets/fonts/Arial.ttf'),
    });
    this.setState({loading: false});
  }

  render() {
    if (this.state.loading) {
      return <AppLoading/>;
    } else {
      return (
          <SafeAreaProvider>
            <NavigationContainer>
              <PagesStack/>
            </NavigationContainer>
          </SafeAreaProvider>
      )
    }
  }
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
