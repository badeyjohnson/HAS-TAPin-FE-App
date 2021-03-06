import React from 'react';
import { View, FlatList, StyleSheet, Dimensions } from 'react-native';
import RiskCard from './RiskCard';
import Card from './Card';

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

const ListView = ({ itemList, navigation, parent, jobDetails }) => (
  <View style={styles.container}>
    {parent === 'Job' ? (
      <FlatList
        data={itemList.sort((a, b) => a.created_at < b.created_at)}
        renderItem={({ item }) => (
          <RiskCard
            item={item}
            navigation={navigation}
            jobDetails={jobDetails}
          />
        )}
        keyExtractor={item => `list-item-${item.site_specific_id}`}
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
        keyExtractor={item => `list-item-${item.created_at}`}
      />
    )}
  </View>
);

export default ListView;
