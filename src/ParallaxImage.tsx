import React, { FC, useMemo } from 'react';
import { Animated, Dimensions, StyleSheet, View as RNView } from 'react-native';
import { useParallax } from './ParallaxContext';

const { useState, useCallback, useRef } = React;
const { Image, View } = Animated;
const { get } = Dimensions;

const { height: WINDOW_HEIGHT } = get('window');

interface IImage {
  factor?: number;
  height?: number;
}

interface ILayout {
  offset: number;
  height: number;
  width: number;
}

const ParallaxImage: FC<IImage> = ({ factor, height }) => {
  const y = useParallax();
  const viewRef = useRef<RNView>(null);
  const [layout, setLayout] = useState<ILayout>({
    offset: 0,
    height: 0,
    width: 0,
  });

  const handleLayout = useCallback(({}): void => {
    viewRef.current?.measure((_, __, width, _height, ___, py) => {
      setLayout({ offset: py, height: _height, width });
    });
  }, []);

  const style = useMemo(
    () => ({
      transform:
        y && factor
          ? [
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
            ]
          : undefined,
    }),
    [y, layout, factor]
  );

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
