import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

export default class SubmitScreen extends React.Component {
    static navigationOptions = {
      title: 'Submit',
    };
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Submit Screen</Text>
          <Button
            title="Submit and back to home"
            onPress={() => this.props.navigation.navigate('Home')}
          />
        </View>
      );
    }
  }