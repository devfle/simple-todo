import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { FAB, Text, IconButton, Menu } from 'react-native-paper';
import BottomForm from '../components/BottomForm';
import ListItemTodo from '../components/ListItemTodo';

interface TodoItem {
  title: string;
  text: string;
  icon: string;
  state: string;
}

function Home() {
  const [showBottomForm, setShowBottomForm] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [todoItems, setTodoItems] = useState<TodoItem[]>([
    {
      title: 'First Item',
      text: 'Item description',
      icon: 'folder',
      state: 'Todo',
    },
    {
      title: 'Second Item',
      text: 'Item description',
      icon: 'folder',
      state: 'Done',
    },
    {
      title: 'Third Item',
      text: 'Item description',
      icon: 'folder',
      state: 'Todo',
    },
  ]);

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
          anchor={<IconButton onPress={() => setShowFilterMenu(true)} icon="sort" animated accessibilityLabel="sort todo list" />}
        >
          <Menu.Item title="Status" />
          <Menu.Item title="Name" />
          <Menu.Item title="User" />
        </Menu>
      </View>
      <ScrollView style={{ flex: 1 }}>
        {todoItems.map((todo, index) => (
          <ListItemTodo key={index} title={todo.title} text={todo.text} icon={todo.icon} state={todo.state} />
        ))}
      </ScrollView>
      {showBottomForm && <BottomForm setShowBottomForm={setShowBottomForm} setTodoItems={setTodoItems} />}
      <FAB onPress={() => setShowBottomForm(true)} accessibilityLabel="add project" style={styles.fab} icon="plus" />
    </>
  );
}

export default Home;
