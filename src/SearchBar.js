import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, View, Keyboard, Text, Pressable } from "react-native";
import { Colors } from "./assets/theme";
import { Feather, Entypo } from "@expo/vector-icons";
import ApiResponseList from "./components/ApiResponseList";

const SearchBar = () => {

  const [clicked, setClicked] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState('');
  const [searchBy, setSearchBy] = useState('album');
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // LastFM (requires api-key)
  // import { LastFM_API_KEY } from "@env";
  // const API_URL = 'https://ws.audioscrobbler.com/2.0/';
  // example: https://ws.audioscrobbler.com/2.0/?method=album.search&album=believe&api_key=${LastFM_API_KEY}&format=json
  ///////////////

  // Deezer
  const API_URL_SEARCH = 'https://api.deezer.com/search/';

  /* - Enable to implement Search By ARTIST switcher
  const switchSearchMode = () => {
    if (searchBy === 'album') {
      setSearchBy('artist')
    }
    else {
      setSearchBy('album')
    }
  }
  */

  const search = () => {
    if (searchPhrase) {
      const url = `${ API_URL_SEARCH }${searchBy}?q=${searchPhrase}`;
      fetch (url)
        .then((result) => result.json())
        .then((json) => {
          setData(json.data)
          
          /* - Enable to implement Search By ARTIST switcher
          if (searchBy === 'album') {
            setData(json.data)
          }
          else {
            console.log('search albums by artist')
          }
          */
        })
    }
    else {
      console.log("Search is Empty");
    }
  }

  return (
    <>
      <View style={styles.searchBoxContainer}>
        <View
          style={
            clicked
              ? styles.searchBar__clicked
              : styles.searchBar__unclicked
          }
        >
          <Pressable onPress={() => search()}>
            <Feather
              name="search"
              size={20}
              color="black"
              style={{ marginLeft: 6 }}
            />
          </Pressable>
          <TextInput
            style={styles.input}
            placeholder={`Search by ${searchBy}`}
            value={searchPhrase}
            onChangeText={setSearchPhrase}
            returnKeyLabel="search"
            returnKeyType="search"
            autoCorrect={false}
            onFocus={() => {
              setClicked(true);
            }}
            onSubmitEditing={() => search()}
          />
          {clicked && (
            <Entypo name="cross" size={20} color="black" style={{ paddingHorizontal: 6 }} onPress={() => {
                setSearchPhrase('')
            }}/>
          )}
        </View>

        {clicked && (
          <Pressable onPress={() => {
            Keyboard.dismiss();
            setSearchPhrase('');
            setClicked(false);
          }} style={ styles.cancelBtnContainer }>
            <Text style={ styles.cancelBtn }>Cancel</Text>
          </Pressable>
        )}
      </View>
      
      {/* - Enable to implement Search By ARTIST switcher
      <Pressable 
        style={styles.switchSearchModeContainer} 
        onPress={() => switchSearchMode()}>
        <Text style={styles.swithSearchMode}>
          {(searchBy === 'album') ? 'Searching by album, Search by artist' : 'Searching by artist, Search by album'}
        </Text>
      </Pressable>
      */}

      {data && (
        <ApiResponseList data={data} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  searchBoxContainer: {
    padding: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    backgroundColor: Colors.steelGrey,
  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "82%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "82%"
  },
  cancelBtnContainer: {
    marginLeft: 'auto',
    padding: 6
  },
  cancelBtn: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.lightBlue
  },
  switchSearchModeContainer: {
    padding: 15,
    paddingTop: 0,
    alignItems: "flex-end",
    backgroundColor: Colors.steelGrey,
  },
  swithSearchMode: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.lightBlue, 
  }
});

export default SearchBar;