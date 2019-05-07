import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
      title: 'Home',
    };
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Home Screen</Text>
          <Button
            title="Go to job"
            onPress={() => this.props.navigation.navigate('Job')}
          />
        </View>
      );
    }
  }