import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Pressable, Text, StyleSheet } from 'react-native';
import Home from './src/Home';
import Main from './src/Main';

const Stack = createStackNavigator();

const App = () => {

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
        <Stack.Screen name="Home" component={ Home } />
        <Stack.Screen
          name="Main"
          component={ Main }
          initialParams={{
            qFormat: '',
            qStatus: 'owned'
          }}
          options={({ route, navigation }) => ({
            title: route.params.pageTitle || 'default',
            headerRight: () => (
              <Pressable onPress={() => navigation.navigate("Main", {
                pageTitle: `${route.params.qFormat} ${(route.params.qStatus === 'owned') ? 'wishlist' : 'owned'}`,
                qFormat: route.params.qFormat,
                qStatus: (route.params.qStatus === 'owned') ? 'wishlist' : 'owned'
              })}>
                <Text style={ styles.switcher }>{ (route.params.qStatus === 'owned') ? 'wishlist' : 'owned' }</Text>
              </Pressable>
            )
          })}
        />
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  switcher: {
    color: '#9fa3a9',
    paddingRight: 8
  }
})

/* colours
#171718
#1f2124
#393d42
#6a6e73
#9fa3a9
*/

export default App;
