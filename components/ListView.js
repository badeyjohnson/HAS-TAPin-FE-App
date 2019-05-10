import React from 'react';
import { View, FlatList, StyleSheet, Text, Dimensions } from 'react-native';
import ListRow from './ListRow';

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 0.97,
    width: SCREEN_WIDTH,
    // backgroundColor: 'blue'
  }
});

const ListView = ({ itemList, navigation, parent }) => (
  <View style={styles.container}>
    <FlatList
      data={itemList}
      renderItem={({ item }) =>
        item.jNum ? (
          <ListRow
            title={item.jNum}
            description={item.jName}
            navigation={navigation}
            parent={parent}
          />
        ) : (
          <ListRow
            title={item.riskId}
            description={item.createdAt}
            navigation={navigation}
            parent={parent}
          />
        )
      }
      keyExtractor={item => item.jNum? item.jNum : item.riskId}
    />
  </View>
);

export default ListView;
