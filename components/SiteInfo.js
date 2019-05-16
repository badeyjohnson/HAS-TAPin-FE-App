import React from 'react';
import {
  Dimensions,
  Text,
  ScrollView,
  View,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView
} from 'react-native';
import styled from 'styled-components';
import { Input, Button, Icon } from 'react-native-elements';

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
      siteInfo,
      disabled,
      siteInfoUpdates,
      updateChangesSiteInfo
    } = this.props;
    const inputs = siteInfo.map((option, i) => {
      return {
        id: option.question_id,
        key: option.question,
        value: option.multi_option
      };
    });
    return (
      <React.Fragment>
        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#9a9ce8" />
          </View>
        ) : (
          <React.Fragment>
            <Container>
              <Titlebar>
                <Title>Site-Specific Risk Assessment</Title>
                <Caption>
                  Work through it carefully and make sure that the information
                  you enter is correct. Remember that new risks may appear as
                  works develop so do not just ‘copy and paste’ for successive
                  visits. Consider what has changed and where updates are
                  needed. If you require any further information/guidance please
                  contact your local site guidance engineer or a member of the
                  Health and Safety team.
                </Caption>
              </Titlebar>
            </Container>
            <ScrollView>
              <KeyboardAvoidingView
                behavior={'position'}
                keyboardVerticalOffset={-100}
                enabled
              >
                {inputs.map((item, i) => {
                  return (
                    <View key={`view ${i}`} style={styles.container}>
                      <Name key={`text ${i}`}>{item.key}</Name>
                      <Content>
                        <TextInput
                          onChangeText={input =>
                            updateChangesSiteInfo(input, item.id)
                          }
                          multiline={true}
                          placeholder={item.value ? item.value : 'N/A'}
                          containerStyle={{ marginVertical: 10 }}
                          style={styles.mitigate}
                          keyboardAppearance={'light'}
                          editable={!disabled}
                          value={siteInfoUpdates[item.id]}
                          returnKeyType={'done'}
                          keyboardType={'default'}
                          maxLength={40}
                        />
                      </Content>
                      <Text>{'\n'}</Text>
                    </View>
                  );
                })}
              </KeyboardAvoidingView>
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
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    width: SCREEN_WIDTH
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    width: SCREEN_WIDTH
  }
});

const Container = styled.View`
  background: #fff;
  height: 160px;
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
  width: 90%;
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
  margin-bottom: 5px;
  padding: 5px;
`;
