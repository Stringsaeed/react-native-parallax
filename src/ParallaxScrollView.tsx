import React, { FC } from 'react';
import { Animated } from 'react-native';
import type { ScrollViewProps } from 'react-native';
import ParallaxImage from './ParallaxImage';

interface ParallaxScrollViewIProps extends ScrollViewProps {}
const { useRef } = React;
const { Value, event } = Animated;

const applyPropsToParallaxImages = (children: any, props: any): any => {
  if (Array.isArray(children)) {
    return children.map((child) => {
      if (Array.isArray(child)) {
        return applyPropsToParallaxImages(child, props);
      }
      if (child.type === ParallaxImage) {
        return React.cloneElement(child, props);
      }
      return child;
    });
  }
  if (children.type === ParallaxImage) {
    return React.cloneElement(children, props);
  }
  return children;
};

const ParallaxScrollView: FC<ParallaxScrollViewIProps> = ({ children }) => {
  const y = useRef(new Value(0));

  const onScroll = event([
    { nativeEvent: { contentOffset: { y: y.current } } },
  ]);

  return (
    <Animated.ScrollView onScroll={onScroll}>
      {applyPropsToParallaxImages(children, { y: y.current })}
    </Animated.ScrollView>
  );
};

export default ParallaxScrollView;
