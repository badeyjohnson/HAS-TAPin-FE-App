import React from 'react';
import styled from 'styled-components';
import { Dimensions, TouchableOpacity } from 'react-native';
import dateConverter from '../utils/utils';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Card = ({ item, navigation }) => (
  <Container>
    <TouchableOpacity onPress={() => navigation.navigate('SSRA', '')}>
      <Content>
        <Titlebar>
          <Avatar source={require('../images/avatar.png')} />
          <Title>Site Specfic Risk Register</Title>
          <Name>Site: {item.site_name}</Name>
          <Caption>Created at: {dateConverter(item.created_at)}</Caption>
          <Caption>Created by: {item.user.split('.')[0]}</Caption>
        </Titlebar>
      </Content>
    </TouchableOpacity>
  </Container>
);

export default Card;

const Container = styled.View`
  background: #fff;
  height: 100px;
  width: ${SCREEN_WIDTH - 50};
  border-radius: 14px;
  margin: 18px;
  margin-top: 18px;
  margin-bottom: 15px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
  align-items: flex-start;
  align-content: flex-start;
  justify-content: flex-start;
`;

const Content = styled.View`
  padding-top: 10px;
  padding-bottom: 10px;
  flex-direction: column;
  margin-bottom: 10px;
  height: 100px;
  overflow: hidden;
  margin-left: 30px;
`;

const Title = styled.Text`
  color: #3c4560;
  font-size: 15px;
  font-weight: 600;
`;

const Titlebar = styled.View`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 5px;
  padding-left: 80px;
  background: #fff;
`;

const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  background: black;
  border-radius: 22px;
  margin-left: 10px;
  position: absolute;
  top: 0;
  left: 0;
`;

const Name = styled.Text`
  font-size: 12px;
  color: #3c4560;
  font-weight: bold;
`;

const Caption = styled.Text`
  color: #b8b3c3;
  font-size: 12px;
  font-weight: 600;
  margin-top: 4px;
`;
