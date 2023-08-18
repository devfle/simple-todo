import { Button, Chip, IconButton, Text, TextInput } from 'react-native-paper';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useContext, useState } from 'react';
import { NavigationContext, TodoContext } from '../context';
import { TodoItem, NavigationData } from '../types';

interface UpdateFormData {
  title?: string;
  text?: string;
  assignedUser?: string;
}

function SingleTodoItem() {
  const [updateTodoData, setUpdateTodoData] = useState({});
  const { page, setPage }: any = useContext(NavigationContext);
  const { todoItems, setTodoItems }: any = useContext(TodoContext);

  if (!page || !setPage || !todoItems || !setTodoItems) {
    return null;
  }

  const currentItem = todoItems.find((item: TodoItem) => item.id === page.selectedItem);

  if (!currentItem) {
    return null;
  }

  const styles = StyleSheet.create({
    inputs: {
      marginVertical: 16,
    },
    buttonWrapper: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 32,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 32,
    },
  });

  const updateTodoItem = (data: UpdateFormData) => {
    setUpdateTodoData((prevTodoData) => ({ ...prevTodoData, ...data }));
  };

  const saveChanges = () => {
    setTodoItems((prevTodoItems: TodoItem[]) => [
      ...prevTodoItems.map((todoItem: TodoItem) => {
        if (todoItem.id === page.selectedItem) {
          return {
            ...todoItem,
            ...updateTodoData,
          };
        }

        return todoItem;
      }),
    ]);
    setPage((prevPage: NavigationData) => ({ ...prevPage, name: 'home' }));
  };

  return (
    <>
      <View style={styles.header}>
        <IconButton onPress={() => setPage({ ...page, name: 'home' })} icon="arrow-left" />
        <Text variant="headlineSmall">Edit Todo Item</Text>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <View style={[styles.header, { marginBottom: 16 }]}>
          <Text variant="bodyMedium">Current State:</Text>
          <Chip>{currentItem.state}</Chip>
        </View>
        <TextInput onChangeText={(title) => updateTodoItem({ title })} value={updateTodoData?.title ?? currentItem.title} label="Title" />
        <TextInput onChangeText={(text) => updateTodoItem({ text })} value={updateTodoData?.text ?? currentItem.text} style={[styles.inputs, { minHeight: 120 }]} label="Description" multiline />
        <View style={[styles.header, { marginBottom: 16 }]}>
          <Text variant="bodyMedium">Assigned User:</Text>
          <View style={{ flexDirection: 'row' }}>
            {currentItem.assignedUser ? (
              <Chip onClose={() => updateTodoItem({ assignedUser: 'You' })} style={{ marginLeft: 4 }}>
                {updateTodoData?.assignedUser ?? currentItem.assignedUser}
              </Chip>
            ) : null}
          </View>
        </View>
        <TextInput label="Search User" right={<TextInput.Icon icon="account" />} />
        <View style={styles.buttonWrapper}>
          <Button onPress={() => setPage({ ...page, name: 'home' })} mode="outlined">
            Cancel
          </Button>
          <Button style={{ marginStart: 8 }} mode="contained" onPress={saveChanges}>
            Save
          </Button>
        </View>
      </ScrollView>
    </>
  );
}

export default SingleTodoItem;
