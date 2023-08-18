import React, { useCallback, useContext, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { FAB, Text, IconButton, Menu, Snackbar } from 'react-native-paper';
import BottomForm from '../components/BottomForm';
import ListItemTodo from '../components/ListItemTodo';
import { TodoContext } from '../context';
import { TodoItem } from '../types';

type sortPattern = 'title' | 'state' | 'icon';

function Home() {
  const [showBottomForm, setShowBottomForm] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState({
    status: false,
    content: '',
  });

  // TODO: fix any
  const { todoItems, setTodoItems }: any = useContext(TodoContext);

  if (!todoItems || !setTodoItems) {
    return null;
  }

  const removeItem = useCallback((id: number) => {
    setTodoItems((prevTodoItems: TodoItem[]) => [...prevTodoItems.filter((todoItem: TodoItem) => todoItem.id !== id)]);
    setShowSnackbar({ status: true, content: 'Todo item deleted.' });
  }, []);

  const markAsDone = useCallback((id: number) => {
    setTodoItems((prevTodoItems: TodoItem[]) => [
      ...prevTodoItems.map((todoItem: TodoItem) => {
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
        setTodoItems((prevTodoItems: TodoItem[]) => [...prevTodoItems.sort((a: TodoItem, b: TodoItem) => a[key].localeCompare(b[key]))]);
        break;

      case 'state':
        setTodoItems((prevTodoItems: TodoItem[]) => [...prevTodoItems.sort((a: TodoItem, b: TodoItem) => a[key].localeCompare(b[key]))]);
        break;

      case 'icon':
        // TODO: create enums
        setTodoItems((prevTodoItems: TodoItem[]) => [
          ...prevTodoItems.sort((a: TodoItem, b: TodoItem) => {
            if (a[key] === 'chevron-up' && b[key] !== 'chevron-up') {
              return -1;
            }

            if (a[key] !== 'chevron-up' && b[key] === 'chevron-up') {
              return 1;
            }

            if (a[key] === 'equal' && b[key] === 'chevron-down') {
              return -1;
            }

            if (a[key] === 'chevron-down' && b[key] === 'equal') {
              return 1;
            }

            return 0;
          }),
        ]);
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
          <Menu.Item title="Priority" onPress={() => sortTodoItems('icon')} />
        </Menu>
      </View>
      <ScrollView style={{ flex: 1 }}>
        {todoItems.map((todo: TodoItem) => (
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
            // TODO: add undo action function
          },
        }}
      >
        {showSnackbar.content}
      </Snackbar>
    </>
  );
}

export default Home;
