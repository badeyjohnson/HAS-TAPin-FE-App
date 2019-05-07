import React from 'react';
import { Button, View, Text, StyleSheet, TextInput } from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam('email', ''),
      headerRight: <Button onPress={navigation.getParam('addJob')} title="+" />
    };
  };
  componentDidMount() {
    this.props.navigation.setParams({ addJob: this.handleAddJob });
  }
  state = {
    jobNumber: '',
    addJob: false
  };
  handleAddJob = () => {
    this.setState({ addJob: true });
  };
  handleJobNumber = text => {
    this.setState({ jobNumber: text });
  };

  handleAddJobSubmit = () => {
    this.setState({ addJob: false });
  }
  render() {
    const { navigation } = this.props;
    const email = navigation.getParam('email', '');
    return !this.state.addJob ? (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Text>user email: {JSON.stringify(email)}</Text>
        <Text>job number: {this.state.jobNumber}</Text>
        <Button
          title="Go to job"
          onPress={() => this.props.navigation.navigate('Job')}
        />
      </View>
    ) : (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Find a job</Text>
        <TextInput
          placeholder="Job Number"
          keyboardType="numeric"
          style={styles.input}
          onChangeText={this.handleJobNumber}
        />
        <Button
          title="Submit"
          onPress={this.handleAddJobSubmit}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    margin: 15,
    height: 40,
    width: 200,
    borderColor: '#7a42f4',
    borderWidth: 1
  }
});
