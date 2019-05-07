import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
        title: navigation.getParam('email', '')
    }
  };
  render() {
    const { navigation } = this.props;
    const email = navigation.getParam('email', '');
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Text>user email: {JSON.stringify(email)}</Text>
        <Button
          title="Go to job"
          onPress={() => this.props.navigation.navigate('Job')}
        />
      </View>
    );
  }
}
