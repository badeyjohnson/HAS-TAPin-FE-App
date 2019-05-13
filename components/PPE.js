import React from 'react';
import {
  Dimensions,
  Text,
  ScrollView,
  Switch,
  View,
  StyleSheet
} from 'react-native';
import styled from 'styled-components';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class JobsScreen extends React.Component {
  state = {
    loading: true,
    disabled: true
  };

  componentDidMount = () => {
    // api call
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
    this.setState({ checkboxes, loading: false });
  };
  onCheckChanged(id) {
    const { checkboxes } = this.state;
    const index = checkboxes.findIndex(x => x.id === id);
    checkboxes[index].checked = !checkboxes[index].checked;
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
                      onValueChange={() => this.onCheckChanged(item.id)}
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
    // backgroundColor: 'green',
    width: SCREEN_WIDTH - 50,
    padding: 10,
    flexDirection: 'row',
    alignContent: 'center'
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
