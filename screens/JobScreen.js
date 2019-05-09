import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import ListView from '../components/ListView';


export default class JobsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.state.params
    };
  };
  state = {
    riskDetails: [{ riskId: '11111', createdAt: 'Tues 27th' },
    { riskId: '22222', createdAt: 'Fri 23rd' },
    { riskId: '33333', createdAt: 'Mon 19th' },
    { riskId: '44444', createdAt: 'Sat 10th' },
    { riskId: '55555', createdAt: 'Tues 5th' },]
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View
          style={{ flex: 0.3, alignItems: 'center', alignSelf: 'stretch', borderWidth: 0.5, margin: 20 }}
        >
          <Text>Job info</Text>
        </View>
        <View
          style={{ flex: 0.7, alignItems: 'center', justifyContent: 'center' }}
        >
          <ListView
          itemList={this.state.riskDetails}
          navigation={this.props.navigation}
          parent='Job'
        />
        </View>
      </View>
    );
  }
}
