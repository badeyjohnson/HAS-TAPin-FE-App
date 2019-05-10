import React from 'react';
import styled from 'styled-components';
import { Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Card = ({ item }) => (
  <Container>
    <Content>
      <Titlebar>
        <Avatar source={require('../images/avatar.png')} />
        <Title>Welcome back,</Title>
        <Name>
          Created by:{item.createdAt}, Created at:{item.createdBy}
        </Name>
      </Titlebar>
    </Content>
  </Container>
);

export default Card;

const Container = styled.View`
  background: #fff;
  height: 115px;
  width: ${SCREEN_WIDTH - 50};
  border-radius: 14px;
  margin: 18px;
  margin-top: 18px;
  margin-bottom: 15px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
  align-items: center;
  align-content: center;
`;

const Content = styled.View`
  padding-top: 10px;
  flex-direction: column;
  align-items: center;
  height: 60px;
`;

// const Title = styled.Text`
//   color: #3c4560;
//   font-size: 20px;
//   font-weight: 600;
// `;

const Titlebar = styled.View`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 5px;
  padding-left: 80px;
  background: #fff;
`;

const Avatar = styled.Image`
  width: 44px;
  height: 44px;
  background: black;
  border-radius: 22px;
  margin-left: 20px;
  position: absolute;
  top: 0;
  left: 0;
`;

const Name = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
`;
