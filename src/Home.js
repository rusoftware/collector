import { View, Text, Pressable, StyleSheet } from "react-native";

const Home = ( {navigation} ) => {
  return (
    <View style={styles.contenedor}>
      <Pressable style={ styles.button } onPress={() => navigation.navigate("Main")}>
        <Text style={ styles.buttonText }>main default</Text>
      </Pressable>
      <Pressable style={ styles.button } onPress={() => navigation.navigate("Main", {
        pageTitle: 'Vinyls Owned',
        qFormat: 'vinyl',
        qStatus: 'owned'
      })}>
        <Text style={ styles.buttonText }>Vinyls Collection</Text>
      </Pressable>
      <Pressable style={ styles.button } onPress={() => navigation.navigate("Main", {
        pageTitle: 'CDs Owned',
        qFormat: 'cd',
        qStatus: 'owned'
      })}>
        <Text style={ styles.buttonText }>CDs Collection</Text>
      </Pressable>
      <Pressable style={ styles.button } onPress={() => navigation.navigate("Main", {
        pageTitle: 'Digital Collection',
        qFormat: 'digital',
        qStatus: 'owned'
      })}>
        <Text style={ styles.buttonText }>Digital Lossless Collection</Text>
      </Pressable>
      <Pressable style={ styles.button } onPress={() => navigation.navigate("Main", {
        pageTitle: 'Vinyls Wishlist',
        qFormat: 'vinyl',
        qStatus: 'wishlist'
      })}>
        <Text style={ styles.buttonText }>vinilos que deseo</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    margin: 14
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white'
  }
})

export default Home;