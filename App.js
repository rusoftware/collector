import { StatusBar as ExpoSB } from 'expo-status-bar';
import { StyleSheet, View, StatusBar } from 'react-native';
import Main from './src/Main';
import Constants from 'expo-constants';

export default function App() {

  return (
    <View style={styles.container}>
      <Main />
      <ExpoSB style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || Constants.statusBarHeight,
    backgroundColor: '#171718',
    justifyContent: 'center',
  },
});
