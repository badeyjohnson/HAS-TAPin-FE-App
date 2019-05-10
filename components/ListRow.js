import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import {
  Card,
  ListItem,
  Button,
  Icon,
  Avatar,
  ThemeProvider
} from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  card: {
    // flexWrap: 'wrap',
    // flex: 1,
    // flexDirection: 'row',
    padding: 5,
    width: SCREEN_WIDTH,
    borderRadius: 15,
    elevation: 5
  },
  titleBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'space-between',
    width: SCREEN_WIDTH - 12
  },
  title: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
    marginBottom: 10
  },
  text: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 15,
    marginBottom: 10
  }
});
const theme = {
  Button: {
    raised: true,
    backgroundColor: '#696eb4'
  }
};

const ListRow = ({ title, description, navigation }) => (
  <Card title={title} description={description} />
);

export default ListRow;
