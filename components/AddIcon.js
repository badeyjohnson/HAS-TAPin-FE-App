import React from 'react';
import { Platform } from 'react-native';
import { Icon } from 'expo';

export default class AddIcon extends React.Component {
  render() {
    return (
      <Icon.Ionicons
        name={Platform.OS === 'ios' ? 'ios-add-circle' : 'md-add-circle'}
        size={26}
        style={{ marginBottom: -3, marginRight: 20, color: 'white' }}
        raised={true}
        reverse
      />
    );
  }
}
