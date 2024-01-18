import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import db from './utils/db'

const Home = ( {navigation} ) => {
  const [isLoading, setIsLoading] = useState(true);
  const [artists, setArtists] = useState([]);
  const [artistData, setArtistData] = useState({ name: '', deezer_id: '' });
  const [settings, setSettings] = useState([]);

  useEffect(() => {
    fetchData();
  },[]);

  useFocusEffect(
    useCallback(() => {
      fetchSettings();
    }, [])
  );

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

  // SETTINGS
  const insertSettings = () => {
    settingValues = [1,1,0,1,0];
    db.transaction(tx =>
      tx.executeSql('INSERT OR REPLACE INTO settings (id, vinyl, cassette, cd, digital) VALUES (?,?,?,?,?)', settingValues,
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            // Obtén los datos insertados
            txObj.executeSql('SELECT * FROM settings WHERE id = 1', null,
              (txObj, result) => {
                const insertedRow = [result.rows.item(0)];
                setSettings(insertedRow);
              },
              (txObj, error) => console.log(error)
            );
          }
        }, // setSettings([{"cassette": 0, "cd": 1, "digital": 0, "vinyl": 1}]),
        (txObj, error) => console.log(error)
      )
    )
  }
  
  const fetchSettings = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT id, vinyl, cd, cassette, digital FROM settings WHERE id=1', null,
        (txObj, resultSet) => setSettings(resultSet.rows._array),
        (txObj, error) => console.log(error)
      )
    });
  }

  const displaySettings = () => {
    return settings.map((setting, index) => {
      return (
        <View key={index} style={{ backgroundColor: 'pink' }}>
          <Text>{`(${setting.id}) vinyl: ${setting.vinyl} - cd: ${setting.cd} - cassette: ${setting.cassette} - digital: ${setting.digital}`}</Text>
        </View>
      )
    })
  }

  // RESET de la Base de Datos
  // vacia la tabla, sigue creada pero sin filas
  
  const cleanTable = (tabla) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM '+tabla, null,
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            if (tabla === 'artists')
              setArtists([])
            else {
              setSettings([])
            }
          }
        },
        (txObj, error) => console.log(error)
      )
      }
    )
  }
  
  // borra la tabla de la BD (hay que crearla de cero)
  const borraTabla = () => {
    db.transaction(tx => {
      tx.executeSql('DROP TABLE IF EXISTS artists', [], (_, resultSet) => {
        tx.executeSql('DROP TABLE IF EXISTS settings', [], (_, resultSet) => {
          alert("drop table")
        })
      })
    });
  }

  const homePage = () => {
    return (
      <View style={styles.container}>
        <Pressable style={ styles.button } onPress={() => navigation.navigate("Main")}>
          <Text style={ styles.buttonText }>My Collection</Text>
        </Pressable>
        <Pressable style={ styles.button } onPress={() => navigation.navigate("Main", {
          qFormat: 'vinyl',
          qStatus: 'owned'
        })}>
          <Text style={ styles.buttonText }>Vinyls Collection</Text>
        </Pressable>
        <Pressable style={ styles.button } onPress={() => navigation.navigate("Main", {
          qFormat: 'cd',
          qStatus: 'owned'
        })}>
          <Text style={ styles.buttonText }>CDs Collection</Text>
        </Pressable>
        <Pressable style={ styles.button } onPress={() => navigation.navigate("Main", {
          qFormat: 'digital',
          qStatus: 'owned'
        })}>
          <Text style={ styles.buttonText }>Digital Lossless Collection</Text>
        </Pressable>
        <Pressable style={ styles.button } onPress={() => navigation.navigate("Main", {
          qFormat: '',
          qStatus: 'wishlist'
        })}>
          <Text style={ styles.buttonText }>My Wishlist</Text>
        </Pressable>
  
        
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
  
        <Pressable title="limpiar tabla" onPress={() => cleanTable('artists')} style={styles.btn}>
          <Text>Borrar artistas</Text>
        </Pressable>
  
        <Pressable title="drop" onPress={borraTabla} style={styles.btn}>
          <Text>DROP TABLE</Text>
        </Pressable>
  
        {displaySettings()}
        <Pressable title="limpiar tabla" onPress={() => cleanTable('settings')} style={styles.btn}>
          <Text>Borrar settings</Text>
        </Pressable>
  
        
      </View>
    )
  }
  
  const renderHome = () => {
    if (settings && settings.length > 0) {
      if (settings[0].vinyl === 0 && settings[0].cd === 0 && settings[0].digital === 0 && settings[0].cassette === 0) {
        return (
          <View style={styles.error}>
            <Pressable onPress={() => navigation.navigate("Settings")} style={styles.btn}>
              <Text>GO TO SETTINGS</Text>
            </Pressable>

            <Text>------------------------------------</Text>

            <Pressable title="crear settings" onPress={insertSettings} style={styles.btn}>
              <Text>Crear Settings on the fly</Text>
            </Pressable>
          </View>
        )
      }

      return (
        homePage()
      )
    }

    return (<View style={styles.error}><Text>Application error, settings not found</Text></View>)
  }

  return renderHome();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: 40
  },
  error: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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

export default Home;