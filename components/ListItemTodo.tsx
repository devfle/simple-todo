import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { List, Chip } from 'react-native-paper';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

interface ListItemTodoProps {
  title: string;
  text: string;
  icon: string;
  state: string;
}

function ListItemTodo({ title, text, icon, state }: ListItemTodoProps) {
  const translateX = useSharedValue(0);
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd(() => {
      translateX.value = 0;
    });

  const slideStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={slideStyle}>
        <List.Item title={title} description={text} left={(props) => <List.Icon {...props} icon={icon} />} right={(props) => <Chip {...props}>{state}</Chip>} />
      </Animated.View>
    </GestureDetector>
  );
}

export default ListItemTodo;
