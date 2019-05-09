import React from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight
} from 'react-native';
import ListView from '../components/ListView';
import AddIcon from '../components/AddIcon';

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam('email', ''),
      headerRight: (
        <TouchableHighlight onPress={navigation.getParam('addJob')}>
          <View>
            <AddIcon onPress={navigation.getParam('addJob')} />
          </View>
        </TouchableHighlight>
      )
    };
  };
  componentDidMount() {
    this.props.navigation.setParams({ addJob: this.handleAddJob });
  }
  state = {
    jobNumber: '',
    addJob: false,
    jobs: [
      { jNum: '11111', jName: 'big metal one' },
      { jNum: '22222', jName: 'small bamboo one' },
      { jNum: '33333', jName: 'medium duck egg blue one' },
      { jNum: '33453', jName: 'medium duck egg blue one' },
      { jNum: '35553', jName: 'medium duck egg blue one' },
      { jNum: '66666', jName: 'medium duck egg blue one' },
      { jNum: '77777', jName: 'medium duck egg blue one' },
      { jNum: '88888', jName: 'medium duck egg blue one' },
      { jNum: '99999', jName: 'medium duck egg blue one' },
      { jNum: '00000', jName: 'medium duck egg blue one' },
      { jNum: '45678', jName: 'medium duck egg blue one' },
      { jNum: '12345', jName: 'medium duck egg blue one' },
      { jNum: '98765', jName: 'medium duck egg blue one' }
    ]
  };
  handleAddJob = () => {
    this.setState({ addJob: true });
  };
  handleJobNumber = text => {
    this.setState({ jobNumber: text });
  };

  handleAddJobSubmit = () => {
    this.setState({ addJob: false });
  };

  render() {
    const { navigation } = this.props;
    const email = navigation.getParam('email', '');
    return !this.state.addJob ? (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ListView
          itemList={this.state.jobs}
          navigation={this.props.navigation}
          parent='Home'
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
        <Button title="Submit" onPress={this.handleAddJobSubmit} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    margin: 15,
    height: 40,
    width: 200,
    borderColor: '#7a42f4',
    borderWidth: 1
  }
});
