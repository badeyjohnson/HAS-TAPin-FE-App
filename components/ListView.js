import React from 'react';
import { View, FlatList, StyleSheet, Text, Dimensions } from 'react-native';
import Card from './Card';
import RiskCard from './RiskCard';

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    width: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  }
});

const ListView = ({ itemList, navigation, parent }) => (
  <View style={styles.container}>
    {parent === 'Job' ? (
      <FlatList
        data={itemList}
        renderItem={({ item }) => (
          <RiskCard item={item} navigation={navigation} />
        )}
        keyExtractor={item => item.siteId}
      />
    ) : (
      <FlatList
        numColumns={2}
        data={itemList}
        renderItem={({ item }) => (
          <Card
            title={item.jNum}
            description={item.jName}
            navigation={navigation}
          />
        )}
        keyExtractor={item => item.jNum}
      />
    )}
  </View>
);

export default ListView;
