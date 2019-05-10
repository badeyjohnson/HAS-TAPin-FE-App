import React from 'react';
import { View, FlatList, StyleSheet, Text, Dimensions } from 'react-native';
import Card from './Card';

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexWrap: 'wrap',
    width: SCREEN_WIDTH,
    backgroundColor: 'white'
  }
});

const ListView = ({ itemList, navigation, parent }) => (
  <View style={styles.container}>
    <FlatList
      numColumns={2}
      data={itemList}
      renderItem={({ item }) => (
        <Card title={item.jNum} description={item.jName} navigation={navigation}/>
      )}
      keyExtractor={item => item.jNum}
    />
  </View>
);

export default ListView;
