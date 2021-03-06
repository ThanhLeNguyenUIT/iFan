import {
  Dimensions,
  Platform,
  Animated,
  Easing
} from 'react-native';

const { width } = Dimensions.get('window');

const IosTransition = (index, position) => {
  const inputRange = [index - 1, index, index + 0.99, index + 1];
  const outputRange = [width, 0, -10, -10];

  const translateY = 0;
  const translateX = position.interpolate({
    inputRange,
    outputRange,
  });

  const opacity = position.interpolate({
    inputRange,
    outputRange: [0, 1, 1, 0],
  });
  return {
    opacity,
    transform: [{ translateX }, { translateY }],
  };
};

const DroidTransition = (index, position) => {
  const translateX = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [width, 0, 0]
  });

  const opacity = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [0, 1, 1],
  });

  const slideFromRight = { opacity, transform: [{ translateX }] };

  return slideFromRight;
};

function transition() {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: (sceneProps) => {
      const { position, scene } = sceneProps;
      const { index } = scene;
      if (Platform.OS === 'ios') return IosTransition(index, position);
      return DroidTransition(index, position);
    },
    
  };    
}


export default transition;
