import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

export default class JobsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.state.params
    };
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Job Screen</Text>
        <Button
          title="Go to SSRAs"
          onPress={() => this.props.navigation.navigate('SSRA')}
        />
      </View>
    );
  }
}
