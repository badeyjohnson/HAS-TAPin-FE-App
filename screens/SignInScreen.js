import React from 'react';
import { Button, View, Text, Image, StyleSheet, TextInput } from 'react-native';

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Sign in'
  };
  state = {
    email: '',
    password: ''
  };
  handleEmail = text => {
    this.setState({ email: text });
  };
  handlePassword = text => {
    this.setState({ password: text });
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View
          style={{ flex: 0.4, alignItems: 'center', justifyContent: 'center' }}
        >
          <Image
            style={{ width: 300, height: 100 }}
            source={require('../images/ArupLogo.jpeg')}
          />
          <TextInput
            placeholder="email"
            style={styles.input}
            onChangeText={this.handleEmail}
          />
          <TextInput
            placeholder="password"
            style={styles.input}
            onChangeText={this.handlePassword}
          />
        </View>
        <View
          style={{ flex: 0.6, alignItems: 'center', justifyContent: 'center' }}
        >
          <Button
            title="Login"
            onPress={() => this.props.navigation.navigate('Home', this.state)}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    margin: 15,
    height: 40,
    width: 200,
    borderColor: '#7a42f4',
    borderWidth: 1
  }
});
