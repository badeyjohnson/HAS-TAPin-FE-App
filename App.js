import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json
import SignInScreen from './screens/SignInScreen';
import HomeScreen from './screens/HomeScreen';
import JobScreen from './screens/JobScreen';
import SSRAScreen from './screens/SSRAScreen';
import MapScreen from './screens/MapScreen';

const RootStack = createStackNavigator(
  {
    SignIn: SignInScreen,
    Home: HomeScreen,
    Job: JobScreen,
    SSRA: SSRAScreen,
    Map: MapScreen,
  },
  {
    initialRouteName: 'SignIn',

    // sets the default header styling for all routes
    defaultNavigationOptions: {
      headerBackTitleStyle: {
        fontWeight: 'bold'
      },
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
