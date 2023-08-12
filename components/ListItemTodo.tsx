import { View, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { List, Chip, IconButton } from 'react-native-paper';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface ListItemTodoProps {
  title: string;
  text: string;
  icon: string;
  state: string;
}

function ListItemTodo({ title, text, icon, state }: ListItemTodoProps) {
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(0);

  const styles = StyleSheet.create({
    deleteIcon: {
      position: 'absolute',
      right: 16,
      top: 8,
    },
  });

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;

      if (event.translationX < -40) opacity.value = withTiming(1);
      if (opacity.value === 1 && event.translationX > -40) opacity.value = withTiming(0);
    })
    .onEnd(() => {
      translateX.value = 0;
      opacity.value = 0;
    });

  const slideStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={slideStyle}>
          <List.Item title={title} description={text} left={(props) => <List.Icon {...props} icon={icon} />} right={(props) => <Chip {...props}>{state}</Chip>} />
        </Animated.View>
      </GestureDetector>
      <Animated.View style={[styles.deleteIcon, { opacity }]}>
        <IconButton icon="delete" iconColor="#dd0000" />
      </Animated.View>
    </View>
  );
}

export default ListItemTodo;
