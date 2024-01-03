import { View, Text, StyleSheet } from 'react-native';

const ItemDetails = ({ route }) => {

  //const API_ALBUM = 'https://api.deezer.com/album/';
  
  return (
    <View style={styles.itemContainer}>
      <Text>Item Details - {route.params.itemId}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default ItemDetails;