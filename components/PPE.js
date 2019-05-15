import React from 'react';
import {
  Dimensions,
  Text,
  ScrollView,
  Switch,
  View,
  StyleSheet, ActivityIndicator
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
    const { disabled, checkboxes, onCheckChanged } = this.props;
    const { loading } = this.state;
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
                <Title>Personal Protective Equipment</Title>
                <Caption>Equipment Required on Site</Caption>
              </Titlebar>
            </Container>
            <ScrollView>
              {checkboxes.map((item, key) => {
                return (
                  <View key={`view ${key}`} style={styles.background}>
                    <Switch
                      key={`switch ${key}`}
                      value={item.checked}
                      onValueChange={() => onCheckChanged(item.id)}
                      disabled={disabled}
                    />
                    <Text>{'    '}</Text>
                    <Text key={`text ${key}`}>{item.key}</Text>
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
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: SCREEN_WIDTH - 50,
    padding: 10,
    flexDirection: 'row',
    alignContent: 'center'
  }, loader: {
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
  height: 60px;
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
  font-size: 15px;
  font-weight: 600;
  margin-top: 4px;
`;

const Name = styled.Text`
  font-size: 15px;
  color: #3c4560;
  font-weight: bold;
`;
