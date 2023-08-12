import { StatusBar } from 'expo-status-bar';
import { AppRegistry, StyleSheet, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import todoApp from './app.json';
import Home from './pages/Home';

export default function App() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: 52,
      paddingHorizontal: 16,
    },
  });

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Home />
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(JSON.stringify(todoApp), () => App);
