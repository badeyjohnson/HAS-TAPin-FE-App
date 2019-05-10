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
import Carousel, { Pagination } from 'react-native-snap-carousel';
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
          site_name: 'tall one'
        },
        {
          siteId: '33333',
          createdAt: 'Mon 19th',
          createdBy: 'ben@arup.com',
          site_name: 'short one'
        }
      ],
      2: [
        {
          siteId: '44444',
          createdAt: 'Sat 10th',
          createdBy: 'tish.richardson@arup.com',
          site_name: 'long one'
        },
        {
          siteId: '55555',
          createdAt: 'Sat 10th',
          createdBy: 'ben.@arup.com',
          site_name: 'massive one'
        },
        {
          siteId: '66666',
          createdAt: 'Sat 10th',
          createdBy: 'dan.@arup.com',
          site_name: 'old one'
        },
        {
          siteId: '77777',
          createdAt: 'Sat 10th',
          createdBy: 'tish.richardson@arup.com',
          site_name: 'new one'
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
    },
    activeSlide: 0
  };
  get pagination() {
    const { activeSlide } = this.state;
    return (
      <Pagination
        dotsLength={Object.keys(this.state.siteDetails).length}
        activeDotIndex={activeSlide}
        containerStyle={{ backgroundColor: 'white' }}
        dotColor={'#394384'}
        inactiveDotColor={'#9a9ce6'}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.92)'
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }
  render() {
    const { jobDetails } = this.state;
    return (
      <React.Fragment>
        <JobContent jobDetails={jobDetails} />
        <Titlebar>
          <Title>Risk assessment on your job below</Title>
          <Name>swipe right to see more sites on your job</Name>
        </Titlebar>
          <Carousel
            layout={'default'}
            data={Object.keys(this.state.siteDetails)}
            ref={c => {
              this._carousel = c;
            }}
            sliderWidth={SCREEN_WIDTH}
            itemWidth={SCREEN_WIDTH}
            onSnapToItem={index => this.setState({ activeSlide: index })}
            renderItem={({ item }) => (
              <ListView
                itemList={this.state.siteDetails[item]}
                navigation={this.props.navigation}
                parent="Job"
              />
            )}
          />
          {this.pagination}
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
