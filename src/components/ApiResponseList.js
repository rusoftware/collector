import { View, Text, Image, FlatList, StyleSheet, Pressable } from "react-native";
import { useNavigation } from '@react-navigation/native';

const ApiResponseList = (data) => {
  console.log(JSON.stringify(data));

  const navigation = useNavigation();
  
  const ListItem = ({ item }) => {
    if (item.type === 'album') {
      return (
      <Pressable style={ styles.apiResponseItem } onPress={() => navigation.navigate("Details", {itemId: item.id})}>
        <Image style={styles.albumCover} source={{uri: item.cover}}/>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.artist}>{item.artist?.name} - {item.id}</Text>
        </View>
      </Pressable>
      )
    }
    else {
      return (<></>)
    }
  }
  
  return (
    <View>
      <FlatList data={data.data} keyExtractor={item => item.id} renderItem={({item}) => (
        <ListItem item={ item } />
      )} />
    </View>
  )
}

const styles = StyleSheet.create({
  apiResponseItem: {
    flexDirection: "row",
    elevation: 4,
    backgroundColor: '#1f2124',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#000',
    padding: 16
  },
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
  }
})

export default ApiResponseList;