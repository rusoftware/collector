import React from 'react';
import { Text, StyleSheet } from "react-native";

const Label = (groupKey) => {
  return <Text style={styles.label}>{groupKey.groupKey}</Text>
}

const styles = StyleSheet.create({
  label: {
    backgroundColor: '#393d42',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff'
  }
})

export default Label;