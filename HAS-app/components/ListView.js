import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import ListRow from './ListRow';

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    marginLeft: 0
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
