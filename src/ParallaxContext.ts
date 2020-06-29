import { createContext, useContext } from 'react';
import { Animated } from 'react-native';

type Value = Animated.AnimatedInterpolation;

const ParallaxContext = createContext<Value>(new Animated.Value(0));

export const ParallaxProvider = ParallaxContext.Provider;
export const ParallaxConsumer = ParallaxContext.Consumer;

export const useParallax = () => {
  return useContext(ParallaxContext);
};
