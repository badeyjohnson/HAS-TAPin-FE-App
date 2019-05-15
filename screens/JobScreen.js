import React from 'react';
import { Text, Dimensions, ActivityIndicator } from 'react-native';
import ListView from '../components/ListView';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import JobContent from '../components/JobContentCard';
import styled from 'styled-components';
import { fetchSitesByJob, fetchJob, fetchSitesRisks } from '../api';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class JobsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.state.params.title
    };
  };

  state = {
    loading: true,
    jobDetails: {},
    siteDetails: {},
    activeSlide: 0
  };

  componentDidMount = async () => {
    const { navigation } = this.props;
    const jobNo = navigation.state.params.title
    const jobDetails = await fetchJob(jobNo);
    const sites = await fetchSitesByJob(jobNo);
    const siteDetails = {};
    for (const [i, value] of sites.entries()) {
      await fetchSitesRisks(value.site_id).then(risk => {
        return (siteDetails[i] = risk);
      });
    }
    this.setState({ siteDetails, loading: false, jobDetails });
  };

  get pagination() {
    const { activeSlide, siteDetails } = this.state;
    return (
      <Pagination
        dotsLength={Object.keys(siteDetails).length}
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
    const { jobDetails, siteDetails, loading } = this.state;
    return (
      <React.Fragment>
        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#9a9ce8" />
          </View>
        ) : (
          <React.Fragment>
            <JobContent jobDetails={jobDetails} />
            <Titlebar>
              <Title>Risk assessment on your job below</Title>
              <Name>swipe right to see more sites on your job</Name>
            </Titlebar>
            <Carousel
              layout={'default'}
              data={Object.keys(siteDetails)}
              ref={c => {
                this._carousel = c;
              }}
              sliderWidth={SCREEN_WIDTH}
              itemWidth={SCREEN_WIDTH}
              onSnapToItem={index => this.setState({ activeSlide: index })}
              renderItem={({ item }) => (
                <ListView
                  itemList={siteDetails[item]}
                  navigation={this.props.navigation}
                  jobDetails={jobDetails}
                  parent="Job"
                />
              )}
            />
            {this.pagination}
          </React.Fragment>
        )}
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

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    width: SCREEN_WIDTH
  }
});