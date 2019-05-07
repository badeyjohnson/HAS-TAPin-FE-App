import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json
import SignInScreen from './screens/SignInScreen'
import HomeScreen from './screens/HomeScreen'

const RootStack = createStackNavigator(
  {
    SignIn: SignInScreen,
    Home: HomeScreen,
  },
  {
    initialRouteName: 'SignIn',

    // sets the default header styling for all routes
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  }
);

const AppNavigator = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppNavigator />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
