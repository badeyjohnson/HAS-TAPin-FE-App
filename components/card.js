import React from 'react';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';

const Card = ({ title, description, navigation }) => (
  <Container>
    <TouchableOpacity onPress={() => navigation.navigate('Job', title)}>
      <React.Fragment>
        <Cover>
          <Image source={require('../images/building.jpg')} />
        </Cover>
        <Content>
          <Title>{title}</Title>
          <Caption>{description}</Caption>
        </Content>
      </React.Fragment>
    </TouchableOpacity>
  </Container>
);

export default Card;

const Container = styled.View`
  background: #fff;
  height: 200px;
  width: 150px;
  border-radius: 14px;
  margin: 18px;
  margin-top: 15px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
`;

const Cover = styled.View`
  width: 100%;
  height: 120px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  overflow: hidden;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
`;

const Content = styled.View`
  padding-top: 10px;
  flex-direction: column;
  align-items: center;
  height: 60px;
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
