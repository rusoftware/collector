import React from 'react';
import { View, FlatList, Pressable, Text, StyleSheet } from "react-native";
import Album from './Album';
import Label from './Label';

import { useNavigation } from '@react-navigation/native';

const AlbumsList = ({
  albums, status
}) => {

  const navigation = useNavigation();

  const handleNavigate = (pFormat) => {
    navigation.navigate('Main', {qFormat: pFormat, qStatus: status});
  };
  
  const formattedData = Object.entries(albums).map(([groupKey, albums]) => ({
    groupKey,
    albums: albums.sort((a, b) => a.year - b.year),
  }));

  formattedData.sort((a, b) => a.groupKey.localeCompare(b.groupKey));

  const FooterMenu = () => {
    return (
      <View style={styles.bottomNavigation}>
        <Pressable
          style={styles.formatButton}
          onPress={() => handleNavigate('vinyl')}
          >
            <Text style={styles.formatButtonText}>Vinyl</Text>
        </Pressable>
        <Pressable
          style={styles.formatButton}
          onPress={() => handleNavigate('cd')}
          >
            <Text style={styles.formatButtonText}>CDs</Text>
        </Pressable>
        <Pressable
          style={styles.formatButton}
          onPress={() => handleNavigate('digital')}
          >
            <Text style={styles.formatButtonText}>Digi</Text>
        </Pressable>
        <Pressable
          style={[styles.formatButton, styles.noBorder]}
          onPress={() => handleNavigate('')}
          >
            <Text style={styles.formatButtonText}>All</Text>
        </Pressable>
      </View>
    )
  }

  return (
    <>
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
      <FooterMenu />
    </>
  )
}

const styles = StyleSheet.create({
  bottomNavigation: {
    backgroundColor: '#171718',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    paddingHorizontal: 0
  },
  formatButton: {
    paddingVertical: 12,
    flex: 1,
    marginHorizontal: 4,
    borderRightWidth: 1,
    borderColor: '#9fa3a9'
  },
  noBorder: {
    borderRightWidth: 0
  },
  formatButtonText: {
    textAlign: 'center',
    color: '#9fa3a9',
    fontWeight: 'bold',
    fontSize: 16
  }
})

export default AlbumsList;