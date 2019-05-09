import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

export default class SSRAScreen extends React.Component {
  static navigationOptions = {
    title: 'SSRA'
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>SSRA Screen</Text>
        <Button
          title="Go to map"
          onPress={() => this.props.navigation.navigate('Map')}
        />
      </View>
    );
  }
}
