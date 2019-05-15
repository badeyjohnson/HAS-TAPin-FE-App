import React from 'react';
import {
  Dimensions,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Image, ActivityIndicator
} from 'react-native';
import styled from 'styled-components';
import { Input, Button, Icon } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class JobsScreen extends React.Component {
  state = {
    loading: true
  };

  componentDidMount = () => {
    this.setState({ loading: false });
  };

  render() {
    const {
      updateAdditionalInfo,
      additionalInfoUpdate,
      submitChanges,
      disabled,
      navigation,
      navigation: {
        state: {
          params: { job }
        }
      },
      additionalInfo: [additionalInfo]
    } = this.props;

    const { loading } = this.state;
    console.log(additionalInfoUpdate)
    return (
      <React.Fragment>
        {loading ? (
            <View style={styles.loader}>
            <ActivityIndicator size="large" color="#9a9ce8" />
          </View>
        ) : (
          <React.Fragment>
            <Container>
              <Titlebar>
                <Image
                  style={{ width: 120, height: 140 }}
                  source={require('../images/stop.jpg')}
                />
              </Titlebar>
            </Container>
            <ScrollView>
              <Content>
                <Caption>
                  On arrival at site staff must check that all hazards have been
                  captured in the risk assessment and that the site is as
                  expected.
                </Caption>
                <Caption>
                  If any aspect of the site compromises the health and/or safety
                  of any person engaged in the activities above then you must
                  refuse to continue, contact your project director, project
                  manager or the Health and Safety team and agree what action to
                  take. This may include abandoning the activity and leaving
                  site.
                </Caption>
                <Caption>
                  See the Minimum Health and Safety Requirements on Site for
                  further details.
                </Caption>
                <Content>
                  <Name>Additional Info</Name>
                  <TextInput
                    multiline={true}
                    onChangeText={input => updateAdditionalInfo(input)}
                    editable={!disabled}
                    style={styles.mitigate}
                    keyboardAppearance={'light'}
                    value={additionalInfoUpdate}
                    returnKeyType={'done'}
                    keyboardType={'default'}
                    maxLength={40}
                    placeholder={
                      additionalInfo.multi_option
                        ? additionalInfo.multi_option
                        : 'N/A'
                    }
                  />
                </Content>
                <Caption> </Caption>
                <Name>
                  YOU ARE EMPOWERED TO SAY NO IF YOU JUDGE THE CONDITIONS TO BE
                  UNSAFE
                </Name>
                <Caption> </Caption>
                {!disabled ? (
                  <Button
                    title="Submit Changes"
                    activeOpacity={1}
                    underlayColor="transparent"
                    onPress={() => {
                      submitChanges();
                      this.props.navigation.navigate('Home');
                    }}
                    loadingProps={{ size: 'small', color: 'white' }}
                    buttonStyle={{
                      height: 50,
                      width: 250,
                      backgroundColor: 'transparent',
                      borderWidth: 2,
                      borderColor: 'black',
                      borderRadius: 30
                    }}
                    containerStyle={{ marginVertical: 10 }}
                    titleStyle={{ fontWeight: 'bold', color: 'green' }}
                  />
                ) : (
                  <Button
                    title="GO TO MAP"
                    activeOpacity={1}
                    underlayColor="transparent"
                    onPress={() =>
                      navigation.navigate('Map', { ...additionalInfo, ...job })
                    }
                    loadingProps={{ size: 'small', color: 'white' }}
                    buttonStyle={{
                      height: 50,
                      width: 250,
                      backgroundColor: 'transparent',
                      borderWidth: 2,
                      borderColor: 'black',
                      borderRadius: 30
                    }}
                    containerStyle={{ marginVertical: 10 }}
                    titleStyle={{ fontWeight: 'bold', color: 'red' }}
                  />
                )}
              </Content>
            </ScrollView>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: SCREEN_WIDTH - 50,
    flexDirection: 'column',
    alignContent: 'center',
    padding: 50
  },
  mitigate: {
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: '#394385',
    borderRadius: 4
  },
  measureContain: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: SCREEN_WIDTH - 50
  }, loader: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    width: SCREEN_WIDTH
  }
});

const Container = styled.View`
  background: #fff;
  height: 160px;
  width: ${SCREEN_WIDTH - 75};
  border-radius: 14px;
  margin: 10px;
  margin-top: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
  align-items: center;
  align-content: center;
  justify-content: center;
`;

const Titlebar = styled.View`
  width: 80%;
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 5px;
  background: #fff;
  align-items: center;
  align-content: center;
  justify-content: center;
`;

const Content = styled.View`
  padding: 20px;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
`;

const Caption = styled.Text`
  color: #b8b3c3;
  font-size: 12px;
  font-weight: 600;
  margin: 4px;
`;

const Name = styled.Text`
  font-size: 15px;
  color: #3c4560;
  font-weight: bold;
  padding: 5px;
`;
