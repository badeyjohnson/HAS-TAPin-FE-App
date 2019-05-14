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
    checkboxes: [],
    loading: true,
    disabled: false
  };

  componentDidMount = () => {
    const { siteInfo } = this.props;
    const checkboxes = siteInfo.map((option, i) => {
      return { id: i, key: option.question, value: option.multi_option };
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
              {checkboxes.map((item, key) => {
                return (
                  <View key={`view ${key}`} style={styles.container}>
                    <Name key={`text ${key}`}>{item.key}</Name>
                    <Content>
                      <TextInput
                        multiline={true}
                        editable={disabled}
                        style={styles.mitigate}
                        value={item.value}
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
  height: 160px;
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
