import React from 'react';
import { Dimensions, View, Text } from 'react-native';
import PPE from '../components/PPE';
import Risks from '../components/RiskAssessment';
import WorkingHours from '../components/WorkingHours';
import SiteInfo from '../components/SiteInfo';
import HighRisk from '../components/HighRisk';
import Read from '../components/Read';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { fetchRiskAssessment } from '../api';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class SSRAScreen extends React.Component {
  static navigationOptions = {
    title: 'SSRA'
  };

  state = { activeSlide: 0, loading: true, disabled: true };

  componentDidMount = async () => {
    const {
      navigation: {
        state: {
          params: { site_id, SSRAid },
          params
        }
      }
    } = this.props;
    this.props.navigation.addListener('didFocus', () => {
      // console.log('ssra', this.props.navigation.state.params.makeChange);
      if (this.props.navigation.state.params.makeChange === true) {
        this.makeChange();
      }
      // console.log('user has navigated to this screen');
    });

    this.props.navigation.addListener('didBlur', () => {
      // console.log('user has navigated away from this screen');
    });

    const assessment = await fetchRiskAssessment(site_id, SSRAid);
    const sorted = assessment.sort((a, b) => a.question_id - b.question_id);
    const siteInfo = sorted.filter(question => question.question_id <= 3);
    const workingHours = sorted.filter(
      question => question.question_id > 4 && question.question_id <= 10
    );
    const risksGeneral = sorted.filter(
      question => question.question_id > 10 && question.question_id <= 33
    );
    const ppe = sorted.filter(question => question.question_id === 34);
    const additionalInfo = sorted.filter(
      question => question.question_id === 35
    );
    this.setState({
      loading: false,
      siteInfo,
      workingHours,
      risksGeneral,
      ppe,
      additionalInfo
    });
  };

  get pagination() {
    const { activeSlide } = this.state;
    return (
      <Pagination
        dotsLength={6}
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

  makeChange = () => {
    this.setState({ disabled: false });
  };

  submitChanges = () => {};

  render() {
    const {
      loading,
      siteInfo,
      workingHours,
      risksGeneral,
      ppe,
      additionalInfo,
      disabled
    } = this.state;

    const pages = [
      <SiteInfo
        navigation={this.props.navigation}
        siteInfo={siteInfo}
        disabled={disabled}
      />,
      <WorkingHours
        workingHours={workingHours}
        navigation={this.props.navigation}
        disabled={disabled}
      />,
      <Risks
        risksGeneral={risksGeneral}
        navigation={this.props.navigation}
        disabled={disabled}
      />,
      <PPE ppe={ppe} navigation={this.props.navigation} disabled={disabled} />,
      <HighRisk />,
      <Read
        navigation={this.props.navigation}
        additionalInfo={additionalInfo}
        disabled={disabled}
        submitChanges={this.submitChanges}
      />
    ];

    console.log('disabled', this.state.disabled);
    return (
      <React.Fragment>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <React.Fragment>
            <Carousel
              layout={'default'}
              data={pages}
              sliderWidth={SCREEN_WIDTH}
              itemWidth={SCREEN_WIDTH}
              onSnapToItem={index => this.setState({ activeSlide: index })}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {item}
                </View>
              )}
            />
            {this.pagination}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
