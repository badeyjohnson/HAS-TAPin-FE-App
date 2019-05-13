import React from 'react';
import { Dimensions, View } from 'react-native';
import PPE from '../components/PPE';
import Risks from '../components/RiskAssessment';
import WorkingHours from '../components/WorkingHours';
import SiteInfo from '../components/SiteInfo';
import HighRisk from '../components/HighRisk';
import Read from '../components/Read';
import Carousel, { Pagination } from 'react-native-snap-carousel';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class SSRAScreen extends React.Component {
  static navigationOptions = {
    title: 'SSRA'
  };
  state = { activeSlide: 0, entries: { test: 1 } };
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

  render() {
    const pages = [
      <SiteInfo />,
      <WorkingHours />,
      <Risks />,
      <PPE />,
      <HighRisk />,
      <Read navigation={this.props.navigation} />
    ];
    return (
      <React.Fragment>
        <Carousel
          layout={'default'}
          data={pages}
          sliderWidth={SCREEN_WIDTH}
          itemWidth={SCREEN_WIDTH}
          onSnapToItem={index => this.setState({ activeSlide: index })}
          renderItem={({ item }) => (
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
    );
  }
}
