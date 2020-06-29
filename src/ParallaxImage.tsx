import React, { FC } from 'react';
import { Animated, Dimensions, StyleSheet, View as RNView } from 'react-native';

const { useState, useCallback, createRef } = React;
const { Image, View } = Animated;
const { get } = Dimensions;

const { height: WINDOW_HEIGHT } = get('window');

interface IImage {
  y?: Animated.AnimatedInterpolation;
  factor?: number;
  height?: number;
}

const ParallaxImage: FC<IImage> = ({ y, factor, height }) => {
  const [layout, setLayout] = useState<{
    offset: number;
    height: number;
    width: number;
  }>({
    offset: 0,
    height: 0,
    width: 0,
  });

  const viewRef = createRef<RNView>();

  const handleLayout = useCallback(
    ({ nativeEvent }): void => {
      console.log(nativeEvent.layout);

      viewRef.current?.measure((_, __, width, _height, ___, py) => {
        setLayout({ offset: py, height: _height, width });
      });
    },
    [viewRef]
  );

  const style =
    y && factor
      ? {
          transform: [
            {
              translateY: y.interpolate({
                inputRange: [
                  layout.offset - layout.height,
                  layout.offset + WINDOW_HEIGHT + layout.height,
                ],
                outputRange: [
                  -(layout.height * factor),
                  layout.height * factor,
                ],
              }),
            },
          ],
        }
      : {};

  return (
    <View
      ref={viewRef}
      onLayout={handleLayout}
      style={[styles.container, { height }]}
    >
      <Image
        source={{
          uri:
            'https://s31807.pcdn.co/wp-content/uploads/2020/02/Timothe%CC%81e-Chalamet-at-Little-Women-Premiere-in-Paris-scaled.jpg',
        }}
        style={[style, styles.image]}
        resizeMode="cover"
      />
    </View>
  );
};

ParallaxImage.defaultProps = {
  factor: 0.2,
  height: 500,
};

export default ParallaxImage;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
    backgroundColor: 'red',
    marginVertical: 20,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    alignSelf: 'stretch',
  },
});
