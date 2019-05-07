import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Sign in',
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Sign In Screen</Text>
        <Button
          title="Go to Home..."
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    );
  }
}