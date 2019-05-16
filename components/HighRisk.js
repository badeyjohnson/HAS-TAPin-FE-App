import React from 'react';
import {
  Dimensions,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  View
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
  height: 115px;
  width: ${SCREEN_WIDTH - 70};
  border-radius: 14px;
  margin: 10px;
  margin-top: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
  align-items: center;
  align-content: center;
  justify-content: center;
`;

const Titlebar = styled.View`
  width: 85%;
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
