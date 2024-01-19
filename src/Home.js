import { View, Text, Pressable, StyleSheet } from "react-native";
import { useState, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { Colors, i18n, themeIcons } from "./assets/theme";
import db from './utils/db'

const Home = ( {navigation} ) => {
  const [settings, setSettings] = useState([]);

  useFocusEffect(
    useCallback(() => {
      fetchSettings();
    }, [])
  );

  // SETTINGS
  const fetchSettings = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT id, vinyl, cd, cassette, digital FROM settings WHERE id=1', null,
        (txObj, resultSet) => setSettings(resultSet.rows._array),
        (txObj, error) => console.log(error)
      )
    });
  }

  // renders
  const renderCollectionButton = (format) => {
    if (settings && settings[0][format] === 1) {
      const titleKeyName = `${format}Title`;
      const iconKeyName = `${format}Icon`;
      return (
        <Pressable style={ styles.collectionButton } onPress={() => navigation.navigate("Main", {
          qFormat: format,
          qStatus: 'owned'
        })}>
          <View style={ styles.buttonIcon }>{ themeIcons[iconKeyName](40, Colors.lightBlue) }</View>
          <Text style={ styles.buttonText }>{ i18n[titleKeyName] }</Text>
        </Pressable>
      )
    }
  }

  const separator = (text) => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        <View>
          <Text style={{width: 50, textAlign: 'center'}}>{ text }</Text>
        </View>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
      </View>
    )
  }

  const homePage = () => {
    return (
      <>
        <View style={styles.container}>
          <View style={ styles.collectionBtnsContainer }>
            { renderCollectionButton('vinyl') }
            { renderCollectionButton('cassette') }
            { renderCollectionButton('cd') }
            { renderCollectionButton('digital') }
          </View>

          {separator("TOOLS")}

          <Pressable onPress={() => navigation.navigate('AddManually')} style={ styles.button }>
            <Text style={ styles.buttonText }>Add Manually</Text>
          </Pressable>
        </View>

        <View style={styles.bottomNavigation}>
          <Pressable
            style={ styles.formatButton }
            onPress={() => navigation.navigate("Main")}>
            <Text style={ styles.formatButtonText }>My Collection</Text>
          </Pressable>

          <Pressable
            style={styles.formatButton}
            onPress={() => navigation.navigate('Main', {
              qFormat: '',
              qStatus: 'wishlist'
            })}
            >
              <Text style={styles.formatButtonText}>My Wishlist</Text>
          </Pressable>
        </View>
      </>
    )
  }
  
  const renderHome = () => {
    if (settings && settings.length > 0) {
      if (settings[0].vinyl === 0 && settings[0].cd === 0 && settings[0].digital === 0 && settings[0].cassette === 0) {
        return (
          <View style={styles.error}>
            <Pressable onPress={() => navigation.navigate("Settings")} style={styles.button}>
              <Text style={ styles.buttonText }>GO TO SETTINGS</Text>
            </Pressable>
          </View>
        )
      }
      
      /*else if (Object.entries(settings[0]).filter(([key, value]) => key !== 'id' && value !== 0).length === 1) {
        const format = Object.entries(settings[0]).find(([key, value]) => key !== 'id' && value === 1)?.[0];

        navigation.navigate("Main", {
          qFormat: format,
          qStatus: 'owned'
        });
      }*/

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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.steelGrey
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
    backgroundColor: Colors.blackMamba,
    margin: 14
  },
  collectionBtnsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  collectionButton: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: Colors.blackCarbon,
    marginVertical: 14,
    marginHorizontal: '5%',
    width: '40%',
    height: '40%'
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white'
  },
  buttonIcon: {
    //backgroundColor: 'red'
  },

  bottomNavigation: {
    backgroundColor: Colors.blackCarbon,
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
    borderColor: Colors.ashGrey,
  },
  noBorder: {
    borderRightWidth: 0
  },
  formatButtonText: {
    textAlign: 'center',
    color: Colors.ashGrey,
    fontWeight: 'bold',
    fontSize: 16
  }
})

export default Home;