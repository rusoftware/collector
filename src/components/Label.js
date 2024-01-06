import React from 'react';
import { Text, StyleSheet } from "react-native";
import { Colors } from '../assets/theme';

const Label = (groupKey) => {
  return <Text style={styles.label}>{groupKey.groupKey}</Text>
}

const styles = StyleSheet.create({
  label: {
    backgroundColor: Colors.steelGrey,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.pureWhite
  }
})

export default Label;