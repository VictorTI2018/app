import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

export function Header (props)  {

  return (
    <View style={styles.header}>
      {props.children}
      <Text style={styles.header_text}>{props.text}</Text>
    </View>
  );

}

