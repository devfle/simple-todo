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
  const deleteOpacity = useSharedValue(0);
  const checkOpacity = useSharedValue(0);

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

      if (event.translationX < -40) deleteOpacity.value = withTiming(1);
      if (deleteOpacity.value === 1 && event.translationX > -40) deleteOpacity.value = withTiming(0);

      if (event.translationX > 40) checkOpacity.value = withTiming(1);
      if (checkOpacity.value === 1 && event.translationX < 40) checkOpacity.value = withTiming(0);
    })
    .onEnd(() => {
      translateX.value = 0;
      deleteOpacity.value = 0;
      checkOpacity.value = 0;
    });

  return (
    <View>
      <Animated.View style={[styles.checkIcon, { opacity: checkOpacity }]}>
        <IconButton icon="check" iconColor="#000" />
      </Animated.View>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={{ transform: [{ translateX: translateX }] }}>
          <List.Item title={title} description={text} left={(props) => <List.Icon {...props} icon={icon} />} right={(props) => <Chip {...props}>{state}</Chip>} />
        </Animated.View>
      </GestureDetector>
      <Animated.View style={[styles.deleteIcon, { opacity: deleteOpacity }]}>
        <IconButton icon="delete" iconColor="#dd0000" />
      </Animated.View>
    </View>
  );
}

export default ListItemTodo;
