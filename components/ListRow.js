import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
    width: 320,
    borderRadius: 5,
    backgroundColor: '#FFF',
    elevation: 2
  },
  title: {
    fontSize: 16,
    color: 'red'
  },
  container_text: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: '#d6d7da'
  },
  description: {
    fontSize: 11,
    fontStyle: 'italic'
  },
  photo: {
    height: 50,
    width: 50
  }
});

const ListRow = ({ title, description, navigation, parent }) => (
  <View style={styles.container}>
    <View style={styles.container_text}>
      <Text
        style={styles.title}
        onPress={() => 
          navigation.navigate(parent === 'Home' ? 'Job' : 'SSRA', title)
        }
      >
        {title}
      </Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  </View>
);

export default ListRow;
