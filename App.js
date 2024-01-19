import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { Feather } from "@expo/vector-icons";
import { useState, useEffect } from 'react';
import Settings from './src/Settings';
import Home from './src/Home';
import Main from './src/Main';
import SearchBar from './src/SearchBar';
import ItemDetails from './src/components/ItemDetails';
import { Colors, i18n } from "./src/assets/theme";
import db, { initializeDatabase } from './src/utils/db';
import AddManually from './src/components/AddManually';

const Stack = createStackNavigator();

const App = () => {
  const [isDatabaseInitialized, setIsDatabaseInitialized] = useState(false);

  useEffect(() => {
    initializeDatabase(db).then(() => {
      setIsDatabaseInitialized(true);
    });
  }, []);

  const renderPageTitle = (format = '', status = 'owned') => {
    if (format) {
      const titleKeyName = `${format}Title`;
      return `${i18n[titleKeyName]} ${(status === 'owned') ? 'Collection' : 'Wishlist'}`
    }
    else {
      return `${(status === 'owned') ? 'My Collection' : 'My Wishlist'}`
    }
  }

  const renderAppContent = () => {
    if (!isDatabaseInitialized) {
      return <Text>Initializing database...</Text>;
    }

    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Home'
          screenOptions={{
            headerStyle: {
              backgroundColor: '#171718'
            },
            headerTintColor: '#FFF',
            headerTitleStyle: { fontWeight: 'bold' }
          }}
        >
          <Stack.Group>
            <Stack.Screen
              name="Home"
              component={ Home }
              options={({navigation}) => ({
                title: '',
                headerRight: () => (
                  <Pressable onPress={() => navigation.navigate("SearchBar")}>
                    <Feather
                      name="search"
                      size={20}
                      color="white"
                      style={ styles.magnifierIcon }
                    />
                  </Pressable>
                ),
                headerLeft: () => (
                  <Pressable onPress={() => navigation.navigate("Settings")}>
                    <Feather
                      name="menu"
                      size={20}
                      color="white"
                      style={ styles.menuIcon }
                    />
                  </Pressable>
                )
              })}
              />
            <Stack.Screen
              name="Main"
              component={ Main }
              initialParams={{
                qFormat: '',
                qStatus: 'owned'
              }}
              options={({ route, navigation }) => ({
                headerStyle: { backgroundColor: (route.params.qStatus == 'owned') ? '#171718' : '#6a6e73' },
                title: renderPageTitle(route.params.qFormat, route.params.qStatus),
                headerRight: () => (
                  <Pressable onPress={() => navigation.navigate("Main", {
                    qFormat: route.params.qFormat,
                    qStatus: (route.params.qStatus === 'owned') ? 'wishlist' : 'owned'
                  })}>
                    <Text style={ styles.switcher }>{ (route.params.qStatus === 'owned') ? 'wishlist' : 'collection' }</Text>
                  </Pressable>
                )
              })}
            />
            <Stack.Screen
              name="SearchBar"
              component={ SearchBar }
              options={() => ({
                cardStyle: {
                  backgroundColor: '#1f2124'
                }
              })}
              //options={() => ({headerShown: false})}
            />
          </Stack.Group>
  
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen
              name='Details'
              component={ItemDetails}
              //options={() => ({headerShown: false})}
            />

            <Stack.Screen
              name="Settings"
              component={ Settings }
              //options={() => ({headerShown: false})}
            />

            <Stack.Screen
              name="AddManually"
              component={ AddManually }
              //options={() => ({headerShown: false})}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    )
  };

  return (
    <View style={{ flex: 1 }}>
      {renderAppContent()}
      <StatusBar style="light" />
    </View>
  );
  
}

const styles = StyleSheet.create({
  switcher: {
    color: Colors.ashGrey,
    paddingRight: 8
  },
  menuIcon: {
    color: Colors.ashGrey,
    paddingLeft: 14,
    fontSize: 24
  },
  magnifierIcon: {
    color: Colors.ashGrey,
    paddingRight: 18,
    fontSize: 24
  }
});

/* colours
#171718
#1f2124
#393d42
#6a6e73
#9fa3a9

#2196f3 link
*/

export default App;
