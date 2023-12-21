import React from 'react';
import { View, FlatList } from "react-native";
import Album from './Album';
import Label from './Label';

const AlbumsList = ({
  albums
}) => {
  
  const formattedData = Object.entries(albums).map(([groupKey, albums]) => ({
    groupKey,
    albums: albums.sort((a, b) => a.year - b.year),
  }));

  formattedData.sort((a, b) => a.groupKey.localeCompare(b.groupKey));

  return (
    <FlatList data={formattedData} keyExtractor={(item => item.groupKey)} renderItem={({item}) => (
      <View>
        <Label groupKey={item.groupKey} />
        <FlatList
          data={item.albums}
          keyExtractor={(album, index) => `${album.title}-${index}`}
          renderItem={({ item: album }) => (
            <Album album={album}></Album>
          )} />
      </View>
    )} />
  )
}

export default AlbumsList;