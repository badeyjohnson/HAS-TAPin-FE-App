import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import PPE from '../components/PPE';
import Risks from '../components/RiskAssessment';
import WorkingHours from '../components/WorkingHours';
import SiteInfo from '../components/SiteInfo';
import HighRisk from '../components/HighRisk';
import Read from '../components/Read';

export default class SSRAScreen extends React.Component {
  static navigationOptions = {
    title: 'SSRA'
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/* <SiteInfo /> */}
        {/* <WorkingHours /> */}
        {/* <Risks /> */}
        {/* <PPE /> */}
        {/* <HighRisk /> */}
        <Read />
      </View>
    );
  }
}
