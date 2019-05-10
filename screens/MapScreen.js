import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { Constants, MapView, Location, Permissions } from 'expo';
import { Polygon } from 'react-native-maps';

export default class MapScreen extends React.Component {
  static navigationOptions = {
    title: 'Map'
  };
  state = {
    boundary: [
      { latitude: 54.798332, longitude: -1.558739 },
      { latitude: 54.798553, longitude: -1.530716 },
      { latitude: 54.787372, longitude: -1.531405 },
      { latitude: 54.788328, longitude: -1.558051 }
    ],
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={{ alignSelf: 'stretch', flex: 0.8 }}
          region={{
            latitude: this.state.boundary.reduce((sum,current) => sum + current.latitude, 0)/this.state.boundary.length,
            longitude: this.state.boundary.reduce((sum,current) => sum + current.longitude, 0)/this.state.boundary.length,
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
        <View style={{flex:0.2}}>
          <Button></Button>
        </View>
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
