import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json
import SignInScreen from './screens/SignInScreen';
import HomeScreen from './screens/HomeScreen';
import JobScreen from './screens/JobScreen';
import SSRAScreen from './screens/SSRAScreen';
import MapScreen from './screens/MapScreen';
import SubmitScreen from './screens/SubmitScreen';

const RootStack = createStackNavigator(
  {
    SignIn: SignInScreen,
    Home: HomeScreen,
    Job: JobScreen,
    SSRA: SSRAScreen,
    Map: MapScreen,
    Submit: SubmitScreen
  },
  {
    initialRouteName: 'Job',

    // sets the default header styling for all routes
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#696eb4'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }
  }
);

const AppNavigator = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppNavigator />;
  }
}
