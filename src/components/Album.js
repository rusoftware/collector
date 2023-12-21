import React from 'react';
import { Text, View, Image, StyleSheet } from "react-native";

const Album = ({
  album
}) => {

  return (
    <View style={styles.albumContainer}>
      <Image style={styles.albumCover} source={{uri: album.cover}}/>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{album.album}</Text>
        <Text style={styles.artist}>{album.artist} - {album.year}</Text>
        <View style={styles.ownedFormatsContainer}>
          {Object.entries(album.formats || {}).map(([format, status]) => (
            status === 'owned' && <Text key={format} style={styles.ownedFormat}>{format}</Text>
          ))}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  albumContainer: {
    flexDirection: "row",
    elevation: 4,
    backgroundColor: '#1f2124',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#000',
    padding: 16
  },
  albumCover: {
    width: 60,
    height: 60,
    borderRadius: 4,
    overflow: "hidden"
  },
  detailsContainer: {
    flexDirection: "column",
    marginLeft: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: '#fff'
  },
  artist: {
    fontSize: 14,
    color: '#fff'
  },
  ownedFormatsContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },
  ownedFormat: {
    fontSize: 12,
    marginRight: 8,
    color: '#999',
  },
})

export default Album;