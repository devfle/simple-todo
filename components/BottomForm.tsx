import { Button, Card, HelperText, TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

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

  const translateStyle = useSharedValue(285);

  const styles = StyleSheet.create({
    card: {
      paddingVertical: 12,
    },
    lastInput: {
      marginTop: 8,
      marginBottom: 24,
    },
    wrapper: {
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1,
      position: 'absolute',
    },
  });

  const cardTranslateStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateStyle.value }],
  }));

  useEffect(() => {
    translateStyle.value = withTiming(0);

    return () => {
      // TODO: this does not work currently
      translateStyle.value = withTiming(285);
    };
  }, []);

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
    <Animated.View style={[styles.wrapper, cardTranslateStyle]}>
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
    </Animated.View>
  );
}

export default BottomForm;
