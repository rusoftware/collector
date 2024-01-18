import { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import db from '../utils/db'

const AddManually = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [artists, setArtists] = useState([]);
  const [artistData, setArtistData] = useState({ name: '', deezer_id: '' });

  useEffect(() => {
    fetchData();
  },[]);

  const fetchData = async () => {
    try {
      const result = await new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql('SELECT name, deezer_id FROM artists', null,
            (txObj, resultSet) => resolve(resultSet.rows._array),
            (txObj, error) => reject(error)
          );
        });
      });

      setArtists(result);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const addArtists = async () => {
    setIsLoading(true);

    try {
      const result = await new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            'INSERT INTO artists (name, deezer_id) VALUES (?, ?)',
            [artistData.name, artistData.deezer_id],
            (txObj, resultSet) => resolve(resultSet),
            (txObj, error) => reject(error)
          );
        });
      });

      let existingArtists = [...artists];
      existingArtists.push({ id: result.insertId, ...artistData });
      setArtistData({ name: '', deezer_id: '' });
      setArtists(existingArtists);
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  const displayArtists = () => {
    return artists.map((artist, index) => {
      return (
        <View key={index}><Text>{artist.name} - Deezer ID: {artist.deezer_id}</Text></View>
      )
    })
  }

  const cleanArtistsTable = () => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM artists', null,
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            setArtists([])
          }
        },
        (txObj, error) => console.log(error)
      )
      }
    )
  }

  // borra las tablas de la BD (hay que crearlas de cero)
  const borraTablas = () => {
    db.transaction(tx => {
      tx.executeSql('DROP TABLE IF EXISTS artists', [], (_, resultSet) => {
        tx.executeSql('DROP TABLE IF EXISTS settings', [], (_, resultSet) => {
          alert("drop table")
        })
      })
    });
  }

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input} 
        value={artistData.name} 
        placeholder="Artista" 
        onChangeText={text => setArtistData({...artistData, name: text})} 
        />
      <TextInput
        style={styles.input}
        value={artistData.deezer_id}
        placeholder="Deezer ID"
        onChangeText={text => setArtistData({ ...artistData, deezer_id: text })}
        />
      <Pressable title="add artists" onPress={addArtists} style={styles.btn}>
        <Text>Añadir artista</Text>
      </Pressable>
      <View>
        {isLoading && <Text>...loading</Text>}
        {!isLoading && displayArtists()}
      </View>

      <Pressable title="limpiar tabla" onPress={() => cleanArtistsTable()} style={styles.btn}>
        <Text>Borrar artistas</Text>
      </Pressable>

      <Pressable title="drop" onPress={borraTablas} style={styles.btn}>
        <Text>DROP TABLES</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: 40
  },
  input: {
    padding: 18,
    fontSize: 24,
    textAlign: "center",
  },
  btn: {
    textAlign: "center",
    fontSize: 14,
    alignContent: 'center',
    alignItems: 'center',
    padding: 6,
    marginHorizontal: 40,
    marginVertical: 6,
    backgroundColor: 'lightblue'
  }
})

export default AddManually;