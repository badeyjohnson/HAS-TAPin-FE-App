import React from 'react';
import { Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { Constants, MapView, Location, Permissions } from 'expo';
import MapView, { Polygon } from 'react-native-maps';
import Communications from 'react-native-communications';

export default class MapScreen extends React.Component {
  static navigationOptions = {
    title: 'Map'
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
    checkedOut: false
  };
  textNumberCheckIn = () => {
    if (!this.state.checkedIn) {
      Communications.text(
        '07846946661',
        'seeing if this react native communications thing works for texts #TishsAngels'
      );
      this.setState({ checkedIn: true });
    } else {
      this.setState({ failedCheckIn: true });
    }
  };

  textNumberCheckOut = () => {
    Communications.text('07846946661', 'Job done #TishsAngels');
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
    return !this.state.checkedOut ? (
      <View style={styles.container}>
        <MapView
          style={{ alignSelf: 'stretch', flex: 0.8 }}
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
            strokeColor={'#b642f4'}
            // use a rgba instead for fill color
            fillColor={'#d59ff2'}
            coordinates={this.state.boundary}
          />
        </MapView>
        <View style={{ flex: 0.2 }}>
          {!this.state.failedCheckIn ? (
            <View>
              <Button
                onPress={this.textNumberCheckIn}
                title="On Site"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
              />
              <Button
                onPress={this.textNumberCheckOut}
                title="Off Site"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
              />
            </View>
          ) : (
            <View>
              <Text>You have already checked in</Text>
              <TouchableOpacity onPress={()=> this.resetFailedCheckIn}>
                <Text>OK</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>this.resetCheckedIn}>
                <Text>Re-check in</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    ) : (
      <View style={styles.container}>
        <Text>You have checked out. Did you come across anything that needs to be added to the risk assessment?</Text>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('SSRA')}>
          <Text>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Submit')}>
          <Text>No</Text>
        </TouchableOpacity>
      </View>
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
  }
});
