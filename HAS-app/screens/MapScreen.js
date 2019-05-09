import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

export default class MapScreen extends React.Component {
  static navigationOptions = {
    title: 'Map'
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Map Screen</Text>
        <Button
          title="Go to submit"
          onPress={() => this.props.navigation.navigate('Submit')}
        />
      </View>
    );
  }
}
