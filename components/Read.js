import React from 'react';
import {
  Dimensions,
  Text,
  ScrollView,
  Switch,
  View,
  StyleSheet,
  Picker,
  TextInput,
  Image
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
    const { navigation } = this.props;
    const { loading } = this.state;
    return (
      <React.Fragment>
        {loading ? (
          <Text>loading...</Text>
        ) : (
          <React.Fragment>
            <Container>
              <Titlebar>
                <Image
                  style={{ width: 150, height: 150 }}
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
                <Caption> </Caption>
                <Name>
                  YOU ARE EMPOWERED TO SAY NO IF YOU JUDGE THE CONDITIONS TO BE
                  UNSAFE
                </Name>
                <Caption> </Caption>
                <Button
                  title="GO TO MAP"
                  activeOpacity={1}
                  underlayColor="transparent"
                  onPress={() => navigation.navigate('Map')}
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
  }
});

const Container = styled.View`
  background: #fff;
  height: 110px;
  width: ${SCREEN_WIDTH - 50};
  border-radius: 14px;
  margin: 10px;
  margin-top: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
  align-items: flex-start;
  align-content: flex-start;
  justify-content: flex-start;
`;

const Titlebar = styled.View`
  width: 100%;
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 5px;
  background: #fff;
  align-items: center;
  align-content: center;
  justify-content: center;
`;

const Content = styled.View`
  padding: 50px;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
`;

const Title = styled.Text`
  color: #3c4560;
  font-size: 20px;
  font-weight: 600;
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
