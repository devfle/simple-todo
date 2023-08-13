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

  const styles = StyleSheet.create({
    deleteIcon: {
      position: 'absolute',
      right: 8,
      top: 8,
    },
    checkIcon: {
      position: 'absolute',
      left: 0,
      top: 8,
    },
  });

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd(() => {
      translateX.value = 0;
    });

  const deleteIconAnimationStyle = useAnimatedStyle(() => ({
    opacity: translateX.value < -40 ? withTiming(1) : withTiming(0),
  }));

  const checkIconAnimationStyle = useAnimatedStyle(() => ({
    opacity: translateX.value > 40 ? withTiming(1) : withTiming(0),
  }));

  return (
    <View>
      <Animated.View style={[styles.checkIcon, checkIconAnimationStyle]}>
        <IconButton icon="check" iconColor="#000" />
      </Animated.View>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={{ zIndex: 1, transform: [{ translateX: translateX }] }}>
          <List.Item title={title} description={text} left={(props) => <List.Icon {...props} icon={icon} />} right={(props) => <Chip {...props}>{state}</Chip>} />
        </Animated.View>
      </GestureDetector>
      <Animated.View style={[styles.deleteIcon, deleteIconAnimationStyle]}>
        <IconButton icon="delete" iconColor="#dd0000" />
      </Animated.View>
    </View>
  );
}

export default ListItemTodo;
