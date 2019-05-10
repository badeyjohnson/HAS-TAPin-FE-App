import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { Constants, MapView, Location, Permissions } from 'expo';
import {Polygon} from 'react-native-maps'

export default class MapScreen extends React.Component {
  static navigationOptions = {
    title: 'Map'
  };
  state = {
    mapRegion: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    },
    boundary: [
      { latitude: 53.798332, longitude: -1.558739 },
      { latitude: 53.798553, longitude: -1.530716 },
      { latitude: 53.787372, longitude: -1.531405 },
      { latitude: 53.788328, longitude: -1.558051 }
    ],
    locationResult: null,
    location: { coords: { latitude: 37.78825, longitude: -122.4324 } }
  };

  componentDidMount() {
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied',
        location
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationResult: JSON.stringify(location), location });
  };
  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={{ alignSelf: 'stretch', flex: 0.8 }}
          region={{
            latitude: this.state.location.coords.latitude,
            longitude: this.state.location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          showsUserLocation={true}
        >
          <Polygon
          strokeWidth={1}
          strokeColor={'#b642f4'}
          fillColor={'#d59ff2'}
            coordinates={this.state.boundary}
          />
        </MapView>
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
