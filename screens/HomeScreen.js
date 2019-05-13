import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  FlatList
} from 'react-native';
import {
  Overlay,
  Text,
  Button,
  Input,
  Icon,
  Keyboard
} from 'react-native-elements';
import styled from 'styled-components';
import ListView from '../components/ListView';
import AddIcon from '../components/AddIcon';
import { fetchUserJobs, fetchJob, linkUserToJob } from '../api';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'My Jobs',
      headerRight: (
        <TouchableOpacity onPress={navigation.getParam('addJob')}>
          <View>
            <AddIcon />
          </View>
        </TouchableOpacity>
      )
    };
  };
  state = {
    jobNumber: '',
    foundJob: true,
    addJob: false,
    jobs: []
  };

  componentDidMount = async () => {
    const { navigation } = this.props;
    navigation.setParams({ addJob: this.handleAddJob });
    const email = navigation.getParam('email', '');
    const returned = await fetchUserJobs(email);
    const jobs = returned.map(job => {
      return { jNum: job.job_no, jName: job.job_name };
    });
    this.setState({ jobs });
  };
  handleAddJob = () => {
    this.setState({ addJob: true });
  };

  handleAddJobSubmit = async () => {
    const { navigation } = this.props;
    const { jobNumber, jobs } = this.state;
    const email = navigation.getParam('email', '');
    const number = Number(jobNumber);
    const returned = await fetchJob(number);
    if (returned.job_no === number) {
      linkUserToJob(email, number);
      const newJobs = [
        ...jobs,
        { jName: returned.job_name, jNum: returned.job_no }
      ];
      this.setState({ addJob: false, foundJob: true, jobs: newJobs });
    } else {
      this.setState({ foundJob: false });
    }
  };

  render() {
    const { navigation } = this.props;
    const { foundJob, jobNumber } = this.state;
    const email = navigation.getParam('email', '');
    return (
      <React.Fragment>
        <Titlebar>
          <Avatar source={require('../images/avatar.png')} />
          <Title>Welcome back,</Title>
          <Name>{email.split('.')[0]}</Name>
        </Titlebar>
        <View style={styles.background}>
          <ListView
            itemList={this.state.jobs}
            navigation={this.props.navigation}
          />
        </View>
        <Overlay
          isVisible={this.state.addJob}
          overlayBackgroundColor="white"
          width={300}
          height={400}
          overlayStyle={styles.modal}
        >
          <React.Fragment>
            <Text h4>Find a job</Text>
            <Text>{`\n`}</Text>
            <Input
              leftIcon={
                <Icon
                  name="tasks"
                  type="font-awesome"
                  color="black"
                  size={25}
                />
              }
              containerStyle={{ marginVertical: 10 }}
              onChangeText={jobNumber => this.setState({ jobNumber })}
              value={jobNumber}
              inputStyle={{ marginLeft: 10, color: 'black' }}
              keyboardAppearance="light"
              placeholder="Job Number"
              autoFocus={false}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="numeric"
              returnKeyType="done"
              blurOnSubmit={true}
              placeholderTextColor="black"
              errorStyle={{
                textAlign: 'center',
                fontSize: 12,
                color: 'black',
                fontWeight: 'bold'
              }}
              errorMessage={foundJob ? null : 'Job No. Not Found'}
            />
            <Text>{`\n`}</Text>
            <Button title="Submit" onPress={this.handleAddJobSubmit} />
            <Button
              type="outline"
              title="Cancel"
              onPress={() => this.setState({ addJob: false })}
            />
          </React.Fragment>
        </Overlay>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
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
  margin-bottom: 5px;
  padding-left: 80px;
  background: #fff;
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
