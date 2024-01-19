import { Text, View, Switch, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { Colors, i18n, themeIcons } from "./assets/theme";
import db from './utils/db'

const Settings = () => {
  const [settingsData, setSettingsData] = useState([{'vinyl': 0, 'cd': 0, 'cassette': 0, 'digital': 0}]);
  const [isLoading, setIsLoading] = useState(true);

  const toggleSettingSwitch = (format) => {
    
    const updateDbField = async (settingValues) => {
      try {
        const result = await new Promise((resolve, reject) => {
          db.transaction((tx) => {
            tx.executeSql(
              'INSERT OR REPLACE INTO settings (id, vinyl, cassette, cd, digital) VALUES (?,?,?,?,?)', 
              settingValues,
              (txObj, resultSet) => resolve(resultSet),
              (txObj, error) => reject(error)
            );
          });
        });
      }
      catch(e) {
        console.log('error updating settings: ', e)
      }
    };

    setSettingsData(previousSettingsData => {
      const updatedSettingsData = [...previousSettingsData];
      const currentValue = updatedSettingsData[0][format];
      const newValue = currentValue === 0 ? 1 : 0;
      
      const valuesToStore = [
        1, // id
        format === 'vinyl' ? newValue : updatedSettingsData[0].vinyl,
        format === 'cassette' ? newValue : updatedSettingsData[0].cassette,
        format === 'cd' ? newValue : updatedSettingsData[0].cd,
        format === 'digital' ? newValue : updatedSettingsData[0].digital,
      ];
      
      updateDbField(valuesToStore).then(() => fetchSettings())
      updatedSettingsData[0][format] = newValue;
      return updatedSettingsData;
    })
  }

  useEffect(() => {
    fetchSettings();
  },[]);

  const fetchSettings = async () => {
    try {
      const result = await new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql('SELECT * FROM settings WHERE id=1', null,
            (txObj, resultSet) => resolve(resultSet.rows._array),
            (txObj, error) => reject(error)
          );
        });
      });

      setSettingsData(result);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } 
  };

  // renders
  const renderSwitchSetting = (format, icon) => {
    return (
      <View style={ styles.settingsRow }>
        <View style={ styles.settingDescription }>
          <View style={ styles.settingIcon }>
            { icon }
          </View>
          <Text style={ styles.settingTitle }>{ i18n[`${format}Title`] }</Text>
        </View>

        <Switch
          trackColor={{false: Colors.ashGrey, true: Colors.lightBlue}}
          thumbColor={ settingsData[0][format] === 1 ? Colors.pureWhite : Colors.lightGrey }
          ios_backgroundColor={ Colors.ashGrey }
          onValueChange={() => toggleSettingSwitch(format)}
          value={ settingsData[0][format] === 1 }
        />
      </View>
    );
  }

  const renderSettingsPage = () => {
    if (isLoading) {
      return <View style={styles.loading}><Text>loading data...</Text></View>
    }

    return (
      <View style={ styles.settingsContainer }>
        <Text style={ styles.settingsHeader }>I want to collect</Text>
        
        { renderSwitchSetting('vinyl', themeIcons.vinylIcon()) }
        { renderSwitchSetting('cassette', themeIcons.cassetteIcon()) }
        { renderSwitchSetting('cd', themeIcons.cdIcon()) }
        { renderSwitchSetting('digital', themeIcons.digitalIcon()) }
        
      </View>
    )
  }
  

  return renderSettingsPage()
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  settingsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.darkGrey
  },
  settingsHeader: {
    fontSize: 28,
    color: Colors.ashGrey,
    padding: 10
  },
  settingsRow: {
    width: '100%',
    backgroundColor: Colors.pureWhite,
    borderTopWidth: 1,
    borderTopColor: Colors.blackCarbon,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12
  },
  settingDescription: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  settingTitle: {
    padding: 6,
    fontSize: 16,
  },
  settingIcon: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
});

export default Settings;