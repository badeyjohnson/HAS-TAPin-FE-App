import React from 'react';
import {
  Dimensions,
  Text,
  ScrollView,
  Switch,
  View,
  StyleSheet,
  Picker,
  TextInput
} from 'react-native';
import styled from 'styled-components';
import RNPickerSelect from 'react-native-picker-select';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from 'react-native-simple-radio-button';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class JobsScreen extends React.Component {
  state = {
    checkboxes: [],
    loading: true,
    disabled: false
  };

  componentDidMount = () => {
    // api call
    const questions = ['Site description', 'Date of site visit'];
    const checkboxes = questions.map((option, i) => {
      return { id: i, key: option, value: 'Y', risk: 'L' };
    });
    this.setState({ checkboxes, loading: false });
  };

  onCheckChanged(val, id) {
    const { checkboxes } = this.state;
    const index = checkboxes.findIndex(x => x.id === id);
    checkboxes[index].value = val;
    this.setState(checkboxes);
  }

  onLevelChanged(val, id) {
    const { checkboxes } = this.state;
    const index = checkboxes.findIndex(x => x.id === id);
    checkboxes[index].risk = val;
    this.setState(checkboxes);
  }

  render() {
    const { checkboxes, loading, disabled } = this.state;
    return (
      <React.Fragment>
        {loading ? (
          <Text>loading...</Text>
        ) : (
          <React.Fragment>
            <Container>
              <Titlebar>
                <Title>High Risk Activities</Title>
                <Caption>
                  Where a site visit involves one or more activities that could
                  potentially be ‘high risk’ then these will require more
                  comprehensive risk assessment than for other, lower-risk work.
                  Examples of high-risk activities include:
                </Caption>
              </Titlebar>
            </Container>
            <ScrollView>
              <Content>
                <Name>Examples of high-risk activities include:</Name>
                <Caption>
                  Working near Asbestos-containing Materials/Soil
                </Caption>
                <Caption>Working at Height (incl. MEWPS etc.)</Caption>
                <Caption>Working on or alongside Railways</Caption>
                <Caption>Working in Confined Areas Ionising Radiations</Caption>
                <Caption>Working on or near Contaminated Sites</Caption>
                <Caption>Proximity to Live Animals, Flora, Fauna</Caption>
                <Caption>
                  Working in or near Derelict Buildings Lone Working
                </Caption>
                <Caption>Working on or alongside Roads/Highways</Caption>
                <Caption>Working and/or Travelling Internationally</Caption>
                <Caption>Working with Electricity</Caption>
                <Caption>Working at Night</Caption>
                <Caption>Working on, in, above or alongside Water</Caption>
                <Caption>Ground Investigation</Caption>
                <Caption>Pro Bono / Community Engagement work</Caption>
              </Content>
            </ScrollView>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: SCREEN_WIDTH - 50,
    flexDirection: 'column',
    alignContent: 'center',
    padding: 50
  },
  mitigate: {
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: '#394385',
    borderRadius: 4
  },
  measureContain: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: SCREEN_WIDTH - 50
  }
});

const Container = styled.View`
  background: #fff;
  height: 110px;
  width: ${SCREEN_WIDTH - 50};
  border-radius: 14px;
  margin: 10px;
  margin-top: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
  align-items: flex-start;
  align-content: flex-start;
  justify-content: flex-start;
`;

const Titlebar = styled.View`
  width: 100%;
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 5px;
  background: #fff;
  align-items: center;
  align-content: center;
  justify-content: center;
`;

const Content = styled.View`
  padding: 10px;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
`;

const Title = styled.Text`
  color: #3c4560;
  font-size: 20px;
  font-weight: 600;
`;

const Caption = styled.Text`
  color: #b8b3c3;
  font-size: 12px;
  font-weight: 600;
  margin: 4px;
`;

const Name = styled.Text`
  font-size: 15px;
  color: #3c4560;
  font-weight: bold;
  padding: 5px;
`;
