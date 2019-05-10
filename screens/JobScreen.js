import React from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList
} from 'react-native';
import ListView from '../components/ListView';
import Carousel from 'react-native-sideswipe';
import JobContent from '../components/JobContentCard';
import styled from 'styled-components';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class JobsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.state.params
    };
  };
  state = {
    jobDetails: {
      job_name: 'test job name',
      pm_first_name: 'firstname',
      pm_last_name: 'lastname',
      pm_email: 'test.email@arup.com',
      pm_number: '01234123123'
    },
    siteDetails: {
      1: [
        {
          siteId: '11111',
          site_name: 'big one',
          createdAt: 'Tues 27th',
          createdBy: 'tish.richardson@arup.com'
        },
        {
          siteId: '22222',
          createdAt: 'Fri 23rd',
          createdBy: 'tish.richardson@arup.com',
          site_name: 'big one'
        },
        {
          siteId: '33333',
          createdAt: 'Mon 19th',
          createdBy: 'ben@arup.com',
          site_name: 'big one'
        }
      ],
      2: [
        {
          siteId: '44444',
          createdAt: 'Sat 10th',
          createdBy: 'tish.richardson@arup.com',
          site_name: 'big one'
        },
        {
          siteId: '55555',
          createdAt: 'Sat 10th',
          createdBy: 'ben@arup.com',
          site_name: 'big one'
        },
        {
          siteId: '66666',
          createdAt: 'Sat 10th',
          createdBy: 'dan@arup.com',
          site_name: 'big one'
        },
        {
          siteId: '77777',
          createdAt: 'Sat 10th',
          createdBy: 'tish.richardson@arup.com',
          site_name: 'big one'
        }
      ],
      3: [
        {
          siteId: '88888',
          createdAt: 'Sat 10th',
          createdBy: 'tish.richardson@arup.com',
          site_name: 'big one'
        },
        {
          siteId: '99999',
          createdAt: 'Sat 10th',
          createdBy: 'ben@arup.com',
          site_name: 'big one'
        },
        {
          siteId: '12345',
          createdAt: 'Sat 10th',
          createdBy: 'dan@arup.com',
          site_name: 'big one'
        },
        {
          siteId: '55865',
          createdAt: 'Tues 5th',
          createdBy: 'ben@arup.com',
          site_name: 'big one'
        }
      ]
    }
  };
  render() {
    const { jobDetails } = this.state;
    return (
      <React.Fragment>
        <JobContent jobDetails={jobDetails} />
        <Titlebar>
          <Title>Risk assessment on your job below</Title>
          <Name>swipe right to see more sites on your job</Name>
        </Titlebar>
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Carousel
            data={Object.keys(this.state.siteDetails)}
            style={{
              flex: 1,
              width: SCREEN_WIDTH - 10,
              borderWidth: 0
            }}
            itemWidth={ListView.WIDTH}
            threshold={120}
            contentOffset={0}
            renderItem={({ item }) => (
              <View
                style={{ flex: 1, width: SCREEN_WIDTH, paddingHorizontal: 10 }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <ListView
                    itemList={this.state.siteDetails[item]}
                    navigation={this.props.navigation}
                    parent="Job"
                  />
                </View>
              </View>
            )}
          />
        </View>
      </React.Fragment>
    );
  }
}

const Titlebar = styled.View`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 5px;
  padding: 10px;
  background: #fff;
  align-items: center;
  align-content: center;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 500;
  color: #b8bece;
`;

const Name = styled.Text`
  font-size: 15px;
  color: #3c4560;
  font-weight: bold;
`;
