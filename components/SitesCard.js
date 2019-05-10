import React from 'react';
import styled from 'styled-components';
import { Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Card = ({ jobDetails }) => (
  <Container>
    <Content>
      <Title>Job Name:{jobDetails.job_name}</Title>
      <Caption>
        PM Name:{jobDetails.pm_first_name} {jobDetails.pm_last_name}
      </Caption>
      <Caption>PM Email:{jobDetails.pm_email}</Caption>
      <Caption>PM Contact No:{jobDetails.pm_number}</Caption>
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
