import React from 'react';
import { Dimensions, View, Text, ActivityIndicator } from 'react-native';
import PPE from '../components/PPE';
import Risks from '../components/RiskAssessment';
import WorkingHours from '../components/WorkingHours';
import SiteInfo from '../components/SiteInfo';
import HighRisk from '../components/HighRisk';
import Read from '../components/Read';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { answerConvertor, riskLevelConvertor } from '../utils/utils';
import { fetchRiskAssessment, updateRiskAssessment } from '../api';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class SSRAScreen extends React.Component {
  static navigationOptions = {
    title: 'SSRA'
  };

  state = {
    activeSlide: 0,
    loading: true,
    disabled: true,
    siteInfoUpdates: {},
    workingHoursUpdates: {},
    risksUpdates: {},
    additionalInfoUpdate: ''
  };

  componentDidMount = async () => {
    const {
      navigation: {
        state: {
          params: { site_id, SSRAid }
        }
      }
    } = this.props;

    this.props.navigation.addListener('didFocus', () => {
      if (this.props.navigation.state.params.makeChange === true) {
        this.makeChange();
      }
    });
    this.props.navigation.addListener('didBlur', () => {});
    const assessment = await fetchRiskAssessment(site_id, SSRAid);
    const sorted = assessment.sort((a, b) => a.question_id - b.question_id);
    const siteInfo = sorted.filter(question => question.question_id <= 3);
    const siteInfoUpdates = { ...this.state.siteInfoUpdates };
    siteInfo.map(info => {
      siteInfoUpdates[`${info.question_id}`] = '';
    });
    const workingHours = sorted.filter(
      question => question.question_id >= 4 && question.question_id <= 10
    );
    const workingHoursUpdates = { ...this.state.siteInfoUpdates };
    workingHours.map(info => {
      workingHoursUpdates[`${info.question_id}`] = '';
    });
    const risksGeneral = sorted.filter(
      question => question.question_id > 10 && question.question_id <= 33
    );
    const risksUpdates = { ...this.state.risksUpdates };
    risksGeneral.map(info => {
      risksUpdates[`${info.question_id}`] = {
        mitigate: '',
        answer: '',
        risk: ''
      };
    });
    const ppe = sorted.filter(question => question.question_id === 34);
    const additionalInfo = sorted.filter(
      question => question.question_id === 35
    );
    const required = JSON.parse(ppe[0].multi_option);
    const options = [
      'Safety helmet',
      'Safety boots',
      'Safety wellington boots',
      'Boiler suit / overalls',
      'Gloves',
      'High visibility trousers (Yellow)',
      'High visibility jacket / vest (Yellow)',
      'High visibility trousers (Orange)',
      'High visibility jacket / vest (Orange)',
      'Goggles / visor / safety glasses',
      'Hearing protection (ear plugs)',
      'Ear defenders (safety helmet)',
      'First aid kit',
      'Disinfectant hand wipes/gel',
      'Respiratory protection',
      'Mobile phone',
      'Satellite phone',
      'Torch + spare batteries',
      'Head torch + spare batteries',
      'Four-point chin strap'
    ];
    const checkboxes = options.map((option, i) => {
      return { id: i, key: option, checked: false };
    });
    checkboxes.forEach(item => {
      if (required.includes(item.key)) item.checked = true;
    });
    this.setState({
      loading: false,
      siteInfo,
      workingHours,
      risksGeneral,
      ppe,
      additionalInfo,
      siteInfoUpdates,
      workingHoursUpdates,
      checkboxes,
      risksUpdates
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
  updateChangesSiteInfo = (input, id) => {
    this.setState({
      siteInfoUpdates: { ...this.state.siteInfoUpdates, [id]: input }
    });
  };
  updateChangesWorkInfo = (input, id) => {
    this.setState({
      workingHoursUpdates: { ...this.state.workingHoursUpdates, [id]: input }
    });
  };
  updateRisks = (input, id) => {
    const risksUpdates = { ...this.state.risksUpdates };
    risksUpdates[id]['mitigate'] = input;
    this.setState({ risksUpdates });
  };
  updateAdditionalInfo = input => {
    this.setState({
      additionalInfoUpdate: input
    });
  };
  onCheckChanged = id => {
    const { checkboxes } = this.state;
    const index = checkboxes.findIndex(x => x.id === id);
    checkboxes[index].checked = !checkboxes[index].checked;
    this.setState(checkboxes);
  };
  onChangeSelection = (val, id) => {
    const risksUpdates = { ...this.state.risksUpdates };
    risksUpdates[id]['answer'] = val;
    this.setState(risksUpdates);
  };
  onLevelChanged = (val, id) => {
    const risksUpdates = { ...this.state.risksUpdates };
    risksUpdates[id]['risk'] = val;
    this.setState(risksUpdates);
  };
  submitChanges = () => {
    const {
      navigation: {
        state: {
          params: { site_id, email }
        }
      }
    } = this.props;
    const {
      additionalInfoUpdate,
      additionalInfo,
      siteInfo,
      siteInfoUpdates,
      workingHoursUpdates,
      workingHours,
      checkboxes,
      risksGeneral,
      risksUpdates
    } = this.state;

    const site = siteInfo.map(info => {
      return {
        question_id: info.question_id,
        multi_option:
          siteInfoUpdates[info.question_id].length > 0
            ? siteInfoUpdates[info.question_id]
            : info.multi_option
      };
    });
    const working = workingHours.map(info => {
      return {
        question_id: info.question_id,
        multi_option:
          workingHoursUpdates[info.question_id].length > 0
            ? workingHoursUpdates[info.question_id]
            : info.multi_option
      };
    });

    let ppeUpdate = [];
    checkboxes.forEach(info => {
      if (info.checked) ppeUpdate.push(info.key);
    });

    const risks = risksGeneral.map(info => {
      return {
        question_id: info.question_id,
        risk_level:
          risksUpdates[info.question_id].risk.length > 0
            ? riskLevelConvertor(risksUpdates[info.question_id].risk)
            : riskLevelConvertor(info.risk),
        answers_options:
          risksUpdates[info.question_id].answer.length > 0
            ? answerConvertor(risksUpdates[info.question_id].answer)
            : answerConvertor(info.answer),
        mitigation_Measures:
          risksUpdates[info.question_id].mitigate.length > 0
            ? risksUpdates[info.question_id].mitigate
            : info.mitigation_Measures
      };
    });

    const addt = {
      question_id: 35,
      multi_option:
        additionalInfoUpdate.length > 0
          ? additionalInfoUpdate
          : additionalInfo.multi_option
    };

    const update = {
      email,
      response: [
        ...site,
        ...working,
        ...risks,
        { question_id: 34, multi_option: JSON.stringify(ppeUpdate) },
        addt
      ]
    };

    updateRiskAssessment(site_id, update);
  };

  render() {
    const {
      loading,
      siteInfo,
      workingHours,
      risksGeneral,
      ppe,
      additionalInfo,
      disabled,
      siteInfoUpdates,
      risksUpdates,
      workingHoursUpdates,
      additionalInfoUpdate,
      checkboxes
    } = this.state;

    const pages = [
      <SiteInfo
        navigation={this.props.navigation}
        siteInfo={siteInfo}
        disabled={disabled}
        updateChangesSiteInfo={this.updateChangesSiteInfo}
        siteInfoUpdates={siteInfoUpdates}
      />,
      <WorkingHours
        workingHours={workingHours}
        navigation={this.props.navigation}
        disabled={disabled}
        workingHoursUpdates={workingHoursUpdates}
        updateChangesWorkInfo={this.updateChangesWorkInfo}
      />,
      <Risks
        risksGeneral={risksGeneral}
        navigation={this.props.navigation}
        disabled={disabled}
        updateRisks={this.updateRisks}
        risksUpdates={risksUpdates}
        onChangeSelection={this.onChangeSelection}
        onLevelChanged={this.onLevelChanged}
      />,
      <PPE
        ppe={ppe}
        navigation={this.props.navigation}
        disabled={disabled}
        checkboxes={checkboxes}
        onCheckChanged={this.onCheckChanged}
      />,
      <HighRisk />,
      <Read
        navigation={this.props.navigation}
        additionalInfo={additionalInfo}
        disabled={disabled}
        submitChanges={this.submitChanges}
        updateAdditionalInfo={this.updateAdditionalInfo}
        additionalInfoUpdate={additionalInfoUpdate}
      />
    ];
    return (
      <React.Fragment>
        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#9a9ce8" />
          </View>
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
