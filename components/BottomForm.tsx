import { Button, Card, HelperText, TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { Dispatch, SetStateAction, useState } from 'react';

interface BottomFormProps {
  setTodoItems: Dispatch<SetStateAction<TodoItem[]>>;
  setShowBottomForm: Dispatch<SetStateAction<boolean>>;
}

interface FormData {
  title?: string;
  text?: string;
}

interface TodoItem {
  title: string;
  text: string;
  icon: string;
  state: string;
}

function BottomForm({ setTodoItems, setShowBottomForm }: BottomFormProps) {
  const [formData, setFormData] = useState<FormData>({});
  const [hasError, setHasError] = useState({ title: false, text: false });

  const styles = StyleSheet.create({
    card: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      paddingVertical: 12,
      right: 0,
      minHeight: 260,
      zIndex: 1,
    },
    lastInput: {
      marginTop: 8,
      marginBottom: 24,
    },
  });

  const updateFormData = (data: FormData) => {
    setFormData((prevFormData) => ({ ...prevFormData, ...data }));
  };

  const addTodoItem = () => {
    if (!formData.title || !formData.text) {
      setHasError({ title: !formData.title, text: !formData.text });
      return;
    }

    setTodoItems((prevTodoItems) => [...prevTodoItems, { state: 'Todo', icon: 'folder', ...(formData as { title: string; text: string }) }]);
    setShowBottomForm(false);
  };

  return (
    <Card style={styles.card}>
      <Card.Title title="Add new Todo" />
      <Card.Content>
        <TextInput error={hasError.title} onChangeText={(data) => updateFormData({ title: data })} mode="outlined" label="Todo Name" placeholder="Todo Name"></TextInput>
        <TextInput
          error={hasError.text}
          onChangeText={(data) => updateFormData({ text: data })}
          style={styles.lastInput}
          mode="outlined"
          label="Todo Description"
          placeholder="Todo Description"
        ></TextInput>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => setShowBottomForm(false)}>Cancel</Button>
        <Button onPress={addTodoItem}>Create</Button>
      </Card.Actions>
    </Card>
  );
}

export default BottomForm;
