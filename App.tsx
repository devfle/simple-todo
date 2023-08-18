import { StatusBar } from 'expo-status-bar';
import { AppRegistry, StyleSheet, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import todoApp from './app.json';
import Home from './pages/Home';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SingleTodoItem from './pages/SingleTodoItem';
import { useState } from 'react';
import { NavigationContext, TodoContext } from './context';

export default function App() {
  const [page, setPage] = useState({
    selectedItem: 0,
    name: 'home',
  });
  const [todoItems, setTodoItems] = useState<TodoItem[]>([
    {
      id: 1,
      title: 'First Item',
      text: 'Item description',
      icon: 'equal',
      state: 'Todo',
      assignedUser: 'Admin',
    },
    {
      id: 2,
      title: 'Second Item',
      text: 'Item description',
      icon: 'chevron-up',
      state: 'Done',
      assignedUser: 'Admin',
    },
    {
      id: 3,
      title: 'Third Item',
      text: 'Item description',
      icon: 'chevron-down',
      state: 'Todo',
      assignedUser: 'Admin',
    },
  ]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: 52,
      paddingHorizontal: 16,
    },
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <NavigationContext.Provider value={{ page, setPage }}>
          <TodoContext.Provider value={{ todoItems, setTodoItems }}>
            <View style={styles.container}>
              {page.name === 'home' ? <Home /> : <SingleTodoItem />}
              <StatusBar style="auto" />
            </View>
          </TodoContext.Provider>
        </NavigationContext.Provider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

AppRegistry.registerComponent(JSON.stringify(todoApp), () => App);

export { TodoContext, NavigationContext };
