import React from 'react';
import { Text, View, Image, StyleSheet } from "react-native";
import { Colors } from '../assets/theme';

const AlbumListItem = ({
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
    backgroundColor: Colors.darkGrey,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.blackMamba,
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
    color: Colors.pureWhite,
  },
  artist: {
    fontSize: 14,
    color: Colors.pureWhite,
  },
  ownedFormatsContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },
  ownedFormat: {
    fontSize: 12,
    marginRight: 8,
    color: Colors.slateGrey,
  },
})

export default AlbumListItem;