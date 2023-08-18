import { useContext } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { List, Chip, IconButton } from 'react-native-paper';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { NavigationContext } from '../context';

interface ListItemTodoProps {
  id: number;
  title: string;
  text: string;
  icon: string;
  state: string;
  removeItem: (id: number) => void;
  markAsDone: (id: number) => void;
}

function ListItemTodo({ title, text, icon, state, id, removeItem, markAsDone }: ListItemTodoProps) {
  const translateX = useSharedValue(0);
  const windowWidth = Dimensions.get('window').width;

  // TODO: fix type any
  const { page, setPage }: any = useContext(NavigationContext);

  if (!page || !setPage) {
    return null;
  }

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
    .onEnd((event) => {
      if (event.translationX < windowWidth * 0.45 * -1) {
        runOnJS(removeItem)(id);
        return;
      }

      if (event.translationX > windowWidth * 0.45) {
        runOnJS(markAsDone)(id);
      }

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
          <List.Item
            onPress={() => setPage({ selectedItem: id, name: 'settings' })}
            title={title}
            description={text}
            left={(props) => <List.Icon {...props} icon={icon} />}
            right={(props) => <Chip {...props}>{state}</Chip>}
          />
        </Animated.View>
      </GestureDetector>
      <Animated.View style={[styles.deleteIcon, deleteIconAnimationStyle]}>
        <IconButton icon="delete" iconColor="#dd0000" />
      </Animated.View>
    </View>
  );
}

export default ListItemTodo;
