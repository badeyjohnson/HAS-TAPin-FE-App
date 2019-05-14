import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import MapView, { Polygon } from 'react-native-maps';
import Communications from 'react-native-communications';
import styled from 'styled-components';
import { Input, Button, Icon } from 'react-native-elements';
import { fetchMapBySiteId } from '../api';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class MapScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Map'
    };
  };

  state = {
    boundary: [
      { latitude: 53.798332, longitude: -1.558739 },
      { latitude: 53.798553, longitude: -1.530716 },
      { latitude: 53.787372, longitude: -1.531405 },
      { latitude: 53.788328, longitude: -1.558051 }
    ],
    checkedIn: false,
    failedCheckIn: false,
    checkedOut: false,
    LRBVisability: false,
    loading: false
  };

  componentDidMount = async () => {
    const {
      navigation: {
        state: { params }
      }
    } = this.props;
    const [map] = await fetchMapBySiteId(params.site_id);
    this.setState({ loading: false, boundary: JSON.parse(map.coordinates) });
  };
  textNumberCheckIn = () => {
    const {
      navigation: {
        state: { params }
      }
    } = this.props;

    if (!this.state.checkedIn) {
      Communications.text(
        `0${params.pm_number}`,
        "Hi I'm on site #TishsAngels"
      );
      this.setState({ checkedIn: true });
    } else {
      this.setState({ failedCheckIn: true });
    }
  };

  textNumberCheckOut = () => {
    const {
      navigation: {
        state: { params }
      }
    } = this.props;
    Communications.text(
      `0${params.pm_number}`,
      "Hi I'm leaving site #TishsAngels"
    );
    this.setState({ checkedOut: true });
  };

  resetFailedCheckIn = () => {
    this.setState({ failedCheckIn: false });
  };
  resetCheckedIn = () => {
    this.setState({ failedCheckIn: false });
    this.setState({ checkedIn: false });
  };

  render() {
    const { loading, checkedIn } = this.state;
    return (
      <React.Fragment>
        {loading ? (
          <Text>Loading...</Text>
        ) : !this.state.checkedOut ? (
          <View style={styles.container}>
            <MapView
              style={{
                alignSelf: 'stretch',
                flex: 1,
                alignItems: 'stretch'
              }}
              region={{
                latitude:
                  this.state.boundary.reduce(
                    (sum, current) => sum + current.latitude,
                    0
                  ) / this.state.boundary.length,
                longitude:
                  this.state.boundary.reduce(
                    (sum, current) => sum + current.longitude,
                    0
                  ) / this.state.boundary.length,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
              }}
              showsUserLocation={true}
            >
              <Polygon
                strokeWidth={1}
                strokeColor={'#696eb5'}
                fillColor={'rgba(155, 158, 232, 0.34)'}
                coordinates={this.state.boundary}
              />
            </MapView>
            {/* <View style={{ flex: 0 }}> */}
            {!this.state.failedCheckIn ? (
              <View style={styles.buttons}>
                <Button
                  onPress={this.textNumberCheckIn}
                  title="On Site"
                  buttonStyle={{
                    backgroundColor: '#696eb5',
                    borderWidth: 2,
                    borderColor: '#696eb5'
                  }}
                  disabled={checkedIn ? true : false}
                  titleStyle={{ fontWeight: 'bold' }}
                  accessibilityLabel="Learn more about this purple button"
                />
                <Text>{'\n'}</Text>
                <Button
                  onPress={this.textNumberCheckOut}
                  title="Off Site"
                  accessibilityLabel="Learn more about this purple button"
                  buttonStyle={{
                    backgroundColor: '#696eb5',
                    borderWidth: 2,
                    borderColor: '#696eb5'
                  }}
                  disabled={checkedIn ? false : true}
                  titleStyle={{ fontWeight: 'bold' }}
                />
              </View>
            ) : (
              <View>
                <Text>You have already checked in</Text>
                <TouchableOpacity onPress={() => this.resetFailedCheckIn}>
                  <Text>OK</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.resetCheckedIn}>
                  <Text>Re-check in</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.container}>
            <Container>
              <Content>
                <Name>
                  You have checked out. Did you come across anything that needs
                  to be added to the risk assessment?
                </Name>
              </Content>
            </Container>
            <View style={styles.checkoutButtons}>
              <Button
                title="Yes"
                onPress={() =>
                  this.props.navigation.navigate('SSRA', { makeChange: true })
                }
                buttonStyle={{
                  backgroundColor: '#696eb5',
                  borderWidth: 2,
                  borderColor: '#696eb5'
                }}
                titleStyle={{ fontWeight: 'bold' }}
              />
              <Button
                title="No"
                onPress={() => this.props.navigation.navigate('Home')}
                buttonStyle={{
                  backgroundColor: '#696eb5',
                  borderWidth: 2,
                  borderColor: '#696eb5'
                }}
                titleStyle={{ fontWeight: 'bold' }}
              />
            </View>
          </View>
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
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1'
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'space-around',
    width: SCREEN_WIDTH,
    height: 100,
    position: 'absolute',
    bottom: '3%'
  },
  checkoutButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'space-around',
    width: SCREEN_WIDTH,
    height: 100,
    padding: 10
  }
});

const Container = styled.View`
  background: #fff;
  height: 100px;
  width: ${SCREEN_WIDTH - 50};
  border-radius: 14px;
  margin-top: 15px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
  flex-direction: row;
  align-items: center;
`;

const Name = styled.Text`
  font-size: 15px;
  color: #3c4560;
  font-weight: bold;
  margin-bottom: 5px;
  padding: 5px;
`;

const Content = styled.View`
  padding: 10px;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
`;
