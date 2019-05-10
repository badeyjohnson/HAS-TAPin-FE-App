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

const ListView = ({ itemList, navigation }) => (
  <View style={styles.container}>
    <FlatList
      data={itemList}
      renderItem={({ item }) => (
        <ListRow
          title={item.jNum}
          description={item.jName}
          navigation={navigation}
        />
      )}
      keyExtractor={item => item.jNum}
    />
  </View>
);

export default ListView;
