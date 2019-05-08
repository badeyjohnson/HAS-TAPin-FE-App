import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import ListRow from './ListRow';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const ListView = ({ itemList }) => (
  <View style={styles.container}>
  
    <FlatList
      data={itemList}
      renderItem={({ item }) => (
          
        <ListRow title={item.jNum} description={item.jName} />
      )}
    />
  </View>
);

export default ListView;
