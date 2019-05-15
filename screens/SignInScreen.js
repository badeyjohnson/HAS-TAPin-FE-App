import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  Dimensions,
  LayoutAnimation,
  UIManager,
  KeyboardAvoidingView
} from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = 'https://cdn.vuetifyjs.com/images/parallax/material.jpg';

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    // title: 'Sign in',
    headerStyle: {
      backgroundColor: '#FF6B6B'
    }
  };
  state = {
    email: 'tish.richardson@arup.com',
    password: 'tish1234',
    isLoading: false,
    isEmailValid: true,
    isPasswordValid: true
  };

  login = () => {
    const { email, password, isEmailValid, isPasswordValid } = this.state;
    this.setState({ isLoading: true });
    setTimeout(() => {
      LayoutAnimation.easeInEaseOut();
      this.setState(
        {
          isLoading: false,
          isEmailValid: this.validateEmail(email) || this.emailInput.shake(),
          isPasswordValid:
            this.validatePassword(password) || this.passwordInput.shake()
        },
        () => {
          if (isEmailValid && isPasswordValid) {
            this.props.navigation.navigate('Home', this.state);
          }
        }
      );
    }, 1500);
  };

  validateEmail = email => {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
  };
  validatePassword = password => {
    return password.length >= 6;
  };

  render() {
    const {
      isLoading,
      isEmailValid,
      isPasswordValid,
      email,
      password
    } = this.state;
    return (
      <View style={styles.container}>
        <ImageBackground source={{ uri: BG_IMAGE }} style={styles.bgImage}>
          <View style={styles.loginView}>
            <View style={styles.loginTitle}>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Image
                  style={{ width: 200, height: 50 }}
                  source={require('../images/Arup-logo.png')}
                />
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 18
                  }}
                >
                  HAS TAPin
                </Text>
              </View>
            </View>
            <View style={styles.loginInput}>
              <Input
                leftIcon={
                  <Icon
                    name="user"
                    type="font-awesome"
                    color="black"
                    size={25}
                  />
                }
                containerStyle={{ marginVertical: 10 }}
                onChangeText={email => this.setState({ email })}
                value={email}
                inputStyle={{ marginLeft: 10, color: 'black' }}
                keyboardAppearance="light"
                placeholder="Email"
                autoFocus={false}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="next"
                ref={input => (this.emailInput = input)}
                onSubmitEditing={() => {
                  this.setState({ isEmailValid: this.validateEmail(email) });
                  this.passwordInput.focus();
                }}
                blurOnSubmit={false}
                placeholderTextColor="black"
                errorStyle={{
                  textAlign: 'center',
                  fontSize: 12,
                  color: 'black',
                  fontWeight: 'bold'
                }}
                errorMessage={
                  isEmailValid ? null : 'Please enter a valid email address'
                }
              />
              <Input
                leftIcon={
                  <Icon
                    name="lock"
                    type="font-awesome"
                    color="black"
                    size={25}
                  />
                }
                containerStyle={{ marginVertical: 10 }}
                onChangeText={password =>
                  this.setState({
                    password,
                    isPasswordValid: this.validatePassword(password)
                  })
                }
                value={password}
                inputStyle={{ marginLeft: 10, color: 'black' }}
                secureTextEntry={true}
                keyboardAppearance="light"
                placeholder="Password"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                // returnKeyType="done"
                ref={input => (this.passwordInput = input)}
                blurOnSubmit={true}
                placeholderTextColor="black"
                errorStyle={{
                  textAlign: 'center',
                  fontSize: 12,
                  color: 'black',
                  fontWeight: 'bold'
                }}
                errorMessage={
                  isPasswordValid ? null : 'Please enter a valid password'
                }
              />
            </View>
            <Button
              title="LOG IN"
              activeOpacity={1}
              underlayColor="transparent"
              onPress={this.login}
              loading={isLoading}
              loadingProps={{ size: 'small', color: 'white' }}
              // disabled={!isEmailValid}
              buttonStyle={{
                height: 50,
                width: 250,
                backgroundColor: 'transparent',
                borderWidth: 2,
                borderColor: 'black',
                borderRadius: 30
              }}
              containerStyle={{ marginVertical: 10 }}
              titleStyle={{ fontWeight: 'bold', color: 'black' }}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginView: {
    flex: 1,
    marginBottom: 125,
    width: 250
  },
  loginTitle: {
    flex: 1,
    alignItems: 'center',

    justifyContent: 'center',
    width: 250,
    height: 300,
    marginTop: 50
  },
  loginInput: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    width: SCREEN_WIDTH
  }
});
