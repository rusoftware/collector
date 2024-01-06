import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Dimensions, Pressable, Modal } from 'react-native';
import { Colors } from '../assets/theme';

const WIN = Dimensions.get('window');
const AlbumViewWidth = WIN.width - 56;

const ItemDetails = ({ route }) => {

  const [albumDetails, setAlbumDetails] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);

  const API_DEEZER_ALBUM = 'https://api.deezer.com/album/';

  useEffect(() => {
    if (route.params.itemId) {
      const URL = `${API_DEEZER_ALBUM}${route.params.itemId}`
      
      fetch(URL)
        .then((albumResponse) => albumResponse.json())
        .then((albumJSON) => {
          console.log("////////////////////////////////")
          console.log(JSON.stringify(albumJSON.tracks.data))
          setAlbumDetails(albumJSON)
        })
    }
  },[]);

  const releaseYear = (releaseDate) => {
    const date = new Date(releaseDate);
    const year = date.getFullYear();

    return year;
  };

  const RenderTrack = ({ track, index }) => (
    <View style={ styles.track }>
      <Text style={ styles.albumData }>{ index + 1 }. { track.title }</Text>
    </View>
  )

  return (
    <View style={ styles.itemContainer }>
      <View style={styles.imgContainer}>
        <Image
          style={ styles.albumCover }
          source={{
            uri: albumDetails.cover_medium,
          }}
          resizeMode='cover'
        />
      </View>
      
      <View style={ styles.albumInfo }>
        <Text style={ [styles.albumData, styles.albumTitle ] }>{ albumDetails.title }</Text>
        <Text style={ [styles.albumData, styles.artistName] }>{ albumDetails.artist?.name }, { releaseYear(albumDetails.release_date) }</Text>
      </View>
      
      <FlatList
        style={ styles.trackList }
        data={ albumDetails?.tracks?.data || [] }
        keyExtractor={ (track) => track.id.toString() }
        renderItem={ ({ item, index }) => <RenderTrack track={ item } index={ index } /> }
      />

      <View style={ styles.menuContainer }>
        <Pressable
          onPress={() => setMenuOpen(!menuOpen)}
          style={ styles.menuItemButton }
          >
          <Text style={ styles.openMenuBtn }>Add Album to:</Text>
        </Pressable>

        <Modal
          animationType="slide"
          transparent={true}
          visible={menuOpen}
          onBackdropPress={() => setMenuOpen(false)}
          onRequestClose={() => {
            setMenuOpen(!menuOpen);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable 
                style={ styles.addBtn }>
                <Text style={ styles.addBtnText }>Add Album to Vinyl's Collection</Text>
              </Pressable>
              <Pressable 
                style={ styles.addBtn }>
                <Text style={ styles.addBtnText }>Add Album to Vinyl's Wishlist</Text>
              </Pressable>
              <Pressable
                style={ styles.addBtn }>
                <Text style={ styles.addBtnText }>Add Album to CDs Collection</Text>
              </Pressable>
              <Pressable
                style={ styles.addBtn }>
                <Text style={ styles.addBtnText }>Add Album to CDs Wishlist</Text>
              </Pressable>
              <Pressable
                style={ styles.addBtn }>
                <Text style={ styles.addBtnText }>Add Album to Digital Collection</Text>
              </Pressable>
              <Pressable
                style={ styles.addBtn } onPress={() => setMenuOpen(false)}>
                <Text style={ styles.addBtnText }>Add Album to Digital Wishlist</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.darkGrey,
    paddingBottom: 60
  },
  imgContainer: {
    width: AlbumViewWidth,
    height: AlbumViewWidth,
    marginVertical: 20,
    shadowRadius: 9,
    shadowOffset: 8,
    shadowOpacity: 0.3,
    shadowColor: Colors.blackMamba
  },
  albumCover: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.leadGrey,
  },
  albumInfo: {
    width: AlbumViewWidth,
    borderBottomColor: Colors.pureWhite,
    borderBottomWidth: 1,
    marginBottom: 0,
    paddingBottom: 8
  },
  albumData: {
    color: Colors.ashGrey,
  },
  albumTitle: {
    fontWeight: 'bold',
    fontSize: 18
  },
  artistName: {
    fontWeight: 'bold'
  },
  trackList: {
    width: AlbumViewWidth,
    marginTop: 8
  },
  track: {
    paddingVertical: 15,
    borderBlockColor: Colors.steelGrey,
    borderBottomWidth: 1
  },
  menuContainer: {
    alignSelf: 'flex-end',
    width: '100%',
    //justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.blackCarbon,
    padding: 0,
    marginTop: 8,
    shadowRadius: 12,
    shadowOffset: 8,
    shadowOpacity: 1,
    shadowColor: Colors.blackMamba,
    zIndex: 18,
    position: 'absolute',
    bottom: 0
  },
  menuItemButton: {
    width: WIN.width,
    backgroundColor: Colors.blackCarbon,
    padding: 16,
    alignItems: 'center',
  },
  openMenuBtn: {
    fontWeight: 'bold',
    color: Colors.pureWhite,
    fontSize: 16
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 10,
    backgroundColor: Colors.blackCarbon,
    borderRadius: 20,
    padding: 10,
    alignItems: 'flex-start',
    shadowColor: Colors.blackMamba,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  addBtn: {
    padding: 8,
    paddingVertical: 16,
    marginVertical: 8
  },
  addBtnText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.pureWhite,
  },
});

export default ItemDetails;