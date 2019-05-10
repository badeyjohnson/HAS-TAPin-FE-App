import React from 'react';
import { Button, View, Text, StyleSheet, Dimensions } from 'react-native';
import ListView from '../components/ListView';
import Carousel from 'react-native-sideswipe';

const { width } = Dimensions.get('window');

export default class JobsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.state.params
    };
  };
  state = {
    riskDetails: {
      1: [
        { riskId: '11111', createdAt: 'Tues 27th' },
        { riskId: '22222', createdAt: 'Fri 23rd' },
        { riskId: '33333', createdAt: 'Mon 19th' }
      ],
      2: [
        { riskId: '44444', createdAt: 'Sat 10th' },
        { riskId: '55555', createdAt: 'Sat 10th' },
        { riskId: '66666', createdAt: 'Sat 10th' },
        { riskId: '77777', createdAt: 'Sat 10th' }
      ],
      3: [
        { riskId: '88888', createdAt: 'Sat 10th' },
        { riskId: '99999', createdAt: 'Sat 10th' },
        { riskId: '12345', createdAt: 'Sat 10th' },
        { riskId: '55865', createdAt: 'Tues 5th' }
      ]
    }
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Carousel
          data={Object.keys(this.state.riskDetails)}
          style={{
            flex: 1,
            width: width,
            borderWidth: 1
          }}
          itemWidth={ListView.WIDTH}
          threshold={120}
          contentOffset={0}
          renderItem={({ item }) => (
            <View style={{ flex: 1, width: width, paddingHorizontal: 10 }}>
              <View
                style={{
                  flex: 0.3,
                  alignItems: 'center',
                  alignSelf: 'stretch',
                  borderWidth: 0.5,
                  margin: 20
                }}
              >
                <Text>Job info</Text>
              </View>
              <View
                style={{
                  flex: 0.7,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ListView
                  itemList={this.state.riskDetails[item]}
                  navigation={this.props.navigation}
                  parent="Job"
                />
              </View>
            </View>
          )}
        />
      </View>
    );
  }
}
