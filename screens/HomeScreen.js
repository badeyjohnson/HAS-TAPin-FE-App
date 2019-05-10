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
import styled from 'styled-components';
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
    const { navigation } = this.props;
    const email = navigation.getParam('email', '');
    return !this.state.addJob ? (
      <React.Fragment>
        {/* <Container> */}
        <Titlebar>
          <Avatar source={require('../images/avatar.png')} />
          <Title>Welcome back,</Title>
          <Name>{email.split('.')[0]}</Name>
        </Titlebar>
        {/* </Container> */}
        <View style={styles.background}>
          <ListView
            itemList={this.state.jobs}
            navigation={this.props.navigation}
          />
        </View>
      </React.Fragment>
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
    backgroundColor: 'white'
  },
  input: {
    margin: 15,
    height: 40,
    width: 200,
    borderColor: '#7a42f4',
    borderWidth: 1
  }
});

const Titlebar = styled.View`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-left: 80px;
`;

const Avatar = styled.Image`
  width: 44px;
  height: 44px;
  background: black;
  border-radius: 22px;
  margin-left: 20px;
  position: absolute;
  top: 0;
  left: 0;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 500;
  color: #b8bece;
`;

const Name = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
`;
