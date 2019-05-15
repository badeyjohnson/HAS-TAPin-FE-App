import React from 'react';
import {
  Dimensions,
  Text,
  ScrollView,
  View,
  StyleSheet,
  TextInput
} from 'react-native';
import styled from 'styled-components';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class JobsScreen extends React.Component {
  state = {
    loading: true
  };

  componentDidMount = () => {
    this.setState({ loading: false });
  };

  render() {
    const { loading } = this.state;
    const {
      disabled,
      workingHoursUpdates,
      updateChangesWorkInfo,
      workingHours
    } = this.props;
    const inputs = workingHours.map((option, i) => {
      return {
        id: option.question_id,
        key: option.question,
        value: option.multi_option
      };
    });
    return (
      <React.Fragment>
        {loading ? (
          <Text>loading...</Text>
        ) : (
          <React.Fragment>
            <Container>
              <Titlebar>
                <Title>Working Hours and Fatigue Management</Title>
                <Caption>
                  At no time should employees compromise their safety by
                  driving/working an extended day
                </Caption>
              </Titlebar>
            </Container>
            <ScrollView>
              {inputs.map((item, i) => {
                return (
                  <View key={`view ${i}`} style={styles.container}>
                    <Name key={`text ${i}`}>{item.key}</Name>
                    <Content>
                      <TextInput
                        onChangeText={input =>
                          updateChangesWorkInfo(input, item.id)
                        }
                        multiline={true}
                        editable={disabled}
                        style={styles.mitigate}
                        placeholder={item.value ? item.value : 'N/A'}
                        containerStyle={{ marginVertical: 10 }}
                        keyboardAppearance={'light'}
                        value={workingHoursUpdates[item.id]}
                        returnKeyType={'done'}
                        editable={this.props.disabled}
                        keyboardType={'default'}
                        maxLength={40}
                      />
                    </Content>
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
  height: 115px;
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
  padding-bottom: 10px;
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
