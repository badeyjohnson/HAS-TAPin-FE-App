import React from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Dimensions
} from 'react-native';
import ListView from '../components/ListView';
import AddIcon from '../components/AddIcon';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'My Jobs',
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
      { jNum: '22222', jName: 'small bamboo one' }
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
    return !this.state.addJob ? (
      <View style={styles.background}>
        <ListView
          itemList={this.state.jobs}
          navigation={this.props.navigation}
          parent='Home'
        />
      </View>
    ) : (
      <View style={styles.background}>
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
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEEEEE',
  },
  input: {
    margin: 15,
    height: 40,
    width: 200,
    borderColor: '#7a42f4',
    borderWidth: 1
  }
});
