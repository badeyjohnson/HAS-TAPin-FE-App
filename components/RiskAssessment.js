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
    const questions = [
      'Is there any potential for slips / trips / falls (open holes / steep slopes etc.)?',
      'Are there any utilities/services in the local vicinity that may affect the work being undertaken? Consider whether a utilities survey is required.',
      'Could there be other activities on site that could impact on the health, safety and/or wellbeing of staff visiting site, e.g. excavations, demolition, moving vehicles, farm activities, interaction with members of public etc.?'
    ];
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
    const options = [
      {
        label: 'Yes',
        value: 'Y'
      },
      {
        label: 'No',
        value: 'N'
      },
      {
        label: 'N/A',
        value: 'na'
      }
    ];
    const levels = [
      {
        label: 'Low',
        value: 'L'
      },
      {
        label: 'Medium',
        value: 'M'
      },
      {
        label: 'High',
        value: 'H'
      }
    ];
    return (
      <React.Fragment>
        {loading ? (
          <Text>loading...</Text>
        ) : (
          <React.Fragment>
            <Container>
              <Titlebar>
                <Title>Risk Assessment</Title>
                <Caption>General Questions</Caption>
              </Titlebar>
            </Container>
            <ScrollView>
              {checkboxes.map((item, key) => {
                return (
                  <View key={`view ${key}`} style={styles.container}>
                    <Name key={`text ${key}`}>{item.key}</Name>
                    <RadioForm
                      radio_props={options}
                      initial={options.findIndex(
                        option => option.value === item.value
                      )}
                      formHorizontal={true}
                      labelHorizontal={false}
                      buttonColor={'#394385'}
                      selectedButtonColor={'#394385'}
                      onPress={itemValue =>
                        this.onCheckChanged(itemValue, item.id)
                      }
                      disabled={disabled}
                    />
                    {item.value === 'Y' && (
                      <Content>
                        <Caption>Mitigation Measures: </Caption>
                        <TextInput
                          multiline={true}
                          editable={disabled}
                          style={styles.mitigate}
                          value={'many, many things need to happen'}
                        />
                        <Text>{'\n'}</Text>
                        <Caption>Residual Risk Level: </Caption>
                        <RadioForm
                          radio_props={levels}
                          initial={levels.findIndex(
                            level => level.value === item.risk
                          )}
                          formHorizontal={true}
                          labelHorizontal={false}
                          buttonColor={'#394385'}
                          selectedButtonColor={'#394385'}
                          onPress={itemValue =>
                            this.onLevelChanged(itemValue, item.id)
                          }
                          disabled={disabled}
                        />
                      </Content>
                    )}

                    <Text>{'\n'}</Text>
                  </View>
                );
              })}
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
    alignContent: 'center'
  },
  mitigate: {
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: '#394385',
    borderRadius: 4,
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
  height: 115px;
  width: ${SCREEN_WIDTH - 50};
  border-radius: 14px;
  margin: 10px;
  margin-top: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
  align-items: center;
  align-content: center;
  justify-content: center;
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
  padding-top: 10px;
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
  margin-bottom: 5px;
  padding: 5px;
`;
