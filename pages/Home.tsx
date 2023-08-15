import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { FAB, Text, IconButton, Menu, Snackbar } from 'react-native-paper';
import BottomForm from '../components/BottomForm';
import ListItemTodo from '../components/ListItemTodo';

interface TodoItem {
  id: number;
  title: string;
  text: string;
  icon: string;
  state: string;
}

type sortPattern = 'title' | 'state';

function Home() {
  const [showBottomForm, setShowBottomForm] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState({
    status: false,
    content: '',
  });

  const [todoItems, setTodoItems] = useState<TodoItem[]>([
    {
      id: 1,
      title: 'First Item',
      text: 'Item description',
      icon: 'equal',
      state: 'Todo',
    },
    {
      id: 2,
      title: 'Second Item',
      text: 'Item description',
      icon: 'chevron-up',
      state: 'Done',
    },
    {
      id: 3,
      title: 'Third Item',
      text: 'Item description',
      icon: 'chevron-down',
      state: 'Todo',
    },
  ]);

  const removeItem = useCallback((id: number) => {
    setTodoItems((prevTodoItems) => [...prevTodoItems.filter((todoItem) => todoItem.id !== id)]);
    setShowSnackbar({ status: true, content: 'Todo item deleted.' });
  }, []);

  const markAsDone = useCallback((id: number) => {
    setTodoItems((prevTodoItems) => [
      ...prevTodoItems.map((todoItem) => {
        if (todoItem.id === id) {
          todoItem.state = 'Done';
        }

        return todoItem;
      }),
    ]);
    setShowSnackbar({ status: true, content: 'Todo item marked as done' });
  }, []);

  const sortTodoItems = (key: sortPattern) => {
    switch (key) {
      case 'title':
        setTodoItems((prevTodoItems) => [...prevTodoItems.sort((a, b) => a[key].localeCompare(b[key]))]);
        break;

      case 'state':
        setTodoItems((prevTodoItems) => [...prevTodoItems.sort((a, b) => a[key].localeCompare(b[key]))]);
        break;

      default:
        break;
    }
  };

  const styles = StyleSheet.create({
    fab: {
      position: 'absolute',
      bottom: 24,
      right: 24,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
  });

  return (
    <>
      <View style={styles.header}>
        <Text variant="headlineSmall">Your Todo List</Text>
        <Menu
          onDismiss={() => setShowFilterMenu(false)}
          visible={showFilterMenu}
          anchor={<IconButton disabled={todoItems.length <= 1} onPress={() => setShowFilterMenu(true)} icon="sort" animated accessibilityLabel="sort todo list" />}
        >
          <Menu.Item title="Title (A-Z)" onPress={() => sortTodoItems('title')} />
          <Menu.Item title="Status" onPress={() => sortTodoItems('state')} />
        </Menu>
      </View>
      <ScrollView style={{ flex: 1 }}>
        {todoItems.map((todo) => (
          <ListItemTodo key={todo.id} markAsDone={markAsDone} removeItem={removeItem} id={todo.id} title={todo.title} text={todo.text} icon={todo.icon} state={todo.state} />
        ))}
      </ScrollView>
      {showBottomForm && <BottomForm setShowBottomForm={setShowBottomForm} setTodoItems={setTodoItems} />}
      <FAB onPress={() => setShowBottomForm(true)} accessibilityLabel="add project" style={styles.fab} icon="plus" />
      <Snackbar
        style={{ left: 16, bottom: 20 }}
        duration={5000}
        onDismiss={() => setShowSnackbar({ status: false, content: '' })}
        visible={showSnackbar.status}
        action={{
          label: 'Undo',
          onPress: () => {
            // Do something
          },
        }}
      >
        {showSnackbar.content}
      </Snackbar>
    </>
  );
}

export default Home;
